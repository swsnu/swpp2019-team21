virtualvenv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
cd ./initial_data_set
rm -rf ../media
cp -b -rf initial_media ../media
cd ..
python manage.py loaddata ./initial_data_set/initial_data.json
python manage.py runserver