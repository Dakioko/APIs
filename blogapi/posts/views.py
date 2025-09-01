from django.shortcuts import render
from rest_framework import viewsets,generics
from .models import Post
from .serializers import PostSerializer
#from .permissions import IsOwnerOrReadOnly
from .permissions import IsOwnerOrReadOnlyOrCreate

# Create your views here.
'''
class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsOwnerOrReadOnlyOrCreate,)  # Apply custom permission to restrict editing to owners only
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
'''

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsOwnerOrReadOnlyOrCreate]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)