from builtins import KeyError

from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from adit.models import AdPost
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from .decorators import *
from .models import *
from django.views.generic import View
from django.forms.models import model_to_dict
from django.shortcuts import get_object_or_404
from django.db.models import Q
from datetime import datetime
from django.core.files.base import ContentFile
from hashids import Hashids
import base64

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
    return


class signUp(View):
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
            if InterestedTags.objects.filter(content = tag).exists():
                tag_exist = InterestedTags.objects.filter(content = tag)[0]
                tag_exist.usercount+=1
                tag_exist.save()
                tags.append(tag_exist)
            else:
                tag_new = InterestedTags(content = tag, usercount = 1, postcount = 0)
                tag_new.save()
                tags.append(tag_new)

        AditUser.objects.create_user(nickname=nickname, password=password, first_name=firstname, last_name=lastname,
                                 email=email, tags=tags)

        return HttpResponse(status=201)


class signIn(View):
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


class signOut(View):
    @check_is_authenticated
    def get(self, request):
        logout(request)
        return HttpResponse(status=204)


class getUser(View):
    item_list = ['first_name', 'last_name', 'nickname', 'tags']
    @check_is_authenticated
    def get(self, request):
        temp_dict = model_to_dict(request.user)
        response_dict = {
            'id' : temp_dict['id'],
            'email' : temp_dict['email'],
            'nickname' : temp_dict['nickname'],
            'first_name' : temp_dict['first_name'],
            'last_name' : temp_dict['last_name'],
            'avatar' : '',
            'tags' : temp_dict['tags']
        }
        tag_process(response_dict)
        return JsonResponse(response_dict)

    @check_is_authenticated
    @check_valid_json(item_list=item_list)
    def put(self, request):
        user = get_object_or_404(AditUser, id = request.user.id)
        req_data = json.loads(request.body.decode())
        user.first_name = req_data['first_name']
        user.last_name = req_data['last_name']
        user.nickname = req_data['nickname']
        user_tags = list(user.tags.all())
        modified_tags = req_data['tags']
        user.tags.clear()
        for tag in user_tags:
            tag.usercount -=1
            tag.save()
            if tag.usercount is 0 and tag.postcount is 0:
                tag.delete()

        for tag in modified_tags:
            if not InterestedTags.objects.filter(content=tag).exists():
                tag_new = InterestedTags.objects.create(content=tag, usercount=1, postcount=0)
                user.tags.add(tag_new)
            else:
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
            'avatar': '',
            'tags': temp_dict['tags']
        }
        tag_process(response_dict)
        return JsonResponse(response_dict)

class adPost(View):
    item_list = ['title', 'subtitle', 'content', 'image', 'ad_link', 'target_views', 'expiry_date',
                 'interest_tags']

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
        ad_link = req_data['ad_link']
        target_views = req_data['target_views']
        expiry_date = req_data['expiry_date']
        post_tags = req_data['interest_tags']
        upload_date = datetime.now()
        thumbnail = img_process(req_data['image'][0])

        adpost = AdPost(owner = request.user, title = title, subtitle = subtitle, content = content, ad_link = ad_link, target_views = target_views, total_views = 0, expiry_date = expiry_date, upload_date = upload_date, closed = False, thumbnail=thumbnail)
        adpost.save()

        for tag in post_tags:
            if InterestedTags.objects.filter(content = tag).exists():
                tag_exist = InterestedTags.objects.filter(content = tag)[0]
                tag_exist.postcount+=1
                tag_exist.save()
                adpost.tags.add(tag_exist)
            else:
                tag_new = InterestedTags(content = tag, usercount = 1, postcount = 0)
                tag_new.save()
                adpost.tags.add(tag_new)

        adpost.save()

        for i in range(len(image)):
            newimg = img_process(image[i])
            adpost.image.add(newimg)

        adpost.save()
        response_dict = model_to_dict(adpost)
        model_process(response_dict)
        return JsonResponse(response_dict, safe = False)


class adPostByID(View):
    item_list = ['id', 'title', 'subtitle', 'content', 'image', 'ad_link', 'closed']
    item_put_list = ['title', 'subtitle', 'content', 'image']

    @check_object_exist(object_type=AdPost)
    def get(self, request, id):
        response_dict = model_to_dict(AdPost.objects.get(id = id))
        model_process(response_dict)
        return JsonResponse(response_dict)

    @check_is_authenticated
    @check_object_exist(object_type=AdPost)
    @check_is_permitted(object_type=AdPost)
    @check_valid_json(item_list=item_put_list)
    def put(self, request, id):
        adpost = get_object_or_404(AdPost, id = id)
        req_data = json.loads(request.body.decode())
        upload_date = datetime.now()
        adpost.title = req_data['title']
        adpost.subtitle = req_data['subtitle']
        adpost.content = req_data['content']
        adpost.upload_date = upload_date
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

        for image in post_old_images:
            PostImage.delete(image)
        adpost.image.clear()

        img_new = img_process(post_new_thumbnail)
        adpost.thumbnail = img_new
        post_old_thumbnail = PostImage.objects.get(id = post_old_thumbnail_id)
        adpost.save()
        PostImage.delete(post_old_thumbnail)

        for tag in post_new_tags:
            if InterestedTags.objects.filter(content = tag).exists():
                tag_exist = InterestedTags.objects.filter(content = tag)[0]
                tag_exist.postcount+=1
                tag_exist.save()
                adpost.tags.add(tag_exist)
            else:
                tag_new = InterestedTags(content = tag, usercount = 1, postcount = 0)
                tag_new.save()
                adpost.tags.add(tag_new)

        adpost.save()

        for i in range(len(post_new_images)):
            if i>0:
                newimg = img_process(post_new_images[i])
                adpost.image.add(newimg)

        adpost.save()

        response_dict = model_to_dict(adpost)
        model_process(response_dict)
        return JsonResponse(response_dict)

    @check_is_authenticated
    @check_object_exist(object_type=AdPost)
    @check_is_permitted(object_type=AdPost)
    @check_valid_json(item_list=item_list)
    def delete(self, request, id):
        adpost = get_object_or_404(AdPost, id = id)
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

        return HttpResponse(status = 204)

class adPostByOwnerID(View):
    @check_object_exist(object_type=AditUser)
    def get(self, request, id):
        post_by_userid = [model_to_dict(post) for post in AdPost.objects.filter(owner = id).order_by('-upload_date')]
        list_process(post_by_userid)
        return JsonResponse(post_by_userid, status=200, safe=False)

class adPostByParticipantID(View):
    @check_object_exist(object_type=AditUser)
    def get(self, request, id):
        post_by_userid = [model_to_dict(post) for post in AdPost.objects.filter(owner = id).order_by('-upload_date')]
        list_process(post_by_userid)
        return JsonResponse(post_by_userid, status=200, safe=False)

class adPostByTag(View):
    def get(self, request, tag):
        post_by_tag = [model_to_dict(post) for tagrelated in InterestedTags.objects.filter(content=tag).all() for post in tagrelated.topost.all().order_by('-upload_date')] # all()? not all()?
        list_process(post_by_tag)
        return JsonResponse(post_by_tag, status=200, safe=False)

class adPostByHot(View):
    def get(self, request):
        post_by_hot = [model_to_dict(post) for post in AdPost.objects.all().order_by('-total_views', '-upload_date')]
        list_process(post_by_hot)
        return JsonResponse(post_by_hot, status=200, safe=False)

class adPostByRecent(View):
    def get(self, request):
        post_by_recent = [model_to_dict(post) for post in AdPost.objects.all().order_by('-upload_date')]
        list_process(post_by_recent)
        return JsonResponse(post_by_recent, status=200, safe=False)

class adPostBySearch(View):
    def get(self, request, str):
        post_by_search = [model_to_dict(post) for post in AdPost.objects.all().filter(Q(title__icontains=str) | Q(subtitle__icontains=str)).order_by('-upload_date')]
        list_process(post_by_search)
        return JsonResponse(post_by_search, status=200, safe=False)

class adPostByCustom(View):
    @check_is_authenticated
    def get(self, request):
        user_tags = list(request.user.tags.all())
        post_by_custom = {}
        for tag in user_tags:
            tags_custom = [post for tagrelated in InterestedTags.objects.filter(content=tag.content).all() for post in tagrelated.topost.all().order_by('-upload_date')]

            post_by_custom[tag.content] = [model_to_dict(post) for post in tags_custom]  # all()? not all()?
            list_process(post_by_custom[tag.content])

        return JsonResponse(post_by_custom, status=200, safe=False)


def encode(userid, time, postid):
    base_link = 'http://localhost:3000/redirectfrom='
    time = time.strftime("%y%m%d%H%M%S")
    print('encode : ' + time)
    hashids = Hashids()
    return base_link + hashids.encode(int(time), postid, userid)

def decode(code, object):
    base_link = 'http://localhost:3000/redirectfrom='
    time = object.recept_time.strftime("%y%m%d%H%M%S")
    hashids = Hashids()
    res = hashids.decode(code.replace(base_link, ''))
    if not res:
        return None
    return res[1]

class adReception(View):
    @check_is_authenticated
    def get(self, request):
        reception_by_userid = [model_to_dict(rcpt) for rcpt in AdReception.objects.filter(owner=request.user).order_by('-id')]
        return JsonResponse(reception_by_userid, safe=False)

    @check_is_authenticated
#    @check_object_exist(object_type=AdPost)
    def post(self, request):
        req_data = json.loads(request.body.decode())
        id = req_data['adpost']
        recept_time = datetime.now()
        target_post = AdPost.objects.get(id = id)
        unique_link = encode(request.user.id, recept_time, id)
        response_dict = model_to_dict(AdReception.objects.create(owner = request.user, adpost = target_post, views = 0, recept_time=recept_time, unique_link = unique_link, closed = False))
        return JsonResponse(response_dict, status = 201)

class adReceptionByID(View):
    @check_is_authenticated
    @check_object_exist(object_type=AdReception)
    @check_is_permitted(object_type=AdReception)  # 주의: ad의 주인도 확인할 수 있어야 함. if 문으로 처리해야 할 듯?
    def get(self, request, id):
        response_dict = model_to_dict(AdReception.objects.get(id = id))
        return JsonResponse(response_dict)

class adReceptionOutRedirect(View):
    ### ad closed ==> 410
    def get(self, request, str):
        print(str)
        for reception_object in AdReception.objects.all():
            print(reception_object)
            print(str)
            if decode(str, reception_object) is not None:
                post_id = decode(str, reception_object)
                post = AdPost.objects.get(id = post_id)
                if post.closed:
                    return HttpResponse(status = 410)
                else:
                    print(post.ad_link)# Redirect to = post.ad_link
                    return HttpResponse(status=204)
                break

        return HttpResponse(status=404)


class adReceptionRedirect(View):
    ### ad closed ==> 410
    def get(self, request, id):
        reception_object = AdReception.objects.filter(id=id)
        post_id = decode(reception_object.get().unique_link, reception_object.get())
        print(post_id)
        post = AdPost.objects.get(id = post_id)
        if post.closed:
            return HttpResponse(status = 410)
        else:
            print(post.ad_link)# Redirect to = post.ad_link
        return HttpResponse(status=204)


class tag(View):
    item_list = ['content']

    @check_is_authenticated
    @check_valid_json(item_list=item_list)
    def get(self, request):
        taglist = [model_to_dict(tag) for tag in InterestedTags.objects.all()]
        return JsonResponse(taglist, safe = False)


class tagSearch(View):
    def get(self, request, pattern):
        tags_by_searchkey = [model_to_dict(tag) for tag in InterestedTags.objects.all().filter(content__startswith=pattern)]
        return JsonResponse(tags_by_searchkey, safe = False)

"""
def questionPostId(request, adpostid):
    if request.method == 'GET':
        # TODO
        return HttpResponse(status=201)
    elif request.method == 'POST':
        # TODO
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(["GET", "POST"])
"""
