from .views import BookListView
from django.urls import path

urlpatterns = [
    path('', BookListView.as_view(), name='home'),  # URL for the book list view
]