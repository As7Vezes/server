import { Router } from "express";
import { userController } from "../controllers/userController";

export const usersRouter = Router()

usersRouter.post('/post', userController.insertUser)
usersRouter.get('/read', userController.listUsers)
usersRouter.get('/readGet/:id', userController.getUserById)
usersRouter.delete('/delete/:id', userController.deleteUser)
usersRouter.put('/put/:id', userController.updateUser)