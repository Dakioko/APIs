from rest_framework import serializers
from .models import Book
from django.conf import settings

class BookSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    genre_display = serializers.CharField(source='get_genre_display', read_only=True)
    cover_image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Book
        fields = [
            'id',
            'title',
            'author',
            'status',
            'status_display',
            'genre',
            'genre_display',
            'cover_image',
            'cover_image_url',
            'description',
            'rating',
            'notes',
            'isbn',
            'pages',
            'publish_date',
            'date_added'
        ]
        read_only_fields = ['date_added', 'user']
    
    def get_cover_image_url(self, obj):
        if obj.cover_image:
            return self.context['request'].build_absolute_uri(obj.cover_image.url)
        return None
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)