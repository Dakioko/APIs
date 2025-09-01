from django.shortcuts import render
from rest_framework import viewsets
from .models import Lead
from .serializers import LeadSerializer  
from .permissions import IsOwnerOrReadOnly  # Assuming you have a custom permission defined

# Create your views here.

class LeadViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing lead instances.
    """
    permission_classes = [IsOwnerOrReadOnly]  # Use custom permission to restrict access
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer  # Assuming you have a LeadSerializer defined in serializers.py