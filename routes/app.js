const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 4000;
const dev = process.env.NODE.ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();

module.exports = {
  port,
  dev,
  app,
  handle,
  server
};
