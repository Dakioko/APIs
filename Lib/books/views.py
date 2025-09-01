from django.shortcuts import render
from django.views.generic import ListView
from .models import Book

# Create your views here.

class BookListView(ListView):
    model = Book
    template_name = 'books/books_list.html'
    context_object_name = 'books'

    def get_queryset(self):
        return Book.objects.all().order_by('title')