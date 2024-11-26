import json
import os
from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    # Path to the asset-manifest.json file
    manifest_path = os.path.join(settings.BASE_DIR, 'frontend', 'build', 'asset-manifest.json')
    
    # Read the asset-manifest.json file
    with open(manifest_path) as f:
        manifest = json.load(f)
    
    # Get the hashed filenames for the main JS and CSS files
    js_file = manifest['files']['main.js']
    css_file = manifest['files']['main.css']
    
    # Dynamically update the index.html file to use the hashed filenames
    index_file_path = os.path.join(settings.BASE_DIR, 'frontend', 'build', 'index.html')
    with open(index_file_path) as f:
        index_html = f.read()
    
    # Replace placeholders in index.html with correct JS and CSS paths
    index_html = index_html.replace('/static/js/main.js', f'/static/js/{js_file}')
    index_html = index_html.replace('/static/css/main.css', f'/static/css/{css_file}')
    
    # Return the modified index.html as the response
    return HttpResponse(index_html)
