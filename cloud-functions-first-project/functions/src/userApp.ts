import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import * as express from 'express';
import * as bodyParser from 'body-parser';

export const auth = functions.auth.user().onCreate(user => {
  console.log(JSON.stringify(user));

  return db.collection('users').doc().set({
    username: user.displayName,
    email: user.email
  });
});

admin.initializeApp();
const db = admin.firestore();

const app = express();

app.use(bodyParser.json());

app.get('/users', async (req, res) => {
  const results = await db.collection('users').get();
  const documents = [];

  results.forEach(doc => {
    documents.push({
      id: doc.id,
      data: doc.data()
    });
  })

  res.send(documents);
})

app.post('/users', async (req, res, next) => {
  if (!req.body.username) {
    res.status(400).send('Username is required');
    return;
  }

  if (!req.body.email) {
    res.status(400).send('Email is required');
    return;
  }

  // Add the user to the collection
  await db.collection('users').doc().set({
    username: req.body.username,
    email: req.body.email
  });

  res.send('Success!');
});

export const api = functions.https.onRequest(app);
