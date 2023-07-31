const express = require('express');

const routes = require('@Routes');

const cors = require('@Config/cors');

const error = require('@Middlewares/error');

const app = express();

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes definition
app.use(routes);

// Default Error
app.use(error);

module.exports = app;
