import numpy as np, pandas as pd
import pickle, os, re, glob
import gensim
import glob
import konlpy
import nltk
from konlpy.tag import Mecab
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.tag import pos_tag
import random, logging

nltk.download('punkt')
nltk.download('stopwords')
nltk.download('averaged_perceptron_tagger')

logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)

tokenizer = Mecab()

model = gensim.models.Word2Vec.load('ko.bin')

data = glob.glob('./data/*')

#############################################################################################################
#############################################################################################################

raw = {}
raw['KOR'] = []
raw['ENG'] = []

for dat in data:
    for col in ['KOR', 'ENG']:
        d = pd.read_excel(dat)
        print(dat, d.columns)
        raw[col] += list(d[col])

dat = pd.DataFrame(raw)

#############################################################################################################
#############################################################################################################

dat.KOR = dat.KOR.apply(tokenizer.pos)
dat.ENG = dat.ENG.apply(word_tokenize)
dat.ENG = dat.ENG.apply(pos_tag)

stops = set(stopwords.words('english'))

for i in range(len(dat)):
    dat.KOR[i] = list(map(lambda x : x[0], list(filter(lambda x : x[1] in ['NNG', 'NNP'], dat.KOR[i]))))
    
for i in range(len(dat)):
    dat.ENG[i] = list(map(lambda x : x[0], list(filter(lambda x : x[1] in ['NN', 'NNP'], dat.ENG[i]))))

#############################################################################################################
#############################################################################################################

ipt = []

for i in range(len(dat)):
    ipt.append(dat.KOR[i] + dat.ENG[i])

for i in range(len(ipt)):
    random.shuffle(ipt[i])

#############################################################################################################
#############################################################################################################

model.build_vocab(sentences=ipt, update=True, min_count=20)
model.train(sentences=ipt, epochs=10, total_examples=len(ipt))

model.save('models_engadd.bin')

