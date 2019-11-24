import numpy as np, pandas as pd, seaborn as sns, matplotlib.pyplot as plt
import nltk
import sklearn 
import torch
import pickle, os, re, glob, ast
from matplotlib import font_manager, rc

import gensim

model = gensim.models.Word2Vec.load('models.bin')

import glob

data = glob.glob('./data/*')

raw = {}
raw['KOR'] = []
raw['ENG'] = []

for dat in data:
    for col in ['KOR', 'ENG']:
        d = pd.read_excel(dat)
        print(dat, d.columns)
        raw[col] += list(d[col])

dat = pd.DataFrame(raw)

import konlpy
from konlpy.tag import Mecab

nltk.download('punkt')
nltk.download('stopwords')
nltk.download('averaged_perceptron_tagger')
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.tag import pos_tag

tokenizer = Mecab()

dat.KOR = dat.KOR.apply(tokenizer.pos)
dat.ENG = dat.ENG.apply(word_tokenize)
dat.ENG = dat.ENG.apply(pos_tag)

stops = set(stopwords.words('english'))

for i in range(len(dat)):
    dat.KOR[i] = list(map(lambda x : x[0], list(filter(lambda x : x[1] in ['NNG', 'NNP'], dat.KOR[i]))))
    
for i in range(len(dat)):
    dat.ENG[i] = list(map(lambda x : x[0], list(filter(lambda x : x[1] in ['NN', 'NNP'], dat.ENG[i]))))


ipt = []

for i in range(len(dat)):
    ipt.append(dat.KOR[i] + dat.ENG[i])

import random, logging

for i in range(len(ipt)):
    random.shuffle(ipt[i])
    model.build_vocab

model.build_vocab(sentences=ipt, update=True, min_count=20)
logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)
model.train(sentences=ipt, epochs=10, total_examples=len(ipt))

model.save('models_engadd.bin')