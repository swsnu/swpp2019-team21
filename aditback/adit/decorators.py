import json
from functools import wraps
from django.http import HttpResponseNotAllowed, HttpResponse, HttpResponseBadRequest, HttpResponseNotFound, \
    HttpResponseForbidden

"""
    Action: Check valid method is requested by argument 'valid_method'
            If not allowed then response with  405
    Usage:  @check_valid_method(valid_method=['GET', 'POST'])
"""


def check_valid_method(valid_method):
    def wrapper(func):
        @wraps(func)
        def decorator(*args, **kwargs):
            request = args[1]
            if request.method not in valid_method:
                return HttpResponseNotAllowed(valid_method)
            return func(*args, **kwargs)

        return decorator
    return wrapper


"""
    Action: Check user is logged in
            If not logged in then response with  401
    Usage:  @check_is_authenticated
"""


def check_is_authenticated(func):
    @wraps(func)
    def decorator(*args, **kwargs):
        request = args[1]
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        else:
            return func(*args, **kwargs)

    return decorator


"""
    Action: Check corresponding object_type, object_id entry is exist.
            If not exists then response with 404
    Usage:  @check_object_exist(Model)    
"""


def check_object_exist(object_type):
    def wrapper(func):
        @wraps(func)
        def decorator(*args, **kwargs):
            print(1234)
            object_id = kwargs['id']
            entry = object_type.objects.filter(id=object_id)

            if not entry.exists():
                return HttpResponseNotFound()
            else:
                return func(*args, **kwargs)

        return decorator

    return wrapper


"""
    Action: Check is object is permitted to current user
            If not allowed then response with  403
    Usage:  @check_is_permitted(Model)
"""


def check_is_permitted(object_type):
    def wrapper(func):
        @wraps(func)
        def decorator(*args, **kwargs):
            request = args[1]
            object_id = kwargs['id']

            my_user = request.user
            article_owner = object_type.objects.get(id=object_id).owner_id
            if not my_user == article_owner:
                return HttpResponseForbidden()
            else:
                return func(*args, **kwargs)

        return decorator

    return wrapper


'''
    Action: Check payload can be parsed with given item argument
            If cannot be parsed then response with 400
    Usage:  @check_valid_json(item_list=['first_name', 'second_name', 'email', 'password', ...]
'''


def check_valid_json(item_list):
    def wrapper(func):
        @wraps(func)
        def decorator(*args, **kwargs):
            request = args[1]
            if request.method == 'POST' or request.method == 'PUT':
                try:
                    req_data = json.loads(request.body.decode())
                    for item in item_list:
                        tmp = req_data[item]
                except (KeyError, json.JSONDecodeError) as e:
                    return HttpResponseBadRequest(400)
            return func(*args, **kwargs)

        return decorator

    return wrapper
