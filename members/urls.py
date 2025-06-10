from django.urls import path
from .views import MemberList, MemberDetail, CategoriaListCreate, CategoriaDetail

urlpatterns = [
    # Rotas para membros
    path('members/', MemberList.as_view(), name='members-list'),
    path('members/<int:pk>/', MemberDetail.as_view(), name='members-detail'),

    # Rotas para categorias (em inglês para bater com o frontend)
    path('categories/', CategoriaListCreate.as_view(), name='category-list'),
    path('categories/<int:pk>/', CategoriaDetail.as_view(), name='category-detail'),
]
