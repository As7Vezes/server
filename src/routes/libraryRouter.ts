import { Router } from "express";
import { libraryController } from "../controllers/libraryController";

const libraryRouter = Router()

libraryRouter.post('/post', libraryController.insertBook)
libraryRouter.get('/read', libraryController.listBooks)
libraryRouter.get('/readGet/:id', libraryController.getBooks)
libraryRouter.delete('/delete/:id', libraryController.deleteBook)
libraryRouter.put('/put/:id', libraryController.updateBook)

export default libraryRouter