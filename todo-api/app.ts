import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { apiErrorHandler, defaultErrorHandler, routeNotFoundHandler } from './middlewares/errorHandlers';
import { apiRouter } from './routes';

const mongoServer = new MongoMemoryServer();

// connect to in-memory mongodb
mongoServer.getUri().then((mongoUri) => {
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(mongoUri, mongooseOpts);

  mongoose.connection.on('error', (e) => {
    if (e.message.code === 'ETIMEDOUT') {
      console.log(e);
      mongoose.connect(mongoUri, mongooseOpts);
    }
    console.log(e);
  });

  mongoose.connection.once('open', () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`);
  });
});

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

// routes
app.use('/api', apiRouter);

// default error handler
app.use(routeNotFoundHandler);
app.use(apiErrorHandler);
app.use(defaultErrorHandler);

const PORT = process.env.port || 4000;

// start the server
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});
