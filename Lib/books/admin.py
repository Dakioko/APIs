from django.contrib import admin
from .models import Book
# Register your models here.

class BookAdmin(admin.ModelAdmin):
    list_display = ('title','subtitle','author', 'isbn', 'created_by')
    search_fields = ('title', 'author')
    
    exclude = ('created_by',)   # hide created_by field in admin form

    def save_model(self, request, obj, form, change):
        if not change or not obj.created_by:   # only set on creation
            obj.created_by = request.user
        obj.save()

admin.site.register(Book, BookAdmin)