from django.core.mail import send_mail
from django.conf import settings


def send_user_confirmation(application):
    subject = "✅ Application Received – Worklancers"

    message = f"""
Hi {application.first_name},

Thank you for applying to Worklancers 🚀

We’ve successfully received your application.
Our team will review your profile and contact you shortly.

📌 Details submitted:
Name: {application.first_name} {application.last_name}
Email: {application.email}
Phone: {application.phone}

Best regards,
Worklancers Team
"""

    send_mail(
        subject=subject,
        message=message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[application.email],
        fail_silently=False,
    )
