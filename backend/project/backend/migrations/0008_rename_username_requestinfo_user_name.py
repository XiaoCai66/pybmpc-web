# Generated by Django 3.2.13 on 2022-04-23 07:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0007_authenticationrecord_requestinfo'),
    ]

    operations = [
        migrations.RenameField(
            model_name='requestinfo',
            old_name='username',
            new_name='user_name',
        ),
    ]