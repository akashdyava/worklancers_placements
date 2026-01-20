from twilio.rest import Client
from django.conf import settings


def send_whatsapp(application):
    client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

    client.messages.create(
        body=f"""
New Worklancers Application 🚀
Name: {application.first_name}
Name: {application.phone}
Email: {application.email}
""",
        from_=settings.TWILIO_WHATSAPP_FROM,
        to=settings.ADMIN_WHATSAPP_TO,
    )
