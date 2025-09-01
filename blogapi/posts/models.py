from django.db import models

# Create your models here.

class Post(models.Model):
    author = models.CharField(max_length=100)  # Assuming author is a simple CharField, can be linked to User model if needed
    title = models.CharField(max_length=200,unique=True)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']  # Orders posts by creation date, newest first