from django.urls import path
from adit import views

urlpatterns = [
    path('sign-up/', views.SignUpView.as_view()),
    path('token/', views.token),
    path('sign-in/', views.SignInView.as_view()),
    path('sign-out/', views.SignOutView.as_view()),
    path('user/', views.GetUserView.as_view()),
    path('user/point/', views.UpdatePointView.as_view()),
    path('user/pw/', views.ChangePWView.as_view()),
    path('adpost/', views.AdPostView.as_view()),
    path('adpost/<int:id>/', views.AdPostByIDView.as_view()),
    path('adpost/by-userid/', views.AdPostByOwnerIDView.as_view()),
    path('adpost/by-partid/', views.AdPostByParticipantIDView.as_view()),
    path('adpost/by-tag/<str:tag>/', views.AdPostByTagView.as_view()),
    path('adpost/hottest/', views.AdPostByHotView.as_view()),
    path('adpost/recent/', views.AdPostByRecentView.as_view()),
    path('adpost/search/<str:str>/', views.AdPostBySearchView.as_view()),
    path('adpost/custom/', views.AdPostByCustomView.as_view()),
    path('adreception/', views.AdReceptionView.as_view()),
    path('adreception/by-post/<int:id>/', views.AdReceptionByPostIDView.as_view()),
    path('adreception/<int:id>/', views.AdReceptionByIDView.as_view()),
    path('adreception/redirect/<int:id>/', views.AdReceptionRedirectView.as_view()),
    path('adreception/redirectto=<str:query_str>/', views.AdReceptionOutRedirectView.as_view()),
    path('tag/', views.TagView.as_view()),
    path('tag/add/', views.NewTagView.as_view()),
    path('tag/recommend/', views.TagRec.as_view()),
    path('tag/search/<str:pattern>/', views.TagSearchView.as_view())
    # path('question/<int:adpostid>/', views.questionPostId)
]
