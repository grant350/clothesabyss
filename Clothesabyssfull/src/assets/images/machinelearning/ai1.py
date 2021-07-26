import tensorflow as tf
import sys as _sys
import pandas as pd
import matplotlib.pyplot as plt
import sklearn
import numpy as np
from sklearn import datasets, linear_model

#data
stocks = [12,232,32,64,236,234,62,67,743,1236,363,62,36,23,1,74,22]
volume = [1200,23200,3200,6400,23600,23400,6200,6700,74300,12360,36300,6200,3600,2300,100,7400,2200]
v2 = np.array(volume).reshape((-1,1))

print()

'''
#for linear function
x = np.linspace(0, 4)
plt.plot(x, x, label='linear')
plt.xlabel('x label')
plt.ylabel('y label')
plt.title("Simple Plot")
//plt.legend()
plt.show()
'''

'''
#sin function
x = np.arange(0,10,.12)
y = np.sin(x)
fig = plt.figure()
ax = fig.subplots()
ax.plot(x, y)
ax.set_title('awesome graph')
plt.show()
'''
