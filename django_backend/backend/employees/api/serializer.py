from rest_framework.serializers import ModelSerializer
from ..models import Employee, Admin

# serializer for employees, puts data into yummy json format
class EmployeeSerializer(ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id', 'firstName', 'lastName', 'barcode', 'barcodeImage',]
        read_only_fields = ['id', 'barcode', 'barcodeImage']
# serializer for admins
class AdminSerializer(ModelSerializer):
    class Meta:
        model = Admin
        fields = ['employee', 'email', 'username', 'password']