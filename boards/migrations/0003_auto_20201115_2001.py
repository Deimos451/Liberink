# Generated by Django 3.1.1 on 2020-11-15 17:01

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('boards', '0002_board_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='board',
            name='id',
            field=models.UUIDField(default=uuid.UUID('859cae23-ff9f-4acf-8b6a-32eb59b831be'), primary_key=True, serialize=False),
        ),
    ]