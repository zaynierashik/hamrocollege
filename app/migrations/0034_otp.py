# Generated by Django 5.1.4 on 2025-01-16 14:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0033_alter_superadmin_created_at'),
    ]

    operations = [
        migrations.CreateModel(
            name='OTP',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254)),
                ('otp', models.CharField(max_length=6)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]