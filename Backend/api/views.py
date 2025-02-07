from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.files.storage import default_storage
from django.conf import settings
import os

# Create your views here.



@api_view(['POST'])
def upload_image(request):
    file = request.FILES.get('file')  # Get uploaded file
    if not file:
        return Response({"error": "No file uploaded"}, status=400)

    file_path = default_storage.save(f"images/{file.name}", file)  # Saves to media/images/
    file_url = request.build_absolute_uri(settings.MEDIA_URL + file.name)

    return Response({"file_url": file_url})