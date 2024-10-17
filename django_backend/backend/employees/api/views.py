from rest_framework.viewsets import ModelViewSet
from ..models import Employee, Admin
from .serializer import EmployeeSerializer, AdminSerializer

# ModelViewSet provides set of default actions for performing CRUD operations on a model
class EmployeeViewSet(ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class AdminViewSet(ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer
