const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const formRoutes = require('./routes/form-routes');
const createPath = require('./helpers/create-path');

const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').white;

const app = express();

app.set('view engine', 'ejs');

mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log(successMsg('Connected to DB')))
    .catch((error) => console.log(errorMsg(error)));

app.listen(process.env.PORT, (error) => {
    error ? console.log(errorMsg(error)) : console.log(successMsg(`listening port ${process.env.PORT}`));
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({ extended: false }));

app.use(express.static('styles'));
app.use(express.static('js'));

app.use(formRoutes);

app.use((req, res) => {
    const title = 'Error page';
    res
        .status(404)
        .render(createPath('error'), { title });
});