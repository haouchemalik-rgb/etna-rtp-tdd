import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import UserRouter from './routes/users.route';
import ChannelRouter from './routes/channels.route';
import seminaryRouter  from './routes/seminary.route'
import taskRouter  from './routes/task.route';

require('dotenv').config();

const port = process.env.SERVER_PORT;
const app: Application = express();

app.use(cookieParser());
app.use(cors({
  origin: `http://localhost:${process.env.CLIENT_PORT}`,
  credentials: true,
}))
app.use(express.json());

app.use('/seminary', seminaryRouter);
app.use('/task', taskRouter);
app.use('/user', UserRouter);
app.use('/channel', ChannelRouter);

let server: any;
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(port, () => {
    console.log(`Your API is now listening on port ${port}`);
  });
}

export { server };
