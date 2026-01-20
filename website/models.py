from django.db import models

# Create your models here.

class Testimonial(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=150, blank=True)
    review = models.TextField()
    rating = models.PositiveIntegerField(default=5)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Application(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)

    source = models.CharField(
        max_length=50,
        blank=True,
        help_text="Which CTA user clicked"
    )

    # ✅ NEW
    is_read = models.BooleanField(default=False)
    tags = models.CharField(
        max_length=200,
        blank=True,
        help_text="Comma separated tags e.g. hot,priority,backend"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.email}"