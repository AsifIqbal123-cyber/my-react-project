from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
from django.http import JsonResponse
import os

# Create your views here.



 
@api_view(["POST"])
def upload_image(request):
    file = request.FILES.get("file")
    if not file:
        return Response({"error": "No file uploaded"}, status=400)
    


    # Ensure the file name doesn't contain any path traversal sequences
    sanitized_name = os.path.basename(file.name)  # This removes any directories in the file path

    file_path = f"images/{sanitized_name}"

    try:
        saved_path = default_storage.save(file_path, ContentFile(file.read()))
        
        file_url= request.build_absolute_uri(settings.MEDIA_URL +saved_path)

        return JsonResponse({"file_url": file_url})
    except Exception as e:
        return JsonResponse ({"error":str(e)}, status=500)

def home(request):
    return JsonResponse("Welcome to the Django Backend ! Use /upload/ to upload files.")

