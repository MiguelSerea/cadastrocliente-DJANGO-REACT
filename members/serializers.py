from rest_framework import serializers
from .models import Member

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['id', 'nome', 'email', 'telefone', 'endereco', 'criado_em', 'atualizado_em']
