from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from .models import Member, Categoria
from .serializers import MemberSerializer, CategoriaSerializer
from django.shortcuts import get_object_or_404

class MemberList(APIView):
    def get(self, request):
        members = Member.objects.all()
        serializer = MemberSerializer(members, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MemberSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MemberDetail(APIView):
    def get(self, request, pk):
        member = get_object_or_404(Member, pk=pk)
        serializer = MemberSerializer(member)
        return Response(serializer.data)

    def put(self, request, pk):
        member = get_object_or_404(Member, pk=pk)
        serializer = MemberSerializer(member, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        member = get_object_or_404(Member, pk=pk)
        member.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Novas views para Categoria

class CategoriaListCreate(generics.ListCreateAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class CategoriaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
