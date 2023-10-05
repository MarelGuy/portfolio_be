import { Router } from "express";
import pagesRouter from './pages/index.js';

const app: Router = Router();

app.use("/page", pagesRouter);

export default app;