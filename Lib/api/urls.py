from django.urls import path
from .views import BookListCreateview, BookRetrieveUpdateDestroyView

urlpatterns = [
    path('books/', BookListCreateview.as_view(), name='book-list-create'),
    path('books/<int:pk>/', BookRetrieveUpdateDestroyView.as_view(), name='book-detail'),
    ]