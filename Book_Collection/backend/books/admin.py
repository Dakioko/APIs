from django.contrib import admin

# Register your models here.

from .models import Book

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'status', 'genre', 'date_added')
    list_filter = ('status', 'genre')
    search_fields = ('title', 'author', 'notes')
    readonly_fields = ('date_added',)  # Prevent manual editing
    
    fieldsets = (
        ('Basic Info', {
            'fields': ('title', 'author', 'genre')
        }),
        ('Reading Progress', {
            'fields': ('status', 'notes', 'date_added')
        }),
    )