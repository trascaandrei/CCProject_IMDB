const express = require('express')
const procController = require('./controllers/processor.controller');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const createError = require("http-errors");
const { ServerError } = require('./errors');
const router = require('express').Router();

require("express-async-errors");
require('dotenv').config();

const app = express()
const port = process.env.PORT || 3002;

mongoose.connect(process.env.DB_PATH, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to db successfully');
}).catch((err) => {
    console.error('Failed to connect to db: ', err);
});

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));

app.post('/api/filter', procController.filterTask)

app.use((err, req, res, next) => {
	console.error(err);
	let status = 500;
	let message = "Something Bad Happened";
	if (err instanceof ServerError) {
		status = err.httpStatus;
		message = err.message;
	} else if (err.isAxiosError) {
		return next(createError(err.response.status, err));
	}
	return next(createError(status, message));
});

app.listen(port, () => {
  console.log(`IMDB Processor is listening on port ${port}`)
})