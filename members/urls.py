from django.urls import path
from .views import MemberList, MemberDetail

urlpatterns = [
    path('members/', MemberList.as_view(), name='members-list'),
    path('members/<int:pk>/', MemberDetail.as_view(), name='members-detail'),
]
