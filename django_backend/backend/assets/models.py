from django.db import models
from employees.models import Employee

# class for representing an asset
# not all attributes are implemented yet
class Item(models.Model):
    itemName = models.CharField(max_length = 255)
    itemId = models.IntegerField(unique = True, default = None)
    manufacturer = models.CharField(blank = True, max_length = 255)
    location = models.CharField(blank = True, max_length = 255)
    available = models.BooleanField(default = True)
    #can have employee holding thingy, gets set to None if the employee is deleted
    holder = models.ForeignKey(Employee, null = True, default = None, on_delete = models.SET_NULL)
    status = models.CharField(default = 'Available', max_length = 255)
    notes = models.TextField(default = None, null = True, max_length = 500)
    dateTaken = models.DateField(default = None, null = True)
    image = models.ImageField(upload_to = 'photos/', null = True, blank = True)