import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import conectDB from './config/db.js';
import userRouter from './routes/userRouters.js';
import projectRouter from './routes/projectRouters.js';
import taskRouter from './routes/taskRouters.js';

const app = express();
app.use(express.json());
dotenv.config();
conectDB();

// To connect from frontend
const allowedHost = ['http://localhost:5173', 'render.com'];

const corsSettings = {
  origin: (origin, callback) => {
    if (allowedHost.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('You has been blocked by CORS policy'));
    }
  },
};

app.use(cors(corsSettings));

// Create router
app.use('/api/users', userRouter);
app.use('/api/projects', projectRouter);
app.use('/api/tasks', taskRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server runing at ${port}`);
});
