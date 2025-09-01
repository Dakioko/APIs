from rest_framework import serializers
from books.models import Book   

class BookSerializer(serializers.ModelSerializer):
    """
    Serializer for the Book model.
    Converts Book instances to JSON format and vice versa.
    """
    
    class Meta:
        model = Book
        fields = ('title', 'subtitle', 'author', 'isbn')