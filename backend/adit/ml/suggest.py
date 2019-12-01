import gensim
import numpy as np, pandas as pd
import random, os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
model = gensim.models.Word2Vec.load(BASE_DIR + '/ml/models.bin')


def update_tag(tag_list, shuffle_size):
    sentence = []
    for _ in range(shuffle_size):
        mock_list = tag_list[:]
        random.shuffle(mock_list)
        sentence.append(mock_list)
    model.build_vocab(sentences=sentence, update=True, min_count=shuffle_size)
    model.train(sentences=sentence, epochs=100, total_examples=shuffle_size)
    model.save(BASE_DIR + '/ml/models.bin')


def tag_similarity(data_exist, data_input):
    data = data_exist
    suma = 0
    for word in data_input:
        for tar in data:
            try:
                sim = 1 + model.wv.similarity(word, tar)
                suma += sim ** 2
            except:
                pass
    res = ''
    try:
        res = suma / (len(data) * len(data_input))
    except ZeroDivisionError:
        return 0
    return res


def tag_suggest(data_exist, data_input, threshold=0.2):
    data_num = np.array(list(
        map(lambda x: x.postcount, data_exist)))  # np.array([80,20,40,65,95,18,20,32,5,10,45,15,85,34,75,85,15,19,68])
    data = pd.DataFrame({'tag': list(map(lambda x: x.content, data_exist)), 'val': data_num / sum(data_num)})
    data_input = list(map(lambda x: x.content, data_input))
    sim = {}
    for tag in data_input:
        for idx, tar in data.iterrows():
            if tar[0] != tag:
                try:
                    if not tar[0] in sim:
                        sim[tar[0]] = model.wv.similarity(tag, tar[0]) * tar[1]
                    else:
                        sim[tar[0]] += model.wv.similarity(tag, tar[0]) * tar[1]
                except:
                    pass

    res = sorted(sim.items(), key=lambda x: -x[1])
    return list(map(lambda x: x[0], list(filter(lambda x: x[1] > threshold, res))[:10]))


def post_suggest(adposts, data_input, threshold=0.2):
    sim = []
    for post in adposts:
        tag = list(map(lambda x: x.content, post.tags.all()))
        tag_input = list(map(lambda x: x.content, data_input.all()))
        sim.append((post, tag_similarity(tag, tag_input)))

    res = sorted(sim, key=lambda x: -x[1])
    res = list(map(lambda x: x[0].pk, list(filter(lambda x: x[1] > threshold, res))[:100]))
    return res