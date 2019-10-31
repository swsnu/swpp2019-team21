from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.forms.models import model_to_dict
from django.shortcuts import get_object_or_404

def signup(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            email = req_data['email']
            password = req_data['password']
            firstname = req_data['fname']
            lastname = req_data['lname']
            nickname = req_data['nickname']
            if len(User.objects.filter(email = email)) > 0:
                return HttpResponseBadRequest()
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        User.objects.create_user(username = nickname, password = password, first_name = firstname, last_name = lastname, email = email)
        #TODO : put new tags
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['POST'])


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=405)

def signin(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            email = req_data['email']
            password = req_data['password']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest(status=400)
        user = auth.authenticate(email = email, password = password)
        if user is not None:
            auth.login(request, user)
            return HttpResponse(status = 204)
        else:
            return HttpResponse(status = 401)
    else:
        return HttpResponseNotAllowed(['POST'])

def signout(request):
    if request.method == 'GET':
        #TODO
        return HttpResponse(status = 201)
    else:
        return HttpResponseNotAllowed(["GET"])

def getUser(request, id):
    if request.method == 'GET':
        #TODO
        return HttpResponse(status = 201)
    elif request.method == 'PUT':
        #TODO
        return HttpResponse(status = 201)
    else:
        return HttpResponseNotAllowed(["GET", "PUT"])

def adpost(request):
    if request.method == 'POST':
        #TODO
        return HttpResponse(status = 201)
    else:
        return HttpResponseNotAllowed(["POST"])

def adpostId(request, id):
    if request.method == 'GET':
        #TODO
        return HttpResponse(status = 201)
    elif request.method == 'PUT':
        #TODO
        return HttpResponse(status = 201)
    else:
        return HttpResponseNotAllowed(["GET", "PUT"])

def adpostUserId(request, userid):
    if request.method == 'GET':
        #TODO
        return HttpResponse(status = 201)
    else:
        return HttpResponseNotAllowed(["GET"])

def adpostTag(request, tag):
    if request.method == 'GET':
        #TODO
        return HttpResponse(status = 201)
    else:
        return HttpResponseNotAllowed(["GET"])

def adpostHot(request):
    if request.method == 'GET':
        #TODO
        return HttpResponse(status = 201)
    else:
        return HttpResponseNotAllowed(["GET"])

def adpostRecent(request):
    if request.method == 'GET':
        #TODO
        return HttpResponse(status = 201)
    else:
        return HttpResponseNotAllowed(["GET"])

def adpostSearch(request, str):
    if request.method == 'GET':
        #TODO
        return HttpResponse(status = 201)
    else:
        return HttpResponseNotAllowed(["GET"])

def adpostCustom(request, userid):
    if request.method == 'GET':
        #TODO
        return HttpResponse(status = 201)
    else:
        return HttpResponseNotAllowed(["GET"])

def adreception(request):
    if request.method == 'POST':
        #TODO
        return HttpResponse(status = 201)
    else:
        return HttpResponseNotAllowed(["POST"])

def adreceptionId(request, id):
    if request.method == 'GET':
        #TODO
        return HttpResponse(status = 201)
    elif request.method == 'PUT':
        #TODO
        return HttpResponse(status = 201)
    else:
        return HttpResponseNotAllowed(["GET", "PUT"])

def adreceptionUserId(request, userid):
    if request.method == 'GET':
        #TODO
        return HttpResponse(status = 201)
    else:
        return HttpResponseNotAllowed(["GET"])

def tag(request):
    if request.method == "POST":
        #TODO
        return HttpResponse(status = 201)
    else:
        return HttpResponseNotAllowed(["POST"])

def tagSearch(request, pattern):
    if request.method == "GET":
        #TODO
        return HttpResponse(status = 201)
    else:
        return HttpResponseNotAllowed(["GET"])
    
def questionPostId(request, adpostid):
    if request.method == 'GET':
        #TODO
        return HttpResponse(status = 201)
    elif request.method == 'POST':
        #TODO
        return HttpResponse(status = 201)
    else:
        return HttpResponseNotAllowed(["GET", "POST"])