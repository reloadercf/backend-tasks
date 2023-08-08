import express from 'express';
import dotenv from 'dotenv';
import conectDB from './config/db.js';
import userRouter from './routes/userRouters.js';

const app = express();
app.use(express.json());
dotenv.config();
conectDB();

// Create router
app.use('/api/users', userRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server runing at ${port}`);
});
