import './bootstrap';
import * as Sentry from '@sentry/node';
import cors from 'cors';
import express from 'express';
import RateLimit from 'express-rate-limit';
import helmet from 'helmet';
import path from 'path';
import RateLimitRedis from 'rate-limit-redis';
import redis from 'redis';
import Youch from 'youch';

import 'express-async-errors';

import sentryConfig from './config/sentry';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(helmet());
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'temp', 'uploads'))
    );

    this.server.use(
      new RateLimit({
        store: new RateLimitRedis({
          client: redis.createClient({
            url: process.env.REDIS_URL,
          }),
        }),
        windowMs: 1000 * 60 * 15,
        max: 10000,
      })
    );
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
