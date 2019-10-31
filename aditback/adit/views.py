from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from .decorators import *
from .models import *
from django.views.generic import View
from django.forms.models import model_to_dict
from django.shortcuts import get_object_or_404


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=405)


class signUp(View):
    item_list = ['password', 'first_name', 'last_name', 'nickname']

    @check_valid_json(item_list=item_list)
    def post(self, request):
        req_data = json.loads(request.body.decode())
        email = req_data['email']
        password = req_data['password']
        firstname = req_data['first_name']
        lastname = req_data['last_name']
        nickname = req_data['nickname']
        if len(AditUser.objects.filter(email=email)) > 0:
            return HttpResponseBadRequest()
        tags = InterestedTags(content='iluvswpp')
        tags.save()
        print(InterestedTags.objects.all().values())
        AditUser.objects.create_user(nickname=nickname, password=password, first_name=firstname, last_name=lastname,
                                 email=email, tags=[tags])
        # TODO : put new tags
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
    @check_is_permitted
    def get(self, request):
        logout(request)
        return HttpResponse(status=204)


class getUser(View):
    @check_is_authenticated
    @check_object_exist(object_type=AditUser)
    @check_valid_json(item_list=['first_name', 'last_name', 'nickname', 'email', 'interest_tags'])
    def get(self, request, id):
        # TODO
        return HttpResponse(status=201)

    @check_is_authenticated
    @check_object_exist(object_type=AditUser)
    @check_valid_json(item_list=['first_name', 'last_name', 'nickname', 'email', 'interest_tags'])
    def put(self, request, id):
        # TODO
        return HttpResponse(status=201)


class adPost(View):
    item_list = ['title', 'subtitle', 'content', 'image', 'ad_link', 'target_views', 'total_views', 'expire_date',
                 'interest_tags']

    def get(self, request):
        # TODO
        return HttpResponse(status=200)

    @check_is_authenticated
    @check_valid_json(item_list=item_list)
    def post(self, request):
        # TODO
        return HttpResponse(status=201)


class adPostID(View):
    item_list = ['id', 'title', 'subtitle', 'content', 'image', 'ad_link', 'closed']

    @check_object_exist(object_type=AdPost)
    def get(self, request, id):
        # TODO
        return HttpResponse(status=201)

    @check_is_authenticated
    @check_object_exist(object_type=AdPost)
    @check_is_permitted
    @check_valid_json(item_list=item_list)
    def put(self, request, id):
        # TODO
        return HttpResponse(status=201)


class adPostUserID(View):
    @check_object_exist(object_type=AditUser)
    def get(self, request, id):
        # TODO
        return HttpResponse(status=201)


class adPostTag(View):
    def get(self, request, tag):
        # TODO
        return HttpResponse(status=200)


class adPostHot(View):
    def get(self, request):
        # TODO
        return HttpResponse(status=200)


class adPostRecent(View):
    def get(self, request):
        # TODO
        return HttpResponse(status=200)


class adPostSearch(View):
    def get(self, request, str):
        # TODO
        return HttpResponse(status=200)


class adPostCustom(View):
    @check_is_authenticated
    @check_object_exist(object_type=AditUser)
    @check_is_permitted
    def get(self, request, userid):
        # TODO
        return HttpResponse(status=200)


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
    def post(self, request):
        # TODO
        return HttpResponse(status=201)


class tagSearch(View):
    def get(self, request):
        # TODO
        return HttpResponse(status=200)


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
