from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()  # supports custom User models

class Lead(models.Model):
    gender_choices = [  
        ('Male', 'Male'),
        ('Female', 'Female'),
    ]
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    gender = models.CharField(max_length=10, choices=gender_choices)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    created_by = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL,   # keep Lead even if user is deleted
        null=True, 
        blank=True,
        related_name="leads_created"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
