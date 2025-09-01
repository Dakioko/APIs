from django.db import models

# Create your models here.

class Book(models.Model):
    # Status options (your curated list)
    STATUS_CHOICES = [
        ('unread', 'Unread'),
        ('want', 'Want to Read'),
        ('reading', 'Currently Reading'),
        ('finished', 'Finished'),
        ('abandoned', 'Abandoned'),
        ('rereading', 'Re-reading'),
    ]
    
    # Genre options 
    GENRE_CHOICES = [
        ('FIC', 'Fiction'),
        ('NF', 'Non-Fiction'),
        ('Aca', 'Academic'),
        ('JA', 'Journal Articles'),
    ]

    # Core fields
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='unread'
    )
    genre = models.CharField(
        max_length=5,
        choices=GENRE_CHOICES,
        blank=True,
        null=True
    )
    notes = models.TextField(blank=True)
    date_added = models.DateTimeField(auto_now_add=True)  # Automatic timestamp

    def __str__(self):
        return f"{self.title} by {self.author}"