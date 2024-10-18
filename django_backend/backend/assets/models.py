from django.db import models

# class for representing an asset
# not all attributes are implemented yet
class Item(models.Model):
    itemName = models.CharField(max_length = 255)
    # auto incrementing field
    idNum = models.AutoField(primary_key = True)
    manufacturer = models.CharField(default = None, max_length = 255)
    location = models.CharField(default = None, max_length = 255)
    available = models.BooleanField(default = True)
    notes = models.TextField(default = None, null = True)
    dateTaken = models.DateTimeField(default = None, null = True)
