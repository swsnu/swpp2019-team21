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
        if len(AditUser.objects.filter(email=email)) > 0:
            return HttpResponseBadRequest()

        tags = []
        for tag in newtags:
            if len(InterestedTags.objects.filter(content = tag)) > 0:
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
            if len(InterestedTags.objects.filter(content=tag)) is 0:
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
        image_process(response_dict)
        thumbnail_process(response_dict)
        tag_process(response_dict)
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
        image = req_data['image']
        ad_link = req_data['ad_link']
        target_views = req_data['target_views']
        expiry_date = req_data['expiry_date']
        post_tags = req_data['interest_tags']
        upload_date = datetime.now()
        thumbnail = img_process(image[0])

        adpost = AdPost(owner = request.user, title = title, subtitle = subtitle, content = content, ad_link = ad_link, target_views = target_views, total_views = 0, expiry_date = expiry_date, upload_date = upload_date, closed = False, thumbnail=thumbnail)
        adpost.save()

        for tag in post_tags:
            if len(InterestedTags.objects.filter(content = tag)) > 0:
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
            if i>0:
                newimg = img_process(image[i])
                adpost.image.add(newimg)

        adpost.save()
        response_dict = model_to_dict(adpost)
        tag_process(response_dict)
        response_dict['image'] = list(map(lambda image: image.image.url, response_dict['image']))
        response_dict['thumbnail']=adpost.thumbnail.image.url

        return JsonResponse(response_dict, safe = False)


class adPostID(View):
    item_list = ['id', 'title', 'subtitle', 'content', 'image', 'ad_link', 'closed']

    @check_object_exist(object_type=AdPost)
    def get(self, request, id):
        response_dict = model_to_dict(AdPost.objects.get(id = id))
        tag_process(response_dict)
        image_process(response_dict)
        thumbnail_process(response_dict)
        print(response_dict)
        return JsonResponse(response_dict)

    @check_is_authenticated
    @check_object_exist(object_type=AdPost)
    @check_is_permitted
    @check_valid_json(item_list=item_list)
    def put(self, request, id):
        adpost = get_object_or_404(AdPost, id = id)
        req_data = json.loads(request.body.decode())
        upload_date = datetime.now()
        adpost.title = req_data['title']
        adpost.subtitle = req_data['subtitle']
        adpost.content = req_data['content']
        adpost.ad_link = req_data['ad_link']
        adpost.upload_date = upload_date
        adpost.closed = req_data['closed']
        adpost.image = req_data['image']
        adpost.interest_tags = req_data['interest_tags']

        adpost.save()
        response_dict = model_to_dict(adpost)
        return JsonResponse(response_dict)

    @check_is_authenticated
    @check_object_exist(object_type=AdPost)
    @check_is_permitted
    @check_valid_json(item_list=item_list)
    def delete(self, request, id):
        adpost = get_object_or_404(AdPost, id = id)
        AdPost.delete(adpost)
        return HttpResponse(status = 204)

class adPostByOwnerID(View):
    @check_object_exist(object_type=AditUser)
    def get(self, request, id):
        post_by_userid = [model_to_dict(post) for post in AdPost.objects.filter(owner = id).order_by('-id')]
        return JsonResponse(post_by_userid, status=200, safe=False)

class adPostByParticipantID(View):
    @check_object_exist(object_type=AditUser)
    def get(self, request, id):
        post_by_userid = [model_to_dict(post) for post in AdPost.objects.filter(owner = id).order_by('-upload_date')]
        return JsonResponse(post_by_userid, status=200, safe=False)

class adPostByTag(View):
    def get(self, request, tag):
        post_by_tag = [model_to_dict(post) for post in InterestedTags.objects.filter(content = tag).topost.all().order_by('-upload_date')] # all()? not all()?
        return JsonResponse(post_by_tag, status=200, safe=False)

class adPostByHot(View):
    def get(self, request):
        post_by_hot = [model_to_dict(post) for post in AdPost.objects.all().order_by('-total_views')]
        return JsonResponse(post_by_hot, status=200, safe=False)


class adPostByRecent(View):
    def get(self, request):
        post_by_recent = [model_to_dict(post) for post in AdPost.objects.all().order_by('-upload_date')]
        return JsonResponse(post_by_recent, status=200, safe=False)

class adPostBySearch(View):
    def get(self, request, str):
        post_by_search = [model_to_dict(post) for post in AdPost.objects.all().filter(Q(title__icontains=str) | Q(subtitle__icontains=str)).order_by('-upload_date')]
        return JsonResponse(post_by_search, status=200, safe=False)


class adPostByCustom(View):
    @check_is_authenticated
    @check_object_exist(object_type=AditUser)
    @check_is_permitted
    def get(self, request, userid):
        usertags = AditUser.objects.filter(id = userid).tags
        post_by_custom = [model_to_dict(post) for tag in usertags for post in InterestedTags.objects.filter(content = tag).topost.all().order_by('-upload_date')]
        return JsonResponse(post_by_custom, status=200, safe=False)


class adReception(View):
    @check_is_authenticated
    @check_object_exist(object_type=AdPost)
    def get(self, request, id):
        # TODO
        return HttpResponse(status=200)

    @check_is_authenticated
    @check_object_exist(object_type=AdPost)
    def post(self, request, id):
        # TODO
        return HttpResponse(status=201)


class adReceptionID(View):
    @check_is_authenticated
    @check_object_exist(object_type=AdReception)
    @check_is_permitted  # 주의: ad의 주인도 확인할 수 있어야 함. if 문으로 처리해야 할 듯?
    def get(self, request, id):
        # TODO
        return HttpResponse(status=200)


class adReceptionRedirect(View):
    ### ad closed ==> 410
    def get(self, request, id):
        # TODO
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
        tags_by_searchkey = [model_to_dict(tag) for tag in InterestedTags.objects.all().filter(content__icontains=pattern)]
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