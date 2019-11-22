sudo apt-get install mysql-client mysql-server
virtualenv venv
source venv/bin/activate
rm -rf ./adit/0001_initial.py
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
rm -rf media
mkdir media
cp -rf ./initial_data_set/initial_media/* ./media
python manage.py loaddata ./initial_data_set/initial_data.json
python manage.py runserver