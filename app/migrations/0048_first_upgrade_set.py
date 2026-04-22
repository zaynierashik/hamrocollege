# Generated manually for first upgrade set

from datetime import timedelta

from django.contrib.auth.hashers import make_password
from django.db import migrations, models
from django.utils.timezone import now


def backfill_otp_fields(apps, schema_editor):
    OTP = apps.get_model('app', 'OTP')

    updates = []
    for row in OTP.objects.all().iterator():
        raw_otp = getattr(row, 'otp', None)
        if raw_otp:
            row.otp_hash = make_password(raw_otp)
        else:
            row.otp_hash = make_password('UNKNOWN')

        if row.created_at:
            row.expires_at = row.created_at + timedelta(minutes=5)
        else:
            row.expires_at = now() + timedelta(minutes=5)
        updates.append(row)

    if updates:
        OTP.objects.bulk_update(updates, ['otp_hash', 'expires_at'])


def dedupe_ratings(apps, schema_editor):
    Rating = apps.get_model('app', 'Rating')

    seen = set()
    duplicate_ids = []

    for row in Rating.objects.all().order_by('id').iterator():
        key = (row.user_id, row.institution_id)
        if key in seen:
            duplicate_ids.append(row.id)
        else:
            seen.add(key)

    if duplicate_ids:
        Rating.objects.filter(id__in=duplicate_ids).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0047_institutionadmin_phone'),
    ]

    operations = [
        migrations.AddField(
            model_name='otp',
            name='otp_hash',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='otp',
            name='expires_at',
            field=models.DateTimeField(db_index=True, null=True),
        ),
        migrations.AddField(
            model_name='otp',
            name='consumed_at',
            field=models.DateTimeField(blank=True, db_index=True, null=True),
        ),
        migrations.AlterField(
            model_name='otp',
            name='email',
            field=models.EmailField(db_index=True, max_length=254),
        ),
        migrations.RunPython(backfill_otp_fields, migrations.RunPython.noop),
        migrations.AlterField(
            model_name='otp',
            name='otp_hash',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='otp',
            name='expires_at',
            field=models.DateTimeField(db_index=True),
        ),
        migrations.RemoveField(
            model_name='otp',
            name='otp',
        ),
        migrations.AddIndex(
            model_name='otp',
            index=models.Index(fields=['email', 'expires_at'], name='otp_email_expires_idx'),
        ),
        migrations.AddIndex(
            model_name='otp',
            index=models.Index(fields=['email', 'consumed_at'], name='otp_email_consumed_idx'),
        ),
        migrations.AlterUniqueTogether(
            name='institutioncourse',
            unique_together=set(),
        ),
        migrations.AddConstraint(
            model_name='institutioncourse',
            constraint=models.UniqueConstraint(fields=('institution', 'course'), name='uniq_institution_course'),
        ),
        migrations.AlterUniqueTogether(
            name='application',
            unique_together=set(),
        ),
        migrations.AddConstraint(
            model_name='application',
            constraint=models.UniqueConstraint(fields=('user', 'institution', 'program'), name='uniq_user_institution_program_application'),
        ),
        migrations.AddIndex(
            model_name='application',
            index=models.Index(fields=['institution', 'status'], name='app_institution_status_idx'),
        ),
        migrations.AddIndex(
            model_name='application',
            index=models.Index(fields=['user', 'applied_at'], name='app_user_applied_at_idx'),
        ),
        migrations.AddIndex(
            model_name='institutionview',
            index=models.Index(fields=['institution', 'timestamp'], name='inst_view_institution_ts_idx'),
        ),
        migrations.RunPython(dedupe_ratings, migrations.RunPython.noop),
        migrations.AddConstraint(
            model_name='rating',
            constraint=models.UniqueConstraint(fields=('user', 'institution'), name='uniq_user_institution_rating'),
        ),
    ]
