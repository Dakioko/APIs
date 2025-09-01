
from django.contrib import admin
from .models import Lead

@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "email", "created_by", "created_at", "updated_at")
    exclude = ("created_by", "created_at", "updated_at")  # hide from the form

    def save_model(self, request, obj, form, change):
        if not obj.created_by:  # only set on create
            obj.created_by = request.user
        super().save_model(request, obj, form, change)



 