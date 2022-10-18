import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors' 
import { useRoutes } from './routes'
import { libraryRouter } from './routes/routes'
import bodyParser from 'body-parser'

const PORT = 8787

const app = express()
app.use(express.json())
app.use(cors())
app.use(libraryRouter)
app.use(bodyParser.urlencoded({ extended: true }))


app.listen(PORT, () => {
    console.log(`Servidor conectado na porta: ${PORT}`)
})