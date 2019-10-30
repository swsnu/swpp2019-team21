from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
import json
#from .models import Article, Comment
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.forms.models import model_to_dict

def signup(request):
    if request.method == 'POST':
        #TODO
        return HttpResponse(status = 201)
    else:
        return HttpResponseNotAllowed(["POST"])


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=405)

def signin(request):
    if request.method == 'POST':
        #TODO
        return HttpResponse(status = 201)
    else:
        return HttpResponseNotAllowed(["POST"])

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