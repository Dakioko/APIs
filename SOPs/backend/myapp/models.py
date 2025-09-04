from django.db import models
from django.contrib.auth.models import User


class Department(models.Model):
    code = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.code} - {self.name}"


class SOP(models.Model):
    COMPANY_CHOICES = [
        ("ATP", "ATP"),
        ("WAW", "WAW"),
    ]

    name = models.CharField(max_length=200)
    link = models.URLField()
    company = models.CharField(max_length=10, choices=COMPANY_CHOICES, blank=True, null=True)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name="sops", blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="created_sops")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.company})"
