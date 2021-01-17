import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

const PORT = 4000;

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});
