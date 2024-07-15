from rest_framework import serializers
from .models import ShortenedUrl

class ShortenedUrlSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShortenedUrl
        fields = '__all__'
