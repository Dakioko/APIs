from django.contrib import admin
from .models import Lead

class LeadAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'gender', 'email', 'phone_number', 'created_at', 'updated_at')

# Register your models here.
# This file registers the Lead model with the Django admin site, allowing it to be managed through  the admin interface.
admin.site.register(Lead, LeadAdmin)


 