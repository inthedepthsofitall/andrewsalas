from django.db import models
from django.utils.crypto import get_random_string

class ShortenedUrl(models.Model):
    long_url = models.URLField()
    short_url = models.CharField(max_length=10, unique=True)

    def save(self, *args, **kwargs):
        if not self.short_url:
            self.short_url = get_random_string(6)
        super().save(*args, **kwargs)
