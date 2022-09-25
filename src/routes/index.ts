import { Application } from "express";
import Router from 'express';
import { libraryRouter } from "./routes";

export const useRoutes = (app: Application) => {
    const apiRouter = Router();
    apiRouter.use('/library', libraryRouter);

    app.use('/api/v1', apiRouter);
}