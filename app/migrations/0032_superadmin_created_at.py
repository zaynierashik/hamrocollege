# Generated by Django 5.1.4 on 2025-01-12 13:57

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0031_superadmin_role'),
    ]

    operations = [
        migrations.AddField(
            model_name='superadmin',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]