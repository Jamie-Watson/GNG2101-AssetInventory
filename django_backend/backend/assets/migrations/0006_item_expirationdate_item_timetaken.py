# Generated by Django 5.1.2 on 2024-11-18 20:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assets', '0005_remove_item_serialnumber'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='expirationDate',
            field=models.DateField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name='item',
            name='timeTaken',
            field=models.TimeField(blank=True, default=None, null=True),
        ),
    ]
