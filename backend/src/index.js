import express from 'express'
import apiRouter from './routes/base-route.js'
import config from './core/config.js'
import { applyAppMiddlewares } from './middlewares/appMiddleware.js'
import { appErrorHandler } from './middlewares/errorHandler.js'
import { connectDb } from './lib/db/db.js'
import { app, server } from './lib/connections/socket.js'
import path from 'path'

const initApp = async () => {
  const PORT = config.PORT
  const __dirname = path.resolve()
  applyAppMiddlewares(app)

  await connectDb()
  app.use('/api', apiRouter)

  if (config.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')))
    app.get('/api/*', (req, res) => {
      res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'))
    })

    app.get(['/login', '/signup', '/'], (req, res) => {
      res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'))
    })
  }

  app.use(appErrorHandler)
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

initApp().catch((e) => {
  console.error(e)
})
