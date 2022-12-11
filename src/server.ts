import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors' 
import bodyParser from 'body-parser'
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