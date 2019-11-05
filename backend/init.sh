virtualenv venv
source venv/bin/activate
rm -rf db.sqlite3
rm -rf ./adit/0001_initial.py
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
cd ./initial_data_set
rm -rf ../media
cp -b -rf initial_media ../media
cd ..
python manage.py loaddata ./initial_data_set/initial_data.json
python manage.py runserver
