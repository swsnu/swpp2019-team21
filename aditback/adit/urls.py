from django.urls import path
from adit import views

urlpatterns = [
    path('sign-up/', views.signup),
    path('token/', views.token),
    path('sign-in/', views.signin),
    path('sign-out/', views.signout),
    path('user/<int:id>/', views.getUser),
    path('adpost/', views.adpost),
    path('adpost/<int:id>/', views.adpostId),
    path('adpost/by-userid/<int:userid>/', views.adpostUserId),
    path('adpost/by-tag/<str:tag>/', views.adpostTag),
    path('adpost/hottest/', views.adpostHot),
    path('adpost/recent/', views.adpostRecent),
    path('adpost/search/<str:str>/', views.adpostSearch),
    path('adpost/custom/<int:userid>/', views.adpostCustom),
    path('adreception/', views.adreception),
    path('adreception/<int:id>', views.adreceptionId),
    path('adreception/by-user/<int:userid>/', views.adreceptionUserId),
    path('tag/', views.tag),
    path('tag/search/<str:pattern>/', views.tagSearch),
    path('question/<int:adpostid>/', views.questionPostId)
]
