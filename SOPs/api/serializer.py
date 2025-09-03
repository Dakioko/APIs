from rest_framework import serializers
from .models import SOP, Department

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['code', 'name']

class SOPSerializer(serializers.ModelSerializer):
    department = serializers.SlugRelatedField(
        queryset=Department.objects.all(),
        slug_field='code',
        allow_null=True,
        required=False     
    )

    class Meta:
        model = SOP
        fields = ['id', 'name', 'link', 'company', 'department', 'created_by', 'created_at']
        read_only_fields = ['created_by', 'created_at']

    def create(self, validated_data):
        # The department object is already resolved by the SlugRelatedField
        return SOP.objects.create(**validated_data)