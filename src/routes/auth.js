const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../app/controllers/AuthController');
const {middlewareToken,verifyTokenAndAdminAuth} = require('../middleware/auth');

router.get('/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

router.get( '/google/login',
    passport.authenticate( 'google', {
        failureRedirect: '/google/failure'}),
        (req, res) => {
            res.render('home',{username : req.user.displayName});
        });
router.get( '/google/failure',(req,res)=>{
        res.send('You failed to login. Please try again.');
})
router.get('/getAllUsers',middlewareToken,authController.getAllUsers);
router.post('/signup',authController.signup);
router.post('/signin',authController.signin);
router.post('/secret',authController.secret);
router.get('/:id',verifyTokenAndAdminAuth,authController.delete);
router.get('/',authController.index);



module.exports = router;