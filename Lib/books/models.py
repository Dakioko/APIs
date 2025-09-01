from django.db import models 
from django.contrib.auth.models import User

# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=200, blank=True)
    author = models.CharField(max_length=100)
    isbn = models.CharField(max_length=13, unique=True)
    
    # new field to track who created it
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="books", null=True, blank=True)


    def __str__(self):
        return self.title