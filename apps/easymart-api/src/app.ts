import compression from 'compression'
import cors from 'cors'
import express, { type Express } from 'express'

import { corsOptions } from '~/config'
import { ENV } from '~/config/env'
import { logger } from '~/libs/logger'
import { errorHandler } from '~/middlewares/errorHandler'
import { httpLoggerMiddleware } from '~/middlewares/httpLogger'
import { notFound } from '~/middlewares/notFound'
import { apiLimiter } from '~/middlewares/rateLimiter'
import { monitoringRouter } from '~/routes/monitoring.router'

export class App {
  app: Express
  apiPrefix: string
  port: number

  constructor() {
    this.app = express()
    this.port = ENV.PORT
    this.apiPrefix = ENV.DEFAULT_API_PREFIX
    this.initMiddlewares()
    this.setupRouter()
    this.initErrorHandle()
  }

  listen() {
    this.app.listen(this.port, () => {
      logger.info(`Server running on port ${this.port}`)
    })
  }

  private initMiddlewares() {
    this.app.use(httpLoggerMiddleware)
    this.app.use(cors(corsOptions))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(compression())
    this.app.use(this.apiPrefix, apiLimiter)
  }

  private setupRouter() {
    this.app.use(this.apiPrefix, monitoringRouter)
    this.app.use(notFound)
  }

  private initErrorHandle() {
    this.app.use(errorHandler)
  }
}
