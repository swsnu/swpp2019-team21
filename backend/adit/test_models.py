from django.test import TestCase, Client
from adit.models import AditUser
import json

class ModelTestCase(TestCase):
    def test_models(self):
        a = None

        tags = []
        try :
            AditUser.objects.create_user(nickname='bb', password='password', first_name='firstname', last_name='lastname',
                                     email='', tags=tags)
        except ValueError :
            a = True

        self.assertEqual(a, True)

        try :
            AditUser.objects.create_user(nickname='', password='password', first_name='firstname', last_name='lastname',
                                     email='aa', tags=tags)
        except ValueError :
            a = None

        self.assertEqual(a, None)

        AditUser.objects.create_user(nickname='aa', password='password', first_name='firstname', last_name='lastname',
                                     email='aa', tags=tags)

        try:
            AditUser.objects.create_user(nickname='bb', password='password', first_name='firstname', last_name='lastname',
                                     email='aa', tags=tags)
        except ValueError :
            a = False

        self.assertEqual(a, False)

        try:
            AditUser.objects.create_user(nickname='aa', password='password', first_name='firstname', last_name='lastname',
                                     email='bb', tags=tags)
        except ValueError :
            a = None

        self.assertEqual(a, None)

        AditUser.objects.create_superuser(nickname='dd', password='password', first_name='firstname', last_name='lastname',
                                     email='ee')