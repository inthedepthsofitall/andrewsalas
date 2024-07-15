from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import ShortenedUrl
from api.serializers import ShortenedUrlSerializer
from django.shortcuts import get_object_or_404, redirect

class ShortenedUrlViewSet(viewsets.ModelViewSet):
    queryset = ShortenedUrl.objects.all()
    serializer_class = ShortenedUrlSerializer

    @action(detail=False, methods=['post'])
    def shorten(self, request):
        long_url = request.data.get('long_url')
        shortened_url, created = ShortenedUrl.objects.get_or_create(long_url=long_url)
        serializer = self.get_serializer(shortened_url)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        short_url = get_object_or_404(ShortenedUrl, short_url=pk)
        return redirect(short_url.long_url)
