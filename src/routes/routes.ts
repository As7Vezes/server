import { Router } from "express";
import multer from "multer";
import { multerConfig } from "../config/multer";
import { libraryController } from "../controllers/libraryController";

export const libraryRouter = Router()

libraryRouter.post('/post', multer(multerConfig).single('imagem'), libraryController.insertBook)
libraryRouter.get('/read', libraryController.listBooks)
libraryRouter.get('/readGet/:id', libraryController.getBooks)
libraryRouter.delete('/delete/:id', libraryController.deleteBook)
libraryRouter.put('/put/:id', multer(multerConfig).single('imagem'), libraryController.updateBook)