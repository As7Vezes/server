import { Ibook, libraryModel } from "../model/libraryModel";
import { badRequest, internalServerError } from "../utils/util";
import { Request, Response } from "express";

const insertBook = async (req: Request, res: Response) => {

    const book: Ibook = req.body as Ibook

        if(req.file){
            book.imagem = req.file.filename
            const product = await libraryModel.insertBilbi(book);
            return res.json(product);   
        }else{
            const product = await libraryModel.insertBilbi(book);
            return res.json(product);
        }
}

const listBooks = (req: Request, res: Response) => {
    libraryModel.listBooks()
    .then(products => {
        res.json({
            products,
            url: 'http://localhost:8787/files/'
        })
    })
    .catch(err => internalServerError(res, err));
}

const getBooks = async (req: Request, res: Response) => {

        const id = parseInt(req.params.id)
        const retorno = await libraryModel.getBook(id)

        if(retorno){
            return res.json({
                retorno,
                url: 'http://localhost:8787/files/'
            }) 
        }

        return res.json({erro: 'error'})
}

const deleteBook = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const retorno = await libraryModel.deleteBook(id)
    if(retorno || undefined){
        return res.sendStatus(200)
    }
}

const updateBook = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id)
    const book: Ibook = req.body as Ibook
    {
        const productSave = libraryModel.getBook(id)
        if(!productSave)
            return res.json({ message: 'book not found'})
    } 

    if(req.file){
        book.imagem = req.file.filename
        const retorno = await libraryModel.updateBook(book,id)
        return res.json(retorno)
    }
    else{
        const retorno = await libraryModel.updateBook(book,id)
        return res.json(retorno)
    }

}

export const libraryController = {
    insertBook,
    listBooks,
    getBooks,
    deleteBook,
    updateBook
}