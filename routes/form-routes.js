const express = require('express');
const { getData,
        getForm,
        editData,
} = require('../controllers/data-controller');

const router = express.Router();

router.get('/', getForm);
router.get('/data', getData);
router.post('/', editData);

module.exports = router;