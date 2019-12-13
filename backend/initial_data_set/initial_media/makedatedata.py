import random
import os
import numpy as np
#format : {"date":"2019-11-30","view":0}, 	
while True:
    print("시작날짜를 입력하세요")
    sdate = int(input())
    print("끝날짜를 입력하세요")
    fdate = int(input())
    print("Targetview를 입력하세요")
    tarview=int(input())
    with open("dat.log", 'w') as f:
        dat = ""
        ssdate = sdate
        lst = np.array([])
        while ssdate <= fdate:
            lst = np.append(lst, random.random())
            ssdate+=1
            if ssdate == 20191132: ssdate = 20191201
        lst.sort()
        lst = lst*tarview//max(lst);
        i = 0;
        while sdate <= fdate:
            dat+="{\"date\":\""+str(sdate//10000)+"-"+str(sdate//100%100)+"-"+str(sdate%100)+"\",\"view\":"+str(int(lst[i]))+"}, "
            sdate+=1
            if sdate == 20191132: sdate = 20191201
            i+=1
        f.write(dat)