from django.db import migrations, models

# This is the custom function to handle the conversion
def update_time_column_data(apps, schema_editor):
    # Custom SQL to convert time without time zone to timestamp with time zone
    schema_editor.execute("""
        UPDATE assets_item
        SET "timeTaken" = "timeTaken"::timestamp with time zone AT TIME ZONE 'UTC'
        WHERE "timeTaken" IS NOT NULL;
    """)

class Migration(migrations.Migration):

    dependencies = [
        ('assets', '0007_alter_item_datetaken'),
    ]

    operations = [
        # First, update the data before altering the field
        migrations.RunPython(update_time_column_data),

        # Now, alter the field to DateTimeField (timestamp with time zone)
        migrations.AlterField(
            model_name='item',
            name='timeTaken',
            field=models.DateTimeField(blank=True, default=None, null=True),
        ),
    ]
