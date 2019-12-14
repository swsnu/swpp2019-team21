from .models import *
from datetime import datetime, date, timedelta, time
from .ml import suggest

def set_data_by_day():
    now = datetime.now()
    yesterday = datetime.strftime(now - timedelta(1), '%Y-%m-%d')
    print('#'*10+'SET DATA FOR {}'.format(yesterday)+'#'*10)
    for post in AdPost.objects.all().filter(closed = False):
        if post.expiry_date < date.today():
            post.closed = True
        post.view_by_date += '{"date":"%s","view":%d}, ' % (yesterday, post.total_views)
        post.save()
        print('Title : \t{}'.format(post.title))
        print('Closed : \t{}'.format(post.closed))
        print('ViewLog : \n{}'.format(post.view_by_date.replace('"','').replace('{','').replace('}, ','\n').replace(',','\t')))
    print("Time Comsumed : {}".format(datetime.now()-now))


def lazy_learn():
    now = datetime.now()
    targetlist = SuggestPending.objects.all()
    print('#' * 10 + 'SET DATA FOR {}'.format(now) + '#' * 10)
    res = [suggest.update_tag(list(map(lambda x: x.content, obj.post.tags.all())), 5) for obj in targetlist]
    SuggestPending.objects.all().delete()
    if res != []:
        for rep in res:
            print(rep)
        print("Change applied")
    else:
        print("No change applied")
    print("Time Comsumed : {}".format(datetime.now()-now))