import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp();

export const firstHttpFunction = functions.https.onRequest((req, res) => {
  console.log(JSON.stringify(req.body), req.method, req.query);
  res.send('Hello world2');
});
