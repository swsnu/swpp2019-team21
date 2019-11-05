virtualvenv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
cd initial_data_set
cp -b -r initial_media ../media
cd ..
python manage.py loaddata intial_data_set/initial_data.json
python runserver