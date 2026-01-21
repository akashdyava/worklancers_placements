from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .models import Testimonial
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Application
from django.core.mail import send_mail
from .emails import send_user_confirmation, send_admin_notification, send_testimonial_admin_mail, send_testimonial_user_mail
from django.views.decorators.http import require_POST
from .notifications import send_whatsapp  # optional

def submit_application(request):
    if request.method == "POST":
        application = Application.objects.create(
            first_name=request.POST.get("first_name"),
            last_name=request.POST.get("last_name"),
            email=request.POST.get("email"),
            phone=request.POST.get("phone"),
            source=request.POST.get("source", ""),
        )

        # ✅ SEND CONFIRMATION EMAIL TO USER
        send_user_confirmation(application)

        # ✅ Send admin email
        send_admin_notification(application)

        # ✅ OPTIONAL: ADMIN WHATSAPP / EMAIL
        send_whatsapp(application)

        return JsonResponse({"success": True})

    return JsonResponse({"success": False}, status=400)



def home(request):
    testimonials = Testimonial.objects.filter(is_active=True)
    return render(request, "index.html", {
        "testimonials": testimonials
    })


def signup_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        if User.objects.filter(username=username).exists():
            messages.error(request, 'Username already exists')
            return redirect('signup')

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        login(request, user)  # 👈 auto login after signup
        return redirect('dashboard')

    return render(request, 'website/signup.html')



def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, 'Invalid username or password')
            return redirect('login')

    return render(request, 'website/login.html')


def logout_view(request):
    logout(request)
    return redirect('home')


@login_required
def dashboard(request):
    return render(request, 'website/dashboard.html')


@require_POST
def submit_testimonial(request):
    if request.method == "POST":
        testimonial = Testimonial.objects.create(
            name=request.POST.get("name"),
            role=request.POST.get("role", ""),
            review=request.POST.get("review"),
            rating=int(request.POST.get("rating")),
            is_active=True,
        )

        # ✅ Send emails
        send_testimonial_admin_mail(testimonial)
        send_testimonial_user_mail(testimonial)

        return JsonResponse({"success": True})

    return JsonResponse({"success": False}, status=400)
