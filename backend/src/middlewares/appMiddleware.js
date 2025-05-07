import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
export const applyAppMiddlewares = (app) => {
  app.use(express.json({ limit: '5mb' }))
  app.use(express.urlencoded({ extended: true, limit: '5mb' }))
  app.use(cookieParser())
  app.use(
    cors({
      origin: ['http://localhost:5173'],
      methods: ['PUT', 'GET', 'POST', 'DELETE'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  )
  app.use((req, res, next) => {
    console.log(`Method: ${req.method}`)
    console.log(`Params: ${req.params}`)
    console.log(`Url: ${req.originalUrl}`)
    next()
  })
}
