# Generated by Django 3.1.1 on 2020-11-15 17:14

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('boards', '0004_auto_20201115_2002'),
    ]

    operations = [
        migrations.AlterField(
            model_name='board',
            name='id',
            field=models.UUIDField(default=uuid.UUID('77f2ddf0-5abe-464f-95d9-32f82028d3e1'), editable=False, primary_key=True, serialize=False),
        ),
    ]
