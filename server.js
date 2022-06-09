require('dotenv').config();
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const PORT = process.env.PORT || 8000;

app.set('view engine', 'ejs');

MongoClient.connect(process.env.MONGO_URI)
  .then((client) => {
    console.log('Connected to database');
    const db = client.db('suggest-a-prefecture');
    const prefCollection = db.collection('prefectures');

    app.get('/', (req, res) => {
      prefCollection
        .find()
        .toArray()
        .then((results) => {
          res.render('index.ejs', { prefs: results });
        })
        .catch((err) => console.error(err));
    });

    app.listen(PORT, () => {
      console.log(`listening on PORT ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
