from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import ShortenedUrlViewSet

router = DefaultRouter()
router.register(r'shorten', ShortenedUrlViewSet, basename='shorten')

urlpatterns = [
    path('', include(router.urls)),
]