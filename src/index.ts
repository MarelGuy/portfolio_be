import express, { Express, } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import {
    notFoundHandler,
    unauthorizedHandler,
    forbiddenHandler,
    badRequestHandler,
    catchAllHandler,
} from './errorHandler.js';
import routes from './routes/index.js';

dotenv.config();

const app: Express = express();

const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200
};

const port: string | undefined = process.env.PORT;

app.use(express.json());
app.use(cors(corsOptions));

app.use('/', routes);

app.use(unauthorizedHandler);
app.use(forbiddenHandler);
app.use(notFoundHandler);
app.use(badRequestHandler);
app.use(catchAllHandler);

app.listen(port, async () => {
    await mongoose.connect(process.env.MONGODB_URL!).then(() => console.log("🛢️  [database] : Connected to MongoDB"));
    console.log(`⚡️   [server] : Server is running at http://localhost:${port}`);
});
