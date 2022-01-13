const Router = require('express').Router();

const ClientRoute = require('./client');
const FilterRoute = require('./filter')

Router.use('/', ClientRoute);
Router.use('/filter', FilterRoute);

module.exports = Router;
