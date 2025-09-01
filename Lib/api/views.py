from rest_framework import generics
from books.models import Book 
from .serializers import BookSerializer
from .permissions import IsOwnerOrReadOnly

class BookListCreateview(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsOwnerOrReadOnly]