# Generated by Django 5.1.2 on 2024-10-29 02:36

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstName', models.CharField(default='FirstName', max_length=255)),
                ('lastName', models.CharField(default='', max_length=255)),
                ('barcode', models.CharField(default=None, max_length=8, unique=True, validators=[django.core.validators.RegexValidator(message='Barcode must be exactly 8 digits.', regex='^2\\d{7}$')])),
            ],
        ),
        migrations.CreateModel(
            name='Admin',
            fields=[
                ('employee', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='employees.employee')),
                ('email', models.EmailField(max_length=255)),
                ('username', models.CharField(max_length=255)),
                ('password', models.CharField(max_length=255)),
            ],
        ),
    ]
