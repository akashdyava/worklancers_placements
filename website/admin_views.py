from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import render
from django.db.models import Count
from django.utils.timezone import now, timedelta

from .models import Application


@staff_member_required
def admin_dashboard(request):
    today = now().date()
    last_7_days = today - timedelta(days=7)

    daily_data = (
        Application.objects
        .filter(created_at__date__gte=last_7_days)
        .extra(select={'day': "date(created_at)"})
        .values('day')
        .annotate(count=Count('id'))
        .order_by('day')
    )

    return render(request, "admin/dashboard.html", {
        "daily_data": daily_data,
    })
