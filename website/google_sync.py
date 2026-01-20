import gspread
from oauth2client.service_account import ServiceAccountCredentials

def push_to_google_sheet(application):
    scope = [
        "https://spreadsheets.google.com/feeds",
        "https://www.googleapis.com/auth/drive"
    ]

    creds = ServiceAccountCredentials.from_json_keyfile_name(
        "credentials.json", scope
    )

    client = gspread.authorize(creds)
    sheet = client.open("Worklancers Leads").sheet1

    sheet.append_row([
        application.first_name,
        application.last_name,
        application.email,
        application.phone,
        application.experience,
        application.premium_interest,
        application.tags,
        str(application.created_at),
    ])
from .google_sync import push_to_google_sheet

push_to_google_sheet(application)
