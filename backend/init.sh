sudo apt-get install mysql-client mysql-server
sudo apt-get install libmysqlclient-dev -y
virtualenv venv --python=python3
source venv/bin/activate
rm -rf ./adit/0001_initial.py
pip install -r requirements.txt
sudo mysql < db_set
sudo service mysql restart
sudo mysql < db_create
mysql -uroot adit_db < adit_db.sql
python manage.py makemigrations
python manage.py migrate
rm -rf media
mkdir media
cp -rf ./initial_data_set/initial_media/* ./media
python manage.py loaddata ./initial_data_set/initial_data.json
python manage.py crontab remove
python manage.py crontab add
sudo service cron start
python manage.py runserver