from pandas.io.json import json_normalize
import pandas as pd
import numpy as np
from zipfile import ZipFile
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from pathlib import Path
import matplotlib.pyplot as plt
import requests
import json
base = "http://localhost:5000/"
# base = "http://localhost:8080/"
headers = {'Content-Type': 'application/json'}
response = requests.post(base+"user/login",headers=headers,data=json.dumps({
    "email":"admin@gmail.com",
    "password":"123456"
}))
print(response.status_code)
print(response.json())
token = response.json()['accesstoken']
# print(token)
headers = {'Content-Type': 'application/json', 'Authorization':token}
response = requests.get(base+"api/train",headers=headers)
response = response.json()
print(response)
# nums_file = "nums.csv"
# df = pd.read_csv(nums_file)
df = json_normalize(response)
user_ids = df["uid"].unique().tolist()
user2user_encoded = {x: i for i, x in enumerate(user_ids)}
userencoded2user = {i: x for i, x in enumerate(user_ids)}
post_ids = df["pid"].unique().tolist()
prod2prod_encoded = {x: i for i, x in enumerate(post_ids)}
post_encoded2post = {i: x for i, x in enumerate(post_ids)}
df["user"] = df["uid"].map(user2user_encoded)
df["post"] = df["pid"].map(prod2prod_encoded)

num_users = len(user2user_encoded)
num_posts = len(post_encoded2post)
df["num"] = df["num"].values.astype(np.float32)
# min and max nums will be used to normalize the nums later
min_num = min(df["num"])
max_num = max(df["num"])

print(
    "Number of users: {}, Number of posts: {}, Min num: {}, Max num: {}".format(
        num_users, num_posts, min_num, max_num
    )
)
df = df.sample(frac=1, random_state=42)
x = df[["user", "post"]].values
# Normalize the targets between 0 and 1. Makes it easy to train.
y = df["num"].apply(lambda x: (x - min_num) / (max_num - min_num)).values
# Assuming training on 90% of the data and validating on 10%.
train_indices = int(0.9 * df.shape[0])
x_train, x_val, y_train, y_val = (
    x[:train_indices],
    x[train_indices:],
    y[:train_indices],
    y[train_indices:],
)
EMBEDDING_SIZE = 50


class RecommenderNet(keras.Model):
    def __init__(self, num_users, num_posts, embedding_size, **kwargs):
        super(RecommenderNet, self).__init__(**kwargs)
        self.num_users = num_users
        self.num_posts = num_posts
        self.embedding_size = embedding_size
        self.user_embedding = layers.Embedding(
            num_users,
            embedding_size,
            embeddings_initializer="he_normal",
            embeddings_regularizer=keras.regularizers.l2(1e-6),
        )
        self.user_bias = layers.Embedding(num_users, 1)
        self.post_embedding = layers.Embedding(
            num_posts,
            embedding_size,
            embeddings_initializer="he_normal",
            embeddings_regularizer=keras.regularizers.l2(1e-6),
        )
        self.post_bias = layers.Embedding(num_posts, 1)

    def call(self, inputs):
        user_vector = self.user_embedding(inputs[:, 0])
        user_bias = self.user_bias(inputs[:, 0])
        post_vector = self.post_embedding(inputs[:, 1])
        post_bias = self.post_bias(inputs[:, 1])
        dot_user_post = tf.tensordot(user_vector, post_vector, 2)
        # Add all the components (including bias)
        x = dot_user_post + user_bias + post_bias
        # The sigmoid activation forces the num to between 0 and 1
        return tf.nn.sigmoid(x)


model = RecommenderNet(num_users, num_posts, EMBEDDING_SIZE)
model.compile(
    loss=tf.keras.losses.BinaryCrossentropy(), optimizer=keras.optimizers.Adam(lr=0.001)
)
# model.summary()
history = model.fit(
    x=x_train,
    y=y_train,
    batch_size=64,
    epochs=100,
    verbose=1,
    validation_data=(x_val, y_val),
)
plt.plot(history.history["loss"])
plt.plot(history.history["val_loss"])
plt.title("model loss")
plt.ylabel("loss")
plt.xlabel("epoch")
plt.legend(["train", "test"], loc="upper left")
plt.show()
# model.save("pred_model")
# post_df = pd.read_csv("posts.csv")
# Let us get a user and see the top recommendations.
response = requests.get(base+"api/ptrain",headers=headers)
response = response.json()
post_df = json_normalize(response)
print(post_df)
for user_id in user_ids:
# user_id = df.uid.sample(1).iloc[0]
    print("---------------",user_id)
    posts_watched_by_user = df[df.uid == user_id]
    posts_not_watched = post_df[
        ~post_df["pid"].isin(posts_watched_by_user.pid.values)
    ]["pid"]
    posts_not_watched = list(
        set(posts_not_watched).intersection(set(prod2prod_encoded.keys()))
    )
    posts_not_watched = [[prod2prod_encoded.get(x)] for x in posts_not_watched]
    user_encoder = user2user_encoded.get(user_id)
    user_post_array = np.hstack(
        ([[user_encoder]] * len(posts_not_watched), posts_not_watched)
    )
    print("hjhj",user_post_array)
    if(len(user_post_array) <= 0):
        print("cyka")
        continue
    nums = model.predict(user_post_array).flatten()
    top_nums_indices = nums.argsort()[-10:][::-1]
    recommended_post_ids = [
        post_encoded2post.get(posts_not_watched[x][0]) for x in top_nums_indices
    ]

    print("Showing recommendations for user: {}".format(user_id))
    print("====" * 9)
    print("posts with high nums from user")
    print("----" * 8)
    top_posts_user = (
        posts_watched_by_user.sort_values(by="num", ascending=False)
        .head(5)
        .pid.values
    )
    post_df_rows = post_df[post_df["pid"].isin(top_posts_user)]
    for row in post_df_rows.itertuples():
        print(user_id, ":", row.pid)

    print("----" * 8)
    print("Top 10 post recommendations")
    print("----" * 8)
    recommended_posts = post_df[post_df["pid"].isin(recommended_post_ids)]
    i = 10
    for row in recommended_posts.itertuples():
        print(user_id, ":", row.pid)
        i= i-1
        recom = {
            "num" : i,
            "productId":row.pid,
            "userId":user_id
        }
        print(recom)
        response = requests.post(base+"api/addrec",headers=headers,data=json.dumps(recom))
        print(response.json())

