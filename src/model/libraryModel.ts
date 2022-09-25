import { dbQuery, dbQueryFirst } from "../database/db";

export interface Ibook {
    nome: string,
    autor: string,
    editora: string,
    image: string
}



const insertBilbi = async (book: Ibook) => {
    await dbQuery(
        `INSERT INTO library (nome, autor, editora, imagem) VALUES (?, ?, ?, ?)`, 
        [book.nome, book.autor, book.editora, book.image]
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
    await dbQuery(
        `UPDATE library SET nome = ?, autor = ?, editora = ?, imagem = ?  WHERE id = ?`, 
        [book.nome, book.autor, book.editora, book.image, id],
    )
    return getBook(id)
}

export const libraryModel = {
    insertBilbi,
    listBooks,
    getBook,
    deleteBook,
    updateBook
}