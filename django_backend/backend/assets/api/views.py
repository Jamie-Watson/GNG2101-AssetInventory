from rest_framework.viewsets import ModelViewSet
from ..models import Item
from .serializer import ItemSerializer

# ModelViewSet provides set of default actions for performing CRUD 
# operations on a model
class ItemViewSet(ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

