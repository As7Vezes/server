import { Response } from 'express'

export const badRequest = (res: Response, err: string) => {
    return res.status(400).json({
        err
    })
}

export const internalServerError = (res: Response, err: Error) => {
    return res.status(500).json({
        err: err.message
    })
}