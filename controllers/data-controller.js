const Data = require('../models/data');
const createPath = require('../helpers/create-path');

const handleError = (res, error) => {
    console.log(error);
    res.render(createPath('error'), { title: 'Error' });
};

const getData = (req, res) => {
    const title = 'DB';
    Data
        .findOne().sort({'_id':-1}).limit(1)
        .then((data) => res.render(createPath('data'), { data, title }))
        .catch((error) => handleError(res, error));
}

const getForm = (req, res) => {
    const title = 'Form';
    res.render(createPath('index'), { title });
}

const editData = (req, res) => {
    const title = 'Form';
    const { name, email, text } = req.body;
    const data = new Data({ name, email, text });
    data
        .save()
        .then((result) => res.redirect('/data'))
        .catch((error) => handleError(res, error));
}
module.exports = {
    getData,
    getForm,
    editData,
};