const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
// require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;


/* Connect to Mongoose */
mongoose.connect(process.env.DB_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify: false
}).then(() => {
    console.log('connected to db successfully');
}).catch((err) => {
    console.error('Failed to connect to db: ', err);
});

app.use(bodyParser.json())
// Use Api routes in the App
require("./routes/api-routes")(app);

app.listen(port, function() {
    console.log(`Running on port ${port}"..."`);
});

