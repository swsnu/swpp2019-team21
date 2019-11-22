import gensim
import numpy as np, pandas as pd
import random
from adit.models import *

def update_tag(model, tag_list, shuffle_size):
    sentence = []
    for _ in range(shuffle_size):
        sentence.append(tag_list)
        random.shuffle(tag_list)
    print(sentence)
    model.build_vocab(sentences=sentence, update=True, min_count=shuffle_size)
    model.train(sentences=sentence,epochs=300, total_examples=shuffle_size)
    model.save('models.bin')

def tag_similarity(model, data_exist, data_input):
    data = data_exist
    suma = 0
    for word in data_input:
        for tar in data:
            try:
                suma += model.wv.similarity(word,tar)
            except:
                pass
    
    return suma/(len(data)*len(data_input))

def tag_suggest(model, data_exist, data_input, TH = -1):
    #data_exist = ['전시회', '서울대', '박람회', '동아리', '공연', '휴대폰', '태블릿', '노트북스', '사랑', '어린이', '봉사', '날씨', '취업', '개발', '컴퓨터', '개발자', '코딩', '커피', '카페인']
    data_num = np.array(list(map(lambda x : x.postcount, data_exist)))#np.array([80,20,40,65,95,18,20,32,5,10,45,15,85,34,75,85,15,19,68])
    #data_input = ['연세대', '서울대', '밴드']
    data = pd.DataFrame({'tag':list(map(lambda x : x.content, data_exist)), 'val':data_num/sum(data_num)})
    data_input = list(map(lambda x : x.content, data_input))
    sim = {}
    for tag in data_input:
        for idx, tar in data.iterrows():
            if tar[0] == tag:
                pass
            else:
                try:
                    if not tar[0] in sim:
                        sim[tar[0]] = model.wv.similarity(tag,tar[0]) * tar[1]
                    else:
                        sim[tar[0]] += model.wv.similarity(tag,tar[0]) * tar[1]
                except:
                    pass
    
    res = sorted(sim.items(), key = lambda x : -x[1])
    return list(map(lambda x: x[0], list(filter(lambda x: x[1]>TH, res))[:10]))


def post_suggest(model, adposts, data_input, TH = 2e-2):
    sim = []
    for post in adposts:
        tag = list(map(lambda x:x.content, post.tags.all()))
        tag_input = list(map(lambda x:x.content, data_input.all()))
        sim.append((post, tag_similarity(model, tag, tag_input)))

    res = sorted(sim, key = lambda x : -x[1])
    res = list(map(lambda x: x[0].pk, list(filter(lambda x: x[1]>TH, res))[:100]))
    return AdPost.objects.filter(pk__in = res)