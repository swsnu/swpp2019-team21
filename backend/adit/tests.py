from django.test import TestCase, Client
import json

# Create your tests here.
file = open("mockImage", "r")
mocked_image = file.read()
file.close()

class AditTestCase(TestCase):
    def test_setup(self):
        file = open("mockImage", "r")
        mocked_image = file.read()
        file.close()

    def test_csrf(self):
        # By default, csrf checks are disabled in test client
        # To test csrf protection we enforce csrf checks here
        client = Client(enforce_csrf_checks=True)
        response = client.post('/api/sign-up/', json.dumps({'username': 'Seo', 'password': 'YeongHo'}),
                               content_type='application/json')
        # Request without csrf token returns 403 response
        self.assertEqual(response.status_code, 403)

        response = client.get('/api/token/')
        self.assertEqual(response.status_code, 204)
        # Get csrf token from cookie
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/sign-up/', json.dumps(
            {'email': 'abc@snu.ac.kr', 'password': 'def', 'first_name': 'Seo', 'last_name': 'Yeong Ho',
             'nickname': 'digdhg', 'tags': ''}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)  # Pass csrf protection

    def test_decorators(self):
        # Testing decorators
        client = Client()

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

        # Testing not logged user blocked
        response = client.post('/api/adpost/', json.dumps(
            {'title': '', 'subtitle': '', 'content': '',
             'image': '', 'tags': '', 'ad_link': '', 'target_views': '', 'expiry_date': '', 'open_for_all': 'False'}, ),
                               content_type='application/json')
        self.assertEqual(response.status_code, 401)

        # Testing article not found error
        response = client.get('/api/adpost/1/')
        self.assertEqual(response.status_code, 404)

        # Testing unauthorized user block
        response = client.post('/api/sign-up/', json.dumps(
            {'email': 'abc@snu.ac.kr', 'password': 'def', 'first_name': 'Seo', 'last_name': 'Yeong Ho',
             'nickname': 'digdhg', 'tags': ''}),
                               content_type='application/json')

        response = client.post('/api/sign-up/', json.dumps(
            {'email': 'abcd@snu.ac.kr', 'password': 'def', 'first_name': 'Seo', 'last_name': 'Yeong Ho',
             'nickname': 'digdhg2', 'tags': ''}),
                               content_type='application/json')

        client.login(email='abc@snu.ac.kr', password='def')

        req_data = {'title': "", 'subtitle': "", 'content': "",
                    'image': [mocked_image, mocked_image], 'ad_link': "",
                    'target_views': "321", 'expiry_date': "2019-11-15", 'tags': "", 'open_for_all': 'False'}
        response = client.post('/api/adpost/', json.dumps(req_data, ), content_type='application/json')
        self.assertEqual(response.status_code, 200)

        client.logout()

        client.login(email='abcd@snu.ac.kr', password='def')

        response = client.put(
            '/api/adpost/1/', json.dumps(req_data, ), content_type='application/json')
        self.assertEqual(response.status_code, 404)

    def test_users(self):
        # Testing Users
        client = Client()

        # signing up
        response = client.post('/api/sign-up/', json.dumps(
            {'email': 'abc@snu.ac.kr', 'password': 'def', 'first_name': 'Seo', 'last_name': 'Yeong Ho',
             'nickname': 'digdhg', 'tags': ['여행', '컴퓨터']}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)

        # signing up with duplicated email
        response = client.post('/api/sign-up/', json.dumps(
            {'email': 'abc@snu.ac.kr', 'password': 'defa', 'first_name': 'Kim', 'last_name': 'Sangmin',
             'nickname': 'bird', 'tags': ['공연']}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)

        # signing up with another email
        response = client.post('/api/sign-up/', json.dumps(
            {'email': 'abcd@snu.ac.kr', 'password': 'defa', 'first_name': 'Kim', 'last_name': 'Sangmin',
             'nickname': 'bird', 'tags': ['공연']}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)

        # Trying to log in with different password
        response = client.post('/api/sign-in/', json.dumps(
            {'email': 'abc@snu.ac.kr', 'password': 'defa'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 401)

        # Successfully logged in
        response = client.post('/api/sign-in/', json.dumps(
            {'email': 'abc@snu.ac.kr', 'password': 'def'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 204)

        # Add new tag
        response = client.post('/api/tag/add/', json.dumps(
            {'content': '공연'}), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        response = client.post('/api/tag/add/', json.dumps(
            {'content': 'k'}), content_type='application/json')
        self.assertEqual(response.status_code, 404)

        # Change user's first name, last name, nickname, interested tags
        response = client.put('/api/user/', json.dumps(
            {'first_name': 'Choi', 'last_name': 'Seong Hwan',
             'nickname': 'iluvswpp', 'tags': ['여행', '공연'], 'avatar': mocked_image}),
                              content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.put('/api/user/point/', json.dumps(
            {'point': '1234'}),
                              content_type='application/json')
        self.assertEqual(response.status_code, 204)

        # Check user info is successfully modified
        response = client.get('/api/user/')
        self.assertEqual(response.json()['first_name'], 'Choi')
        self.assertEqual(response.json()['last_name'], 'Seong Hwan')
        self.assertEqual(response.json()['nickname'], 'iluvswpp')
        self.assertEqual(response.json()['tags'], ['공연'])
        self.assertEqual(response.json()['point'], 1234)

        # Change user password
        response = client.put('/api/user/pw/', json.dumps(
            {'current_password': 'def', 'new_password': 'abcd'}),
                              content_type='application/json')
        self.assertEqual(response.status_code, 204)

        # Cannot log in with Previous password
        logged_in = client.login(email='abc@snu.ac.kr', password='def')
        self.assertEqual(logged_in, False)

        # Password changed
        logged_in = client.login(email='abc@snu.ac.kr', password='abcd')
        self.assertEqual(logged_in, True)

        # Succesfully logged out
        response = client.get('/api/sign-out/')
        self.assertEqual(response.status_code, 204)

    def test_adpost(self):
        # Testing adposts
        client = Client()

        # signing up
        response = client.post('/api/sign-up/', json.dumps(
            {'email': 'abc@snu.ac.kr', 'password': 'def', 'first_name': 'Seo', 'last_name': 'Yeong Ho',
             'nickname': 'digdhg', 'tags': ['여행']}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)

        # signing up
        response = client.post('/api/sign-up/', json.dumps(
            {'email': 'abcd@snu.ac.kr', 'password': 'def', 'first_name': 'Seo', 'last_name': 'Yeong Ho',
             'nickname': 'digdhg2', 'tags': ['컴퓨터']}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)

        client.login(email='abc@snu.ac.kr', password='def')

        # Posting new article
        req_data = {'title': "abc", 'subtitle': "", 'content': "",
                    'image': [mocked_image, mocked_image, mocked_image, mocked_image],
                    'ad_link': "https://www.naver.com",
                    'target_views': "321", 'expiry_date': "2019-11-15", 'tags': ['여행', '컴퓨터', '공연', '연극'],
                    'open_for_all': 'False'}
        response = client.post('/api/adpost/', json.dumps(req_data, ), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["title"], req_data["title"])

        # Posting another article
        req_data["title"] = "abcd"
        req_data["tags"] = ['공연']
        response = client.post('/api/adpost/', json.dumps(req_data, ), content_type='application/json')

        req_data["title"] = "abcde"
        req_data["tags"] = ['여행']
        response = client.post('/api/adpost/', json.dumps(req_data, ), content_type='application/json')

        # If article is got, it is ordered by id
        response = client.get('/api/adpost/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()[0]["title"], "abc")
        self.assertEqual(response.json()[1]["title"], "abcd")
        self.assertEqual(response.json()[2]["title"], "abcde")

        # Recent article comes first
        response = client.get('/api/adpost/recent/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()[0]["title"], "abcde")
        self.assertEqual(response.json()[1]["title"], "abcd")
        self.assertEqual(response.json()[2]["title"], "abc")

        # Custom only gets articles that user is interested in
        response = client.get('/api/adpost/custom/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['여행'][0]["title"], "abcde")
        self.assertEqual(response.json()['여행'][1]["title"], "abc")

        # Get articles user posted
        response = client.get('/api/adpost/by-userid/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()[0]["title"], "abcde")
        self.assertEqual(response.json()[1]["title"], "abcd")
        self.assertEqual(response.json()[2]["title"], "abc")

        # Get articles tagged with 'c
        response = client.get('/api/adpost/by-tag/공연/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()[0]["title"], "abcd")
        self.assertEqual(response.json()[1]["title"], "abc")

        # Get article with id 1
        response = client.get('/api/adpost/1/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["title"], "abc")
        self.assertEqual(response.json()["is_owner"], True)

        # Editing article with id 1
        req_data["title"] = "hungry"
        req_data["tags"] = ['공연', '휴대폰']
        response = client.put('/api/adpost/1/', json.dumps(req_data, ), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["title"], "hungry")
        self.assertEqual(response.json()["tags"], ['공연', '휴대폰'])

        # Deleting article with id 3
        response = client.delete('/api/adpost/3/')
        self.assertEqual(response.status_code, 204)

        response = client.get('/api/adpost/3/')
        self.assertEqual(response.status_code, 404)

        client.logout()

        client.login(email='abcd@snu.ac.kr', password='def')

        # Get article with id 1
        response = client.get('/api/adpost/1/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["title"], "hungry")
        self.assertEqual(response.json()["is_owner"], False)

        # Participate adpost 1
        response = client.post(
            '/api/adreception/', json.dumps({'adpost': '1'}, ), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        unique_link = response.json()['unique_link']

        # Participate adpost 2
        response = client.post(
            '/api/adreception/', json.dumps({'adpost': '2'}, ), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        unique_link2 = response.json()['unique_link']

        # Get all adreceptions
        response = client.get('/api/adreception/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()[0]['unique_link'], unique_link2)
        self.assertEqual(response.json()[1]['unique_link'], unique_link)

        # Get adreception which id is 1
        response = client.get('/api/adreception/1/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['unique_link'], unique_link)

        # Get my adreception of adpost 2
        response = client.get('/api/adreception/by-post/2/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['unique_link'], unique_link2)

        redirected_link = unique_link.replace(
            "https://www.adit.shop/redirectfrom=", "")
        print("redirected_link is "+redirected_link)
        response = client.get('/api/adreception/redirectto=' + redirected_link + '/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["ad_link"], "https://www.naver.com")

        response = client.get('/api/adreception/redirect/1/')
        self.assertEqual(response.status_code, 200)

    def test_not_important(self):
        client = Client()

        # We can only get tokens
        response = client.put('/api/token/')
        self.assertEqual(response.status_code, 405)

        response = client.post('/api/report/',  json.dumps({'title': 'a', 'content': 'b'}, ), content_type='application/json')
        self.assertEqual(response.status_code, 200)