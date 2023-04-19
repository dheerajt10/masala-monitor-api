const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');




router.get('/', userController.getEmail);

router.post('/', userController.postEmail);

module.exports = router;
