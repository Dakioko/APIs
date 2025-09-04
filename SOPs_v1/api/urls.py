from django.urls import path, include
from .views import SOPViewSet, DepartmentViewSet
from rest_framework.routers import DefaultRouter



router = DefaultRouter()
router.register(r'sops', SOPViewSet)
router.register(r'departments', DepartmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]