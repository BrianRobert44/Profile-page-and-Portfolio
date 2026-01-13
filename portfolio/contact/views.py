from email import message
import email
from unicodedata import name
from django.shortcuts import render
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import ContactMessage

@csrf_exempt
def contact_api(request):

    if request.method == "OPTIONS":
        response = JsonResponse({"message": "OK"})
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        return response

    if request.method == "POST":
        try:
            data = json.loads(request.body.decode("utf-8"))
            ContactMessage.objects.create(
                name=data.get("name"),
                email=data.get("email"),
                message=data.get("message")
            )

            print(name, email, message)

            return JsonResponse({
                "status": "success",
                "message": "Message received"
            })

        except Exception as e:
            return JsonResponse({
                "status": "error",
                "message": str(e)
            }, status=400)

    # Handle GET or anything else
    return JsonResponse({
        "status": "error",
        "message": "Only POST allowed"
    }, status=405)