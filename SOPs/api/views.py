from django.shortcuts import render
from rest_framework import viewsets
from .models import SOP, Department 
from .serializer import SOPSerializer, DepartmentSerializer


# Create your views here.

class SOPViewSet(viewsets.ModelViewSet):   
    queryset = SOP.objects.all().order_by('-created_at')
    serializer_class = SOPSerializer
    filterset_fields = ['company', 'department__code']
      
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
        
class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all().order_by('code')
    serializer_class = DepartmentSerializer