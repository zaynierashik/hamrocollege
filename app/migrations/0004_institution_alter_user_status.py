# Generated by Django 5.1.4 on 2024-12-20 06:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='Institution',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('overview', models.TextField()),
                ('principal_message', models.TextField(blank=True, null=True)),
                ('program', models.TextField(help_text='List of programs offered, separated by commas.')),
                ('phone', models.CharField(max_length=15)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('website', models.URLField(blank=True, null=True)),
                ('address', models.CharField(max_length=255)),
                ('map', models.URLField(blank=True, help_text='Embed map URL.', null=True)),
                ('logo', models.ImageField(blank=True, null=True, upload_to='institution_logos/')),
                ('affiliation', models.CharField(choices=[('tribhuvan', 'Tribhuvan University'), ('pokhara', 'Pokhara University'), ('kathmandu', 'Kathmandu University'), ('gandaki', 'Gandaki University'), ('purbanchal', 'Purbanchal University'), ('foreign', 'Foreign University')], max_length=50)),
                ('foreign_university_name', models.CharField(blank=True, help_text='If the affiliation is Foreign University, specify the university name here.', max_length=255, null=True)),
            ],
        ),
        migrations.AlterField(
            model_name='user',
            name='status',
            field=models.CharField(choices=[('active', 'Active'), ('suspended', 'Suspended')], default='active', max_length=10),
        ),
    ]
