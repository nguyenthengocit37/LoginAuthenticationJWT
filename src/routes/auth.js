const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/AuthController');

router.post('/signup',authController.signup);
router.post('/signin',authController.signin);
router.post('/secret',authController.secret);
router.get('/',authController.index);



module.exports = router;