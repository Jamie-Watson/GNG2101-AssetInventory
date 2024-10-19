from rest_framework.serializers import ModelSerializer
from ..models import Item

class ItemSerializer(ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'itemName', 'itemId', 'manufacturer', 'location', 'available', 'holder', 'status', 'notes', 'dateTaken', 'image']