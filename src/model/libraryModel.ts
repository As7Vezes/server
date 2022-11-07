import { dbQuery, dbQueryFirst } from "../database/db";

export interface Ibook {
    map(): unknown;
    nome?: string,
    autor?: string,
    editora?: string,
    imagem?: string
}



const insertBilbi = async (book: Ibook) => {
    await dbQuery(
        `INSERT INTO library (nome, autor, editora, imagem) VALUES (?, ?, ?, ?)`, 
        [book.nome, book.autor, book.editora, book.imagem]
    )
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE name = 'library'`)
    return getBook(retorno[0].Id);
}

const listBooks = async () => {
    const retorno = await dbQuery(`SELECT * FROM library`)
    return retorno as Ibook[]
}

const getBook = async (id: number) => {
    const retorno = await dbQuery(`SELECT * FROM library WHERE id = ?`, [id]);
    return retorno as unknown as Ibook | undefined;
}

const deleteBook = async (id: number) => {
    const retorno = await dbQueryFirst(`DELETE FROM library WHERE id = ?`, [id])
    return retorno as unknown as Ibook | undefined
}

const updateBook = async (book: Ibook, id: number) => {
    let query: string = 'UPDATE library SET '

    if(book.nome){
        if(book.autor){
            query += `nome = "${book.nome}",`
        }else{
            query += `nome = "${book.nome}"`
        }
    }
    if(book.autor){
        if(book.editora){
            query += `autor = "${book.autor}",`
        }else{
            query += `autor = "${book.autor}"`
        }
    }
    if(book.editora){
        if(book.imagem){
            query += `autor = "${book.editora}",`
        }else{
            query += `autor = "${book.editora}"`
        }
    }
    if(book.imagem){
        query += `imagem = "${book.imagem}" `
    }


    console.log(query)

    query += ` WHERE id = ${id}`


    await dbQuery(query)
    return getBook(id)
}

export const libraryModel = {
    insertBilbi,
    listBooks,
    getBook,
    deleteBook,
    updateBook
}