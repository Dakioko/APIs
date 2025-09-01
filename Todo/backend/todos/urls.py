from django.contrib import admin
from django.urls import path, include
from .models import Todo
from .views import TodoListCreateView, TodoRetrieveUpdateDestroyView    

urlpatterns = [
    path('todos/', TodoListCreateView.as_view()),
    path('todos/<int:pk>/', TodoRetrieveUpdateDestroyView.as_view()),
]   