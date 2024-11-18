from rest_framework.serializers import ModelSerializer
from ..models import Item

class ItemSerializer(ModelSerializer):
    class Meta:
        model = Item
        fields = [
            'id', 
            'itemName',  
            'manufacturer', 
            'location', 
            'available', 
            'holder', 
            'status', 
            'notes', 
            'dateTaken', 
            'image',
            'barcode',
            'barcodeImage',
            ]
        read_only_fields = ['id', 'barcode', 'barcodeImage']