# Generated by Django 5.1.2 on 2024-11-08 21:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assets', '0003_item_barcodeean8'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='item',
            name='barcodeEAN8',
        ),
        migrations.AlterField(
            model_name='item',
            name='barcode',
            field=models.CharField(blank=True, max_length=8, null=True, unique=True),
        ),
    ]
