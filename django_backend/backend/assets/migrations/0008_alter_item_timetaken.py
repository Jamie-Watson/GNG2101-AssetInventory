from django.db import migrations, models

# Custom function to handle the conversion of `timeTaken` values
def update_time_column_data(apps, schema_editor):
    # Custom SQL to convert 'time' values to 'timestamp with time zone'
    schema_editor.execute("""
        UPDATE assets_item
        SET "timeTaken" = ('1970-01-01 ' || "timeTaken")::timestamp with time zone AT TIME ZONE 'UTC'
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
