from django.db import models
from employees.models import Employee
from django.core.validators import RegexValidator

# for barcode generation
from barcode import EAN8
from barcode.writer import ImageWriter
from django.core.files.base import ContentFile
from io import BytesIO

from django.utils import timezone

# class for representing an asset
# not all attributes are implemented yet
def create_barcode_image(barcode):
    # make barcode object
    ean = EAN8(barcode, writer = ImageWriter())

    # save barcode as BytesIO
    barcodeImage = BytesIO()
    ean.write(barcodeImage)

    #django ContentFile so that it can be saved in the folder
    return ContentFile(barcodeImage.getvalue(), f"{barcode}.png")

class Item(models.Model):
    itemName = models.CharField(max_length = 255)
    manufacturer = models.CharField(blank = True, max_length = 255)
    location = models.CharField(blank = True, max_length = 255)
    available = models.BooleanField(default = True)
    
    #can have employee holding thingy, gets set to None if the employee is deleted
    holder = models.ForeignKey(Employee, null = True, default = None, on_delete = models.SET_NULL)
    status = models.CharField(default = 'Available', max_length = 255)
    notes = models.TextField(default = None, null = True, max_length = 500)
    dateTaken = models.DateField(default = None, null = True, blank = True)
    timeTaken = models.DateTimeField(default = timezone.now, null = True, blank = True)
    expirationDate = models.DateField(default = None, null = True, blank = True)
    image = models.ImageField(upload_to = 'photos/', null = True, blank = True)

    #barcode stuff
    barcode = models.CharField(
        unique = True,
        blank = True,
        null = True,
        max_length = 8,
        )
    
    barcodeImage = models.ImageField(upload_to = 'barcodes/items/', null = True, blank = True)

    #override save function to add extra functionality
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)  
        if not self.barcode:
            # creates barcode and saves barcode image when item created
            self.barcode = EAN8(f"1{self.pk:06d}").get_fullcode()
            barcodeImage = create_barcode_image(self.barcode)
            self.barcodeImage.save(f"{self.barcode}.png", barcodeImage, save = False)
            self.save()