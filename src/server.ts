import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors' 
// import { libraryRouter } from './routes/routes'
import bodyParser from 'body-parser'
import path from 'path'
import { useRoutes } from './routes'

const PORT = 8787

const app = express()
app.use(express.json())
app.use(cors())
useRoutes(app)
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(PORT, () => {
    console.log(`Servidor conectado na porta: ${PORT}`)
})