from django.urls import path
from adit import views

urlpatterns = [
    path('sign-up/', views.signUp.as_view()),
    path('token/', views.token),
    path('sign-in/', views.signIn.as_view()),
    path('sign-out/', views.signOut.as_view()),
    path('user/', views.getUser.as_view()),
    path('adpost/', views.adPost.as_view()),
    path('adpost/<int:id>/', views.adPostID.as_view()),
    path('adpost/by-userid/<int:userid>/', views.adPostByUserID.as_view()),
    path('adpost/by-tag/<str:tag>/', views.adPostByTag.as_view()),
    path('adpost/hottest/', views.adPostByHot.as_view()),
    path('adpost/recent/', views.adPostByRecent.as_view()),
    path('adpost/search/<str:str>/', views.adPostBySearch.as_view()),
    path('adpost/custom/<int:userid>/', views.adPostByCustom.as_view()),
    path('adreception/', views.adReception.as_view()),
    path('adreception/<int:id>', views.adReceptionID.as_view()),
    path('tag/', views.tag.as_view()),
    path('tag/search/<str:pattern>/', views.tagSearch.as_view())
    #path('question/<int:adpostid>/', views.questionPostId)
]

