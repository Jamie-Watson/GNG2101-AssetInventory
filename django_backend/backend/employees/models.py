from django.db import models
from django.core.validators import RegexValidator

# for barcode generation
from barcode import EAN8
from barcode.writer import ImageWriter
from django.core.files.base import ContentFile
from io import BytesIO

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

# class for representing an employee at the hospital
class Employee(models.Model):
    firstName = models.CharField(default = 'FirstName', max_length = 255)
    lastName = models.CharField(default = '', max_length = 255)
    # barcode representation for employees
    barcode = models.CharField(
        unique = True,
        blank = True,
        null = True,
        max_length = 8,
        )
    
    barcodeImage = models.ImageField(upload_to = 'barcodes/employees/', null = True, blank = True)

    #override save function so that barcode photos will be added every time item is added to db
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)   
        # generate barcode based on id
        if not self.barcode: 
            self.barcode = EAN8(f"2{self.pk:06d}").get_fullcode() 
            # generate barcode image based on barcode
            barcodeImage = create_barcode_image(self.barcode)
            self.barcodeImage.save(f"{self.barcode}.png", barcodeImage, save = False)
            self.save()



#class representing an admin
class Admin(models.Model):
    # an admin will be an employee, specified by this employee attribute of the model
    # OneToOneField shows that every admin will be linked to one employee
    # on_delete=models.CASCADE means that if the employee is removed, so to will the admin
    employee = models.OneToOneField(Employee, on_delete = models.CASCADE, primary_key=True)
    email = models.EmailField(max_length = 255)
    username = models.CharField(max_length = 255)
    password = models.CharField(max_length = 255)