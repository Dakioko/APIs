from rest_framework import serializers
from .models import SOP, Department

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['code', 'name']
        
class SOPSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)
    department_code = serializers.CharField(write_only=True)
    
    class Meta:
        model = SOP
        fields = ['id', 'name', 'link', 'company', 'department', 'department_code', 'created_by', 'created_at']
        read_only_fields = ['created_by', 'created_at']
        
    def create(self, validated_data):
        department_code = validated_data.pop('department_code')
        department = Department.objects.get(code=department_code)
        sop = SOP.objects.create(department=department, **validated_data)
        return sop