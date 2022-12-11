import { badRequest, internalServerError } from "../utils/util";
import { Request, Response } from "express";
import { Iuser, userModel } from "../model/userModel";

const insertUser = async (req: Request, res: Response) => {

    const user: Iuser = req.body as Iuser

            const product = await userModel.insertUser(user);
            return res.json(product);   
}

const listUsers = (req: Request, res: Response) => {
    userModel.listUsers()
    .then(users => {
        res.json({ users })
    })
    .catch(err => internalServerError(res, err));
}

const getUserById = async (req: Request, res: Response) => {

        const id = parseInt(req.params.id)
        const retorno = await userModel.getUserById(id)

        if(retorno){
            return res.json({ retorno }) 
        }

        return res.json({erro: 'error'})
}

const deleteUser= async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const retorno = await userModel.deleteUser(id)
    if(retorno || undefined){
        return res.sendStatus(200)
    }
}

const updateUser = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id)
    const user: Iuser = req.body as Iuser
    {
        const productSave = userModel.getUserById(id)
        if(!productSave)
            return res.json({ message: 'User not found'})
    } 

    const retorno = await userModel.updateUser(user,id)
    return res.json(retorno) 

}

export const userController = {
    insertUser,
    listUsers,
    getUserById,
    deleteUser,
    updateUser
}