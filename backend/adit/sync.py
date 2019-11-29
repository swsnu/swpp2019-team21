from .models import *
from datetime import datetime, date, timedelta

def set_data_by_day():
    yesterday = datetime.strftime(datetime.now() - timedelta(1), '%Y-%m-%d')
    print('#'*100+'SET DATA FOR {}'.format(yesterday)+'#'*100)
    for post in AdPost.objects.all().filter(closed = False):
        if post.expiry_date < date.today():
            post.closed = True
        post.view_by_date += ' { date : ' + '\'' + yesterday + '\', view : ' + str(post.total_views)+' },'
        post.save()
        print('set_'+post.title, post.view_by_date, post.closed)