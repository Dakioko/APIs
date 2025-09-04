from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from myapp.models import Department, SOP
from .serializers import DepartmentSerializer, SOPSerializer
from .permissions import IsOwnerOrReadOnly
from .pagination import CustomPagination

# ----------------------------
# Department ViewSet
# ----------------------------
class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    # Filtering, search, ordering
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['code', 'name']
    search_fields = ['code', 'name']
    ordering_fields = ['code', 'name']
    ordering = ['code']

# ----------------------------
# SOP ViewSet
# ----------------------------
class SOPViewSet(viewsets.ModelViewSet):
    queryset = SOP.objects.select_related('department', 'created_by').all().order_by('-created_at')
    serializer_class = SOPSerializer
    permission_classes = [IsOwnerOrReadOnly]  # custom permission
    pagination_class = CustomPagination

    # Filtering, search, ordering
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['company', 'department__code', 'created_by__username']
    search_fields = ['name', 'company', 'department__name', 'created_by__username']
    ordering_fields = ['created_at', 'name', 'company']
    ordering = ['-created_at']

    # Automatically set the creator to the logged-in user
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
