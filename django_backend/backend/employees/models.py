from django.db import models

#class for representing an employee at the hospital
class Employee(models.Model):
    firstName = models.CharField(default = 'FirstName', max_length = 255)
    lastName = models.CharField(default = '', max_length = 255)

#class representing an admin
class Admin(models.Model):
    # an admin will be an employee, specified by this employee attribute of the model
    # OneToOneField shows that every admin will be linked to one employee
    # on_delete=models.CASCADE means that if the employee is removed, so to will the admin
    employee = models.OneToOneField(Employee, on_delete = models.CASCADE, primary_key=True)
    email = models.EmailField(max_length = 255)
    username = models.CharField(max_length = 255)
    password = models.CharField(max_length = 255)