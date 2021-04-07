import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp();

const app = require('express')();

const router = require('express').Router();

app.use(router);

router.get('/hello', (req, res) => {
  res.send('Hello!');
});

router.get('/bye', (req, res) => {
  res.send('Bye');
});

export default functions.https.onRequest(app);