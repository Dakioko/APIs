from django.db import models
from django.conf import settings

class Book(models.Model):
    STATUS_CHOICES = [
        ('unread', 'Unread'),
        ('want', 'Want to Read'),
        ('reading', 'Currently Reading'),
        ('finished', 'Finished'),
        ('abandoned', 'Abandoned'),
        ('rereading', 'Re-reading'),
    ]
    
    GENRE_CHOICES = [
        ('FIC', 'Fiction'),
        ('NF', 'Non-Fiction'),
        ('ACA', 'Academic'),
        ('JA', 'Journal Articles'),
        ('BIO', 'Biography'),
        ('SCI', 'Science'),
        ('HIS', 'History'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='books'
    )
    
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
    cover_image = models.ImageField(
        upload_to='book_covers/',
        blank=True,
        null=True
    )
    description = models.TextField(blank=True)
    notes = models.TextField(blank=True)
    rating = models.PositiveSmallIntegerField(
        blank=True,
        null=True,
        choices=[(i, str(i)) for i in range(1, 6)]
    )
    isbn = models.CharField(max_length=20, blank=True, null=True)
    pages = models.PositiveIntegerField(blank=True, null=True)
    publish_date = models.DateField(blank=True, null=True)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} by {self.author}"

    class Meta:
        ordering = ['-date_added']
        verbose_name_plural = "Books"