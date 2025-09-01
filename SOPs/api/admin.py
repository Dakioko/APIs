from django.contrib import admin
from .models import Department, SOP

# Register your models here.
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('code', 'name')
    search_fields = ('code', 'name')
    
class SOPAdmin(admin.ModelAdmin):
    list_display = ('name', 'link','company', 'department', 'created_by', 'created_at')
    list_filter = ('company', 'department')

admin.site.register(Department, DepartmentAdmin)
admin.site.register(SOP, SOPAdmin)