import { dbQuery, dbQueryFirst } from "../database/db";

export interface Iuser {
    nome: string;
    email: string;
    senha: string;
}

const insertUser = async (user: Iuser) => {
    await dbQuery(
        `INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)`, 
        [user.nome, user.email, user.senha]
    )
    return loginUsers(user);
}

const listUsers = async () => {
    const retorno = await dbQuery(`SELECT * FROM users`)
    return retorno as Iuser[]
}

const loginUsers = async (user: Iuser) => {
    const retorno = await dbQuery(`SELECT * FROM users WHERE email = ?, senha = ?`, [user.email, user.senha]);
    return retorno as unknown as Iuser | undefined;
}

const getUserById = async (id: number) => {
    const retorno = await dbQuery(`SELECT * FROM users WHERE id = ?`, [id]);
    return retorno as unknown as Iuser | undefined;
}

const deleteUser = async (id: number) => {
    const retorno = await dbQueryFirst(`DELETE FROM users WHERE id = ?`, [id])
    return retorno as unknown as Iuser | undefined
}

const updateUser = async (user: Iuser, id: number) => {
    let query: string = 'UPDATE users SET '

    if(user.nome){
        if(user.email){
            query += `nome = "${user.nome}",`
        }else{
            query += `nome = "${user.nome}"`
        }
    }
    if(user.email){
        if(user.senha){
            query += `email = "${user.email}",`
        }else{
            query += `email = "${user.email}"`
        }
    }
    if(user.senha){
            query += `senha = "${user.senha}"`
    }

    console.log(query)

    query += ` WHERE id = ${id}`


    await dbQuery(query)
    return getUserById(id)
}

export const userModel = {
    insertUser,
    listUsers,
    getUserById,
    deleteUser,
    updateUser,
    loginUsers
}