from rest_framework import viewsets, permissions,generics
from .models import Book
from .serializers import BookSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all().order_by('-date_added')
    serializer_class = BookSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status', 'genre']
    search_fields = ['title', 'author', 'description']
    ordering_fields = ['title', 'author', 'date_added', 'rating']
    
    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
    
