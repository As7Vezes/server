import { Router } from "express";
import { libraryController } from "../controllers/libraryController";
import { libraryModel } from "../model/libraryModel";

export const libraryRouter = Router()

libraryRouter.post('/', libraryController.insertBook)
libraryRouter.get('/', libraryController.listBooks)
libraryRouter.get('/:id', libraryController.getBooks)
libraryRouter.delete('/:id', libraryController.deleteBook)
libraryRouter.put('/:id', libraryController.updateBook)