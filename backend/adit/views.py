from builtins import KeyError
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from adit.models import AdPost
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth import authenticate, login, logout
from .decorators import *
from .models import *
from django.views.generic import View
from django.contrib.auth.hashers import check_password
from django.forms.models import model_to_dict
from django.shortcuts import get_object_or_404, redirect
from django.db.models import Q
from datetime import datetime, date, timedelta
from django.core.files.base import ContentFile
from hashids import Hashids
import base64
from .ml import suggest
from . import init_data
import gensim
import os

base_link = 'http://localhost:3000/redirectfrom='


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def user_related_post(request):
    if not request.user.is_authenticated:
        return AdPost.objects.none()
    res = suggest.post_suggest(AdPost.objects.filter(open_for_all=False), request.user.tags)
    return AdPost.objects.filter(pk__in=res)


def target_post(request):
    return AdPost.objects.all().filter(open_for_all=True).union(user_related_post(request))


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=405)


def img_process(img_64):
    format, imgstr = img_64.split(';base64,')
    ext = format.split('/')[-1]
    data = ContentFile(base64.b64decode(imgstr), name='temp.' + ext)
    return PostImage.objects.create(image=data)


def tag_process(response_dict):
    response_dict['tags'] = list(map(lambda tag: tag.content, response_dict['tags']))


def image_process(response_dict):
    response_dict['image'] = list(map(lambda postimage: postimage.image.url, response_dict['image']))


def thumbnail_process(response_dict):
    response_dict['thumbnail'] = PostImage.objects.get(id=response_dict['thumbnail']).image.url


def model_process(response_dict):
    image_process(response_dict)
    thumbnail_process(response_dict)
    tag_process(response_dict)


def list_process(post_list_by):
    for i in range(len(post_list_by)):
        model_process(post_list_by[i])


class SignUpView(View):
    item_list = ['email', 'password', 'first_name', 'last_name', 'nickname', 'tags']

    @check_valid_json(item_list=item_list)
    def post(self, request):
        req_data = json.loads(request.body.decode())
        email = req_data['email']
        password = req_data['password']
        firstname = req_data['first_name']
        lastname = req_data['last_name']
        nickname = req_data['nickname']
        newtags = req_data['tags']

        if AditUser.objects.filter(email=email).exists():
            return HttpResponseBadRequest()

        tags = []
        for tag in newtags:
            if InterestedTags.objects.filter(content=tag).exists():
                tag_exist = InterestedTags.objects.filter(content=tag)[0]
                tag_exist.usercount += 1
                tag_exist.save()
                tags.append(tag_exist)

        AditUser.objects.create_user(nickname=nickname, password=password, first_name=firstname, last_name=lastname,
                                     email=email, tags=tags)

        return HttpResponse(status=201)


class SignInView(View):
    item_list = ['email', 'password']

    @check_valid_json(item_list=item_list)
    def post(self, request):
        req_data = json.loads(request.body.decode())
        email = req_data['email']
        password = req_data['password']
        user = authenticate(email=email, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)


class SignOutView(View):
    @check_is_authenticated
    def get(self, request):
        logout(request)
        return HttpResponse(status=204)


class NewTagView(View):
    item_list = ['content']

    @check_is_authenticated
    @check_valid_json(item_list=item_list)
    def post(self, request):
        req_data = json.loads(request.body.decode())
        tag_content = req_data['content']
        try:
            new_tag = InterestedTags.objects.get(content=tag_content)
        except InterestedTags.DoesNotExist:
            return HttpResponseNotFound()
        if not request.user.tags.filter(content=tag_content).exists():
            request.user.tags.add(new_tag)
            request.user.save()
            new_tag.usercount += 1
            new_tag.save()
            return HttpResponse(status=201)
        return HttpResponse(status=200)


class GetUserView(View):
    item_list = ['first_name', 'last_name', 'nickname', 'tags']

    @check_is_authenticated
    def get(self, request):
        temp_dict = model_to_dict(request.user)
        response_dict = {
            'id': temp_dict['id'],
            'email': temp_dict['email'],
            'nickname': temp_dict['nickname'],
            'first_name': temp_dict['first_name'],
            'last_name': temp_dict['last_name'],
            'avatar': temp_dict['avatar'],
            'tags': temp_dict['tags'],
            'point': temp_dict['point']
        }
        tag_process(response_dict)
        return JsonResponse(response_dict)

    @check_is_authenticated
    @check_valid_json(item_list=item_list)
    def put(self, request):
        user = get_object_or_404(AditUser, id=request.user.id)
        req_data = json.loads(request.body.decode())
        user.first_name = req_data['first_name']
        user.last_name = req_data['last_name']
        user.nickname = req_data['nickname']
        if req_data['avatar'] is not None:
            user.avatar = img_process(req_data['avatar'])
        user_tags = list(user.tags.all())
        modified_tags = req_data['tags']
        user.tags.clear()
        for tag in user_tags:
            tag.usercount -= 1
            tag.save()
            if tag.usercount is 0 and tag.postcount is 0:
                tag.delete()

        for tag in modified_tags:
            if InterestedTags.objects.filter(content=tag).exists():
                tag_old = InterestedTags.objects.get(content=tag)
                tag_old.usercount += 1
                tag_old.save()
                user.tags.add(tag_old)

        user.save()
        temp_dict = model_to_dict(user)
        response_dict = {
            'id': temp_dict['id'],
            'email': temp_dict['email'],
            'nickname': temp_dict['nickname'],
            'first_name': temp_dict['first_name'],
            'last_name': temp_dict['last_name'],
            'avatar': temp_dict['avatar'],
            'tags': temp_dict['tags']
        }
        tag_process(response_dict)
        return JsonResponse(response_dict)


class UpdatePointView(View):
    @check_is_authenticated
    def put(self, request):
        user = request.user
        req_data = json.loads(request.body.decode())
        user.point = req_data['point']
        user.save()
        return HttpResponse(status=204)


class ChangePWView(View):
    @check_is_authenticated
    def put(self, request):
        user = request.user
        req_data = json.loads(request.body.decode())
        current_password = req_data['current_password']
        new_password = req_data['new_password']
        if check_password(current_password, user.password):
            user.set_password(new_password)
            user.save()
            return HttpResponse(status=204)
        else:
            return HttpResponseNotAllowed()


class AdPostView(View):
    item_list = ['title', 'subtitle', 'content', 'image', 'ad_link', 'target_views', 'expiry_date',
                 'tags']

    def post_to_dict(self, adpost):
        response_dict = model_to_dict(adpost)
        model_process(response_dict)
        return response_dict

    def get(self, request):
        post_all_list = [self.post_to_dict(post) for post in AdPost.objects.all()]
        return JsonResponse(post_all_list, status=200, safe=False)

    @check_is_authenticated
    @check_valid_json(item_list=item_list)
    def post(self, request):
        req_data = json.loads(request.body.decode())
        title = req_data['title']
        subtitle = req_data['subtitle']
        content = req_data['content']
        image = req_data['image'][1:]
        target_views = req_data['target_views']
        expiry_date = req_data['expiry_date']
        post_tags = req_data['tags']
        try:
            ad_link = req_data['ad_link']
        except:
            ad_link = None
        open_for_all = False
        upload_date = datetime.now()
        thumbnail = img_process(req_data['image'][0])

        adpost = AdPost(owner=request.user, title=title, subtitle=subtitle, content=content, ad_link=ad_link,
                        target_views=target_views, total_views=0, expiry_date=expiry_date, upload_date=upload_date,
                        closed=False, thumbnail=thumbnail, open_for_all=open_for_all, view_by_date='')
        adpost.save()
        if adpost.ad_link is None:
            adpost.ad_link = 'http://localhost:3000/adpost/{}/'.format(str(adpost.id))

        for tag in post_tags:
            if InterestedTags.objects.filter(content=tag).exists():
                tag_exist = InterestedTags.objects.filter(content=tag)[0]
                tag_exist.postcount += 1
                tag_exist.save()
                adpost.tags.add(tag_exist)
            else:
                tag_new = InterestedTags(content=tag, usercount=1, postcount=0)
                tag_new.save()
                adpost.tags.add(tag_new)

        adpost.save()

        for i in range(len(image)):
            newimg = img_process(image[i])
            adpost.image.add(newimg)

        adpost.save()
        response_dict = model_to_dict(adpost)
        model_process(response_dict)

        return JsonResponse(response_dict, safe=False)


class AdPostByIDView(View):
    item_list = ['id', 'title', 'subtitle', 'content', 'image', 'ad_link', 'closed']
    item_put_list = ['title', 'subtitle', 'content', 'image']

    @check_object_exist(object_type=AdPost)
    def get(self, request, id):
        response_dict = model_to_dict(AdPost.objects.get(id=id))
        if response_dict['owner'] == request.user.id:
            response_dict['is_owner'] = True
        else:
            response_dict['is_owner'] = False

        model_process(response_dict)
        return JsonResponse(response_dict)

    @check_is_authenticated
    @check_object_exist(object_type=AdPost)
    @check_is_permitted(object_type=AdPost)
    @check_valid_json(item_list=item_put_list)
    def put(self, request, id):
        adpost = get_object_or_404(AdPost, id=id)
        req_data = json.loads(request.body.decode())
        adpost.title = req_data['title']
        adpost.subtitle = req_data['subtitle']
        adpost.content = req_data['content']
        adpost.upload_date = datetime.now()
        adpost.open_for_all = req_data['open_for_all']
        post_new_images = req_data['image'][1:]
        post_new_tags = req_data['tags']
        post_new_thumbnail = req_data['image'][0]
        post_old_images = adpost.image.all()
        post_old_tags = adpost.tags.all()
        post_old_thumbnail_id = adpost.thumbnail.id

        for tag in post_old_tags:
            tag.postcount -= 1
            tag.save()
            if tag.usercount is 0 and tag.postcount is 0:
                tag.delete()
        adpost.tags.clear()

        if adpost.image == "not_changed":
            for image in post_old_images:
                PostImage.delete(image)
            adpost.image.clear()

            img_new = img_process(post_new_thumbnail)
            adpost.thumbnail = img_new
            post_old_thumbnail = PostImage.objects.get(id=post_old_thumbnail_id)
            adpost.save()
            PostImage.delete(post_old_thumbnail)

            for i in range(len(post_new_images)):
                newimg = img_process(post_new_images[i])
                adpost.image.add(newimg)

        for tag in post_new_tags:
            if InterestedTags.objects.filter(content=tag).exists():
                tag_exist = InterestedTags.objects.filter(content=tag)[0]
                tag_exist.postcount += 1
                tag_exist.save()
                adpost.tags.add(tag_exist)
            else:
                tag_new = InterestedTags(content=tag, usercount=1, postcount=0)
                tag_new.save()
                adpost.tags.add(tag_new)

        adpost.save()

        response_dict = model_to_dict(adpost)
        model_process(response_dict)
        return JsonResponse(response_dict)

    @check_is_authenticated
    @check_object_exist(object_type=AdPost)
    @check_is_permitted(object_type=AdPost)
    @check_valid_json(item_list=item_list)
    def delete(self, request, id):
        adpost = get_object_or_404(AdPost, id=id)
        post_tags = adpost.tags.all()
        post_thumbnail = adpost.thumbnail
        post_images = adpost.image.all()

        for tag in post_tags:
            tag.postcount -= 1
            tag.save()
            if tag.usercount is 0 and tag.postcount is 0:
                tag.delete()

        AdPost.delete(adpost)

        PostImage.delete(post_thumbnail)

        for image in post_images:
            PostImage.delete(image)

        return HttpResponse(status=204)


class AdPostByOwnerIDView(View):
    @check_is_authenticated
    def get(self, request):
        post_by_userid = [model_to_dict(post) for post in
                          AdPost.objects.filter(owner=request.user).order_by('-upload_date')]
        list_process(post_by_userid)
        return JsonResponse(post_by_userid, status=200, safe=False)


class AdPostByParticipantIDView(View):
    @check_is_authenticated
    def get(self, request):
        user = request.user
        reception_list = AdReception.objects.filter(owner=user).order_by('-recept_time')
        post_by_userid = [model_to_dict(reception.adpost) for reception in reception_list]
        list_process(post_by_userid)
        return JsonResponse(post_by_userid, status=200, safe=False)


class AdPostByTagView(View):
    def get(self, request, tag):
        post_by_tag = [model_to_dict(post) for tagrelated in InterestedTags.objects.filter(content=tag).all() for post
                       in
                       tagrelated.topost.all().filter(open_for_all=True).union(user_related_post(request).filter(
                           pk__in=list(
                               map(lambda x: x.pk, tagrelated.topost.all().filter(open_for_all=False))))).order_by(
                           '-upload_date')]  # all()? not all()?

        list_process(post_by_tag)
        return JsonResponse(post_by_tag, status=200, safe=False)


class AdPostByHotView(View):
    def get(self, request):
        data = target_post(request).values('id', 'thumbnail', 'title', 'subtitle', 'expiry_date', 'target_views',
                                           'total_views').order_by('-total_views')
        for dict in data:
            dict['thumbnail'] = PostImage.objects.get(id=dict['thumbnail']).image.url
        return JsonResponse(list(data), status=200, safe=False)


class AdPostByRecentView(View):
    def get(self, request):
        data = target_post(request).values('id', 'thumbnail', 'title', 'subtitle', 'expiry_date', 'target_views',
                                           'total_views', 'upload_date').order_by('-upload_date')
        for dict in data:
            dict['thumbnail'] = PostImage.objects.get(id=dict['thumbnail']).image.url
        return JsonResponse(list(data), status=200, safe=False)


class AdPostBySearchView(View):
    def get(self, request, str):
        post_by_search = [model_to_dict(post) for post in
                          target_post(request).filter(Q(title__icontains=str) | Q(subtitle__icontains=str)).order_by(
                              '-upload_date')]
        list_process(post_by_search)
        return JsonResponse(post_by_search, status=200, safe=False)


class AdPostByCustomView(View):
    @check_is_authenticated
    def get(self, request):
        user_tags = list(request.user.tags.all())
        post_by_custom = {}
        for tag in user_tags:
            tags_custom = [post for tagrelated in InterestedTags.objects.filter(content=tag.content).all() for post in
                           tagrelated.topost.all().filter(open_for_all=True).union(user_related_post(request).filter(
                               pk__in=list(
                                   map(lambda x: x.pk, tagrelated.topost.all().filter(open_for_all=False))))).order_by(
                               '-upload_date')]

            post_by_custom[tag.content] = [model_to_dict(post) for post in tags_custom]  # all()? not all()?
            list_process(post_by_custom[tag.content])

        return JsonResponse(post_by_custom, status=200, safe=False)


def encode(userid, time, postid):
    time = time.strftime("%y%m%d%H%M%S")
    hashids = Hashids()
    return base_link + hashids.encode(int(time), int(postid), int(userid))


def decode(code, object):
    hashids = Hashids()
    res = hashids.decode(code.replace(base_link, ''))
    if not res:
        return None
    return res[1]


class AdReceptionView(View):
    @check_is_authenticated
    def get(self, request):
        reception_by_userid = [model_to_dict(rcpt) for rcpt in
                               AdReception.objects.filter(owner=request.user).order_by('-id')]
        return JsonResponse(reception_by_userid, safe=False)

    @check_is_authenticated
    #    @check_object_exist(object_type=AdPost)
    def post(self, request):
        req_data = json.loads(request.body.decode())
        id = req_data['adpost']
        if AdReception.objects.filter(adpost=id, owner=request.user).exists():
            return HttpResponseForbidden()
        recept_time = datetime.now()
        target_post = AdPost.objects.get(id=id)
        unique_link = encode(request.user.id, recept_time, id)
        response_dict = model_to_dict(
            AdReception.objects.create(owner=request.user, adpost=target_post, views=0, recept_time=recept_time,
                                       unique_link=unique_link, closed=False))
        return JsonResponse(response_dict, status=201)


class AdReceptionByPostIDView(View):
    @check_is_authenticated
    # 주의: ad의 주인도 확인할 수 있어야 함. if 문으로 처리해야 할 듯?
    def get(self, request, id):
        response_reception = AdReception.objects.filter(owner=request.user, adpost=id)
        if not response_reception.exists():
            return HttpResponseNotFound()
        response_dict = model_to_dict(response_reception.get())
        return JsonResponse(response_dict)


class AdReceptionByIDView(View):
    @check_is_authenticated
    @check_object_exist(object_type=AdReception)
    @check_is_permitted(object_type=AdReception)  # 주의: ad의 주인도 확인할 수 있어야 함. if 문으로 처리해야 할 듯?
    def get(self, request, id):
        response_dict = model_to_dict(AdReception.objects.get(id=id))
        return JsonResponse(response_dict)


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


class AdReceptionOutRedirectView(View):
    # ad closed ==> 410
    def get(self, request, query_str):
        # TODO: Revise Hard Coding
        if not AdReception.objects.filter(unique_link=base_link + query_str).exists():
            return HttpResponseNotFound()
        reception_object = AdReception.objects.get(unique_link=base_link + query_str)
        post_id = reception_object.adpost.id
        post = AdPost.objects.get(id=post_id)

        # return on post closed
        if post.closed:
            return HttpResponse(status=410)

        # make redirect data for frontend
        owner = reception_object.owner
        response_dict = {'ad_link': post.ad_link}
        response = JsonResponse(response_dict)

        if request.user.is_authenticated:
            cookie_name = f'hit:{request.user.id}'
        else:
            cookie_name = 'hit'

        tomorrow = datetime.replace(datetime.now(), hour=23, minute=59, second=0)
        expires = datetime.strftime(tomorrow, "%a, %d-%b-%Y %H:%M:%S GMT")

        if request.COOKIES.get(cookie_name) is not None:
            cookies = request.COOKIES.get(cookie_name)
            cookies_list = cookies.split('|')
            if str(reception_object.id) not in cookies_list and not IpAddressDuplication.objects.filter(
                    ip_address=get_client_ip(request)).exists():
                new_ip = IpAddressDuplication(ip_address=get_client_ip(request))
                new_ip.save()
                response.set_cookie(cookie_name, cookies + f'|{reception_object.id}', expires=expires)

                reception_object.views += 1
                owner.point += 7
                post.total_views += 1

                reception_object.save()
                owner.save()
                post.save()
        else:
            response.set_cookie(cookie_name, post_id, expires=expires)

            reception_object.views += 1
            owner.point += 7
            post.total_views += 1

            reception_object.save()
            owner.save()
            post.save()

        if post.total_views == post.target_views:
            post.closed = True
            post.save()
        return response


class AdReceptionRedirectView(View):
    # ad closed ==> 410
    def get(self, request, id):
        reception_object = AdReception.objects.filter(id=id)
        post_id = decode(reception_object.get().unique_link, reception_object.get())
        post = AdPost.objects.get(id=post_id)
        if post.closed:
            return HttpResponse(status=410)
        else:
            response_dict = {'ad_link': post.ad_link}  # Redirect to = post.ad_link
        return JsonResponse(response_dict)


class TagView(View):
    item_list = ['content']

    @check_valid_json(item_list=item_list)
    def get(self, request):
        taglist = [model_to_dict(tag) for tag in InterestedTags.objects.all()]
        return JsonResponse(taglist, safe=False)


class TagRecommendByUser(View):
    #    @check_is_authenticated
    def get(self, request):
        taglist = suggest.tag_suggest(list(InterestedTags.objects.all()), list(request.user.tags.all()), 0.02)
        return JsonResponse(taglist, safe=False)


class TagRecommendByRecent(View):
    def get(self, request):
        taglist = [model_to_dict(tag) for tag in InterestedTags.objects.all().order_by('-created_time')]
        return JsonResponse(taglist[:20], safe=False)


class TagSearchView(View):
    def get(self, pattern):
        tags_by_searchkey = [model_to_dict(tag) for tag in
                             InterestedTags.objects.all().filter(content__startswith=pattern)]
        return JsonResponse(tags_by_searchkey, safe=False)
