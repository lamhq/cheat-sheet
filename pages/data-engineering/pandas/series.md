# Pandas Series

## What is a Series?

A Pandas Series is like a column in a table. It is a one-dimensional array holding data of any type.

```python
import pandas as pd

a = [1, 7, 2]

myvar = pd.Series(a)

print(myvar)

"""
0    1
1    7
2    2
dtype: int64
"""
```


## Labels

By default, the values are labeled with their index number. First value has index 0.

This label can be used to access a specified value.

With the `index` argument, you can name your own labels.

```python
import pandas as pd

a = [1, 7, 2]

myvar = pd.Series(a, index = ["x", "y", "z"])

print(myvar["y"])
# 7
```


## Creating Series

Create from a dictionary:
```python
calories = {"day1": 420, "day2": 380, "day3": 390}
myvar = pd.Series(calories, index = ["day1", "day2"])
print(myvar)
"""
day1    420
day2    380
dtype: int64
"""
```

Create using NumPy functions:
```python
import numpy as np
pd.Series(np.arange(4, 9))
"""
0    4
1    5
2    6
3    7
4    8
dtype: int64
"""
```


## `.index` and `.values` properties

```python
import pandas as pd
import numpy as np

s = pd.Series([1, 2, 3])
print(s.values)
# [1 2 3]

print(s.index)
# RangeIndex(start=0, stop=3, step=1)
```


## `size` and `shape` properties

```python
import pandas as pd
s = pd.Series([0, 1, 2, 3])
len(s)  # 4

s.size  # 4

s.shape  # (4,)
```


## Accessing item

The series to test:
```python
s1 = pd.Series(np.arange(10, 15), index=list('abcde'))
print(s1)
"""
a    10
b    11
c    12
d    13
e    14
dtype: int64
"""
```

Get the value with label `'a'`:
```python
s1['a']   # 10
```

Get multiple items:
```python
s1[['d', 'b']]
"""
d    13
b    11
dtype: int64
"""
```

Access item by position:
```python
s1.iloc[[0, 2]]
"""
a    10
c    12
dtype: int64
"""
```


## Slicing

The series to test:
```py
import pandas as pd

s = pd.Series(np.arange(100, 110), index=np.arange(10, 20))
```

Get items at position 1 through 5:
```py
# equivalent to s.iloc[[1, 2, 3, 4, 5]]
s[1:6]
"""
11    101
12    102
13    103
14    104
15    105
dtype: int64
"""
```

Get items at position 1, 3, 5:
```py
s[1:6:2]
"""
11    101
13    103
15    105
dtype: int64
"""
```

Get first five items (same as `.head(5)`):
```py
s[:5]
```

Get items from position 4 to the end:
```py
s[4:]
```

Get all items in reverse order:
```py
s[::-1]
```

Get the last 4 items:
```py
s[-4:]
```


## Filtering

The series to test:
```py
s = pd.Series(np.arange(0, 5), index=list('abcde'))
"""
a    0
b    1
c    2
d    3
e    4
dtype: int64
"""
```

Filter values that are > 3:
```py
s[s > 3]
"""
e    4
dtype: int64
"""
```

Filter by multiple logical operators:
```py
s[(s >=2) & (s < 5)]
```

Return `True` if all items >= 0:
```py
(s >= 0).all()
# True
```

Return `True` if any items < 2:
```py
s[s < 2].any()
```

Return total value of items whose values < 3:
```py
(s < 3).sum()
# 3
```


## Modifying

The series to test:
```py
np.random.seed(123456)
s = pd.Series(np.random.randn(3), index=['a', 'b', 'c'])
"""
a    0.469112
b   -0.282863
c   -1.509059
dtype: float64
"""
```

Modify the value by lable `'d'`:
```py
s['d'] = -100
```

Remove an item by label:
```py
del(s['a'])
```

Note that modify sliced items will modify the original `Series`:
```py
source_series = s.copy() # preserve s
sliced = source_series[:2] # slice with first two items
 
# change item with label 10 to 1000
sliced['b'] = 111
# and see it in the source
source_series
"""
a      0.469112
b    111.000000
c     -1.509059
dtype: float64
"""
```


## Calculating

Calculation of two series is performed on items have the same labels.

Two series to test:
```py
s1 = pd.Series([1, 2], index=['a', 'b'])
s2 = pd.Series([3, 4], index=['a', 'b'])
```

Add two series:
```py
s1 + s2
"""
a    4
b    6
dtype: int64
"""
```

Multiply a series with a number:
```py
s1 * 2
"""
a    2
b    4
dtype: int64
"""
```

Multiply two series:
```py
s1 * s2
"""
a    3
b    8
dtype: int64
"""
```


## Re-indexing

The series to test:
```py
np.random.seed(123456)
s = pd.Series(np.random.randn(5))
```

Change the index:
```py
s.index = ['a', 'b', 'c', 'd', 'e']
```

Reindex with different number of labels:
- some items may be removed
- items with new labels will have value `NaN`
```py
s2 = s.reindex(['a', 'c', 'g'])
```

Reindex with different number of labels, fill missing values:
```py
s3 = pd.Series(['red', 'green', 'blue'], index=[0, 3, 5])
s3 = s3.reindex(np.arange(0,7), method='ffill')
```

Change index's type:
```py
s2 = pd.Series([3, 4, 5], index=['0', '1', '2'])
s2.index = s2.index.values.astype(int)
```


## Statistics

Counts of values:
```py
s = pd.Series(['a', 'a', 'b', 'c', np.NaN])
# number of occurrences of each unique value
s.count()
```

Unique values:
```py
s.unique()
```

Number of unique values (excluding NaN):
```py
s.nunique()
```