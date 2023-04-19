const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');




router.get('/', userController.getEmail);

router.post('/', userController.postEmail);

router.get('/menu', userController.getMenuForToday);

module.exports = router;
