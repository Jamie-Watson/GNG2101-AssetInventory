# Generated by Django 5.1.1 on 2024-10-16 04:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assets', '0003_remove_item_id_alter_item_idnum'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='available',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='item',
            name='dateTaken',
            field=models.DateTimeField(default=None),
        ),
    ]