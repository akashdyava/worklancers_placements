from django.contrib import admin
from .models import Application, Testimonial
from django.http import HttpResponse
import csv
# Register your models here.

from django.utils import timezone
from datetime import timedelta

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "rating", "is_active")
    list_filter = ("is_active", "rating")
    search_fields = ("name", "role", "review")



def export_applications_csv(modeladmin, request, queryset):
    """
    Export selected applications as CSV
    """
    response = HttpResponse(content_type="text/csv")
    response["Content-Disposition"] = 'attachment; filename="applications.csv"'

    writer = csv.writer(response)

    # CSV header
    writer.writerow([
        "First Name",
        "Last Name",
        "Email",
        "Phone",
    ])

    # CSV rows
    for app in queryset:
        writer.writerow([
            app.first_name,
            app.last_name,
            app.email,
            app.phone,
        ])

    return response


export_applications_csv.short_description = "⬇️ Export selected applications (CSV)"

@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = (
        "first_name",
        "last_name",
        "email",
        "phone",
        "source",
        "created_at",
    )
    search_fields = ("first_name", "last_name", "email", "phone")
    list_filter = ("source", "created_at", "is_read")
    
    # 🔹 Bulk actions
    actions = [export_applications_csv]

    # 🔹 Default ordering
    ordering = ("-created_at",)

    # 🔹 FORM LAYOUT (THIS IS THE KEY PART)
    fieldsets = (
        ("👤 Personal Information", {
            "fields": (
                "first_name",
                "last_name",
                "email",
                "phone",
            )
        }),

        # ("💼 Career Details", {
        #     "fields": (
        #         "employment_status",
        #         "field_of_work",
        #         "experience",
        #     )
        # }),

        # ("🤖 AI & Interview Readiness", {
        #     "fields": (
        #         "ready_for_interview",
        #         "premium_interest",
        #     )
        # }),

        ("🕒 System Info", {
            "fields": ("created_at",),
        }),
    )

    # 🔹 Make created_at read-only
    readonly_fields = ("created_at",)

    # ✅ THIS IS THE PART YOU ASKED ABOUT
    def save_model(self, request, obj, form, change):
        if change:  # editing an existing record
            obj.is_read = True
        super().save_model(request, obj, form, change)


def dashboard_stats():
    today = timezone.now().date()
    week_start = today - timedelta(days=7)
    month_start = today - timedelta(days=30)

    return {
        "today": Application.objects.filter(created_at__date=today).count(),
        "week": Application.objects.filter(created_at__date__gte=week_start).count(),
        "month": Application.objects.filter(created_at__date__gte=month_start).count(),
        "total": Application.objects.count(),
    }

class ApplicationAdmin(admin.ModelAdmin):

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser

    def has_change_permission(self, request, obj=None):
        return request.user.groups.filter(name="Recruiter").exists() or request.user.is_superuser

    def has_view_permission(self, request, obj=None):
        return True
