from django.test import TestCase, Client
import json
from .models import InterestedTags, AditUser, AditUserManager, AdPost, AdReception
from django.contrib.auth.models import User


# Create your tests here.

class AditTestCase(TestCase):

    def test_csrf(self):
        # By default, csrf checks are disabled in test client
        # To test csrf protection we enforce csrf checks here
        client = Client(enforce_csrf_checks=True)
        response = client.post('/api/sign-up/', json.dumps({'username': 'Seo', 'password': 'YeongHo'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 403)  # Request without csrf token returns 403 response

        response = client.get('/api/token/')
        self.assertEqual(response.status_code, 204)
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        response = client.post('/api/sign-up/', json.dumps(
            {'email': 'abc@snu.ac.kr', 'password': 'def', 'first_name': 'Seo', 'last_name': 'Yeong Ho',
             'nickname': 'digdhg', 'tags': ''}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)  # Pass csrf protection

    def test_decorators(self):
        # Testing decorators
        client = Client();

        # Testing non-existig methods
        response = client.put('/api/sign-up/', json.dumps(
            {'email': 'abc@snu.ac.kr', 'password': 'def', 'first_name': 'Seo', 'last_name': 'Yeong Ho',
             'nickname': 'digdhg', 'tags': ''}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 405)

        # Testing Json decode error
        # There is no email section
        response = client.post('/api/sign-up/', json.dumps(
            {'password': 'def', 'first_name': 'Seo', 'last_name': 'Yeong Ho',
             'nickname': 'digdhg', 'tags': ''}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)
        
        # Testing unauthorized user blocked
        response = client.post('/api/adpost/', json.dumps(
            {'title': '', 'subtitle': '', 'content': '',
             'image': '', 'tags': '', 'ad_link': '', 'target_views': '', 'expiry_date': ''}, ),
                               content_type='application/json')
        self.assertEqual(response.status_code, 401)

        # Testing article not found error
        response = client.get('/api/adpost/1/')
        self.assertEqual(response.status_code, 404)

        # Testing 



