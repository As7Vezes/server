import { Express } from "express";
import libraryRouter from "./libraryRouter";
import { usersRouter } from "./usersRouter";

export const useRoutes = (app: Express) => {
    app.use('/library', libraryRouter)
    app.use('/users', usersRouter)
}