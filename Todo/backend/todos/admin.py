from django.contrib import admin
from .models import Todo

class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'description','completed')
    search_fields = ('title',)
    list_filter = ('completed', 'created_at')
# Register your models here.
admin.site.register(Todo, TodoAdmin)