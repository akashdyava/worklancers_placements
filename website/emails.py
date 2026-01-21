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


def send_admin_notification(application):
    send_mail(
        subject="🚀 New Worklancers Application",
        message=f"""
New candidate applied:

Name: {application.first_name} {application.last_name}
Email: {application.email}
Phone: {application.phone}
Source: {application.source}
""",
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[settings.DEFAULT_FROM_EMAIL],
        fail_silently=False,
    )



def send_testimonial_user_mail(testimonial):
    send_mail(
        subject="⭐ Thanks for reviewing Worklancers",
        message=f"""
Hi {testimonial.name},

Thank you for sharing your experience with Worklancers.

Your review helps others trust us and grow their careers.

– Team Worklancers
""",
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[testimonial.email] if hasattr(testimonial, "email") else [],
        fail_silently=True,
    )


def send_testimonial_admin_mail(testimonial):
    send_mail(
        subject="📝 New Testimonial Submitted",
        message=f"""
A new testimonial has been submitted:

Name: {testimonial.name}
Role: {testimonial.role}
Rating: {testimonial.rating} ⭐
Review:
{testimonial.review}
""",
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[settings.DEFAULT_FROM_EMAIL],
        fail_silently=False,
    )
