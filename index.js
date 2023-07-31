import express from 'express';
import dotenv from 'dotenv';
import conectDB from './config/db.js';

const app = express();
const port = process.env.PORT;
dotenv.config();
conectDB();

app.listen(port, () => {
  console.log('algo jaja');
});
