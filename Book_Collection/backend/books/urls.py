from django.urls import path
from .views import BookListCreate, BookRetrieveUpdateDestroy

urlpatterns = [
    path('books/', BookListCreate.as_view()),
    path('books/<int:pk>/', BookRetrieveUpdateDestroy.as_view()),
]