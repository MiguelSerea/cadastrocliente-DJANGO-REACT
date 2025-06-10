# serializers.py
from rest_framework import serializers
from .models import Member, Categoria

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nome']

class MemberSerializer(serializers.ModelSerializer):
    categoria_nome = serializers.CharField(source='categoria.nome', read_only=True)

    class Meta:
        model = Member
        fields = ['id', 'nome', 'email', 'telefone', 'endereco', 'categoria', 'categoria_nome']