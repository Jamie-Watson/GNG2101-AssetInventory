# assets/views.py (or your app's views.py)
from django.shortcuts import render
import os
from django.conf import settings

def index(request):
    # Path to the index.html file inside the build folder
    index_file_path = os.path.join(settings.BASE_DIR, 'frontend/build', 'index.html')

    # Serve the index.html file as a response
    return render(request, index_file_path)
