import express from 'express';
import path from 'path'; // from node.js
import routers from './router';

import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.router();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  router() {
    this.server.use(routers);
  }
}

export default new App().server;
