import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

const SCOREBOARD_COLLECTION_NAME = 'games-scoreboard';
const GAMES_COLLECTION_NAME = 'games';

admin.initializeApp();
const db = admin.firestore();

const shouldAddScore = async (mode, newScore) => {
  const results = await db.collection(SCOREBOARD_COLLECTION_NAME).doc(mode).get();
  if (!results.exists) {
    return true;
  }

  const score = results.data().score;
  return score < newScore;
}

const addGameInGamesCollection = async game => {
  await db.collection(GAMES_COLLECTION_NAME).doc().create(game);
}

const updateScore = async (mode, score) => {
  await db.collection(SCOREBOARD_COLLECTION_NAME).doc(mode).set({score});
}

functions.firestore.document

import * as express from 'express';
import * as bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.post('/games', async (req, res) => {
  if (!req.body.mode) {
    res.status(400).send('Mode is required');
    return;
  }

  if (!req.body.username) {
    res.status(400).send('Username is required');
    return;
  }

  if (!req.body.score) {
    res.status(400).send('Score is required');
    return;
  }

  await addGameInGamesCollection({
    username: req.body.username,
    score: req.body.score,
    mode: req.body.mode
  });

  if (await shouldAddScore(req.body.mode, req.body.score)) {
    await updateScore(req.body.mode, req.body.score);
  }

  res.status(200).send();
});

export default functions.https.onRequest(app);
