from django.urls import path, include
#from .views import PostListCreateView, PostRetrieveUpdateDestroyView
from.views import PostViewSet
from rest_framework.routers import DefaultRouter    

'''
urlpatterns = [
    path('posts/', PostListCreateView.as_view(), name='post-list-create'), 
    path('posts/<int:pk>/', PostRetrieveUpdateDestroyView.as_view(), name='post-detail'),
]
'''


router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='post') 

urlpatterns = [
    path('', include(router.urls)),  # Include the router's URLs
]
