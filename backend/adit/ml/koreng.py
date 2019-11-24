import numpy as np, pandas as pd, seaborn as sns, matplotlib.pyplot as plt
import nltk
import sklearn 
import torch
import pickle, os, re, glob, ast
from matplotlib import font_manager, rc

import gensim

model = gensim.models.Word2Vec.load('.model.bin')
