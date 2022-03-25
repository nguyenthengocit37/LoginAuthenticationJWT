const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../app/controllers/AuthController');
const {middlewareToken,verifyTokenAndAdminAuth} = require('../middleware/auth');
const {isLoggedIn} = require('../middleware/auth/login');
const passportGoogle = require('../middleware/auth/passport')



router.get('/google',passport.authenticate('google', { scope:[ 'email', 'profile' ] }));
router.get( '/google/callback',passportGoogle,authController.googleCallback);
router.get( '/google/failure',authController.loginFailed);
router.get('/success',isLoggedIn,authController.loginGoogleSuccess);
router.get('/getAllUsers',middlewareToken,authController.getAllUsers);
router.post('/signup',authController.signup);
router.post('/signin',authController.signin);
router.post('/logout',authController.logout);
router.post('/secret',authController.secret);
router.get('/:id',verifyTokenAndAdminAuth,authController.delete);
router.get('/',authController.index);



module.exports = router;