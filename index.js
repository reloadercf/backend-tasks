import express from 'express';
import conectDB from './config/db.js';

const app = express();
conectDB();

app.listen(4000, () => {
  console.log('algo jaja');
});
