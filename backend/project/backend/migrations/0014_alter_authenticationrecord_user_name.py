# Generated by Django 4.0.3 on 2022-05-18 14:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0013_alter_authenticationrecord_timestamp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='authenticationrecord',
            name='user_name',
            field=models.CharField(max_length=128),
        ),
    ]