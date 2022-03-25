const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../app/controllers/AuthController');
const {middlewareToken,verifyTokenAndAdminAuth} = require('../middleware/auth');

const isLoggedIn =(req, res, next)=>{
    if(req.user) next();
    else res.send('error login')
}

router.get('/google',
    passport.authenticate('google', { scope:[ 'email', 'profile' ] }
));
router.get('/success',isLoggedIn,(req, res) => {
    const username = req.user.displayName;
    res.render('home',{ username});
})
router.get( '/google/callback',
    passport.authenticate( 'google', {failureRedirect: '/google/failure'}),
        (req, res) => {
            res.redirect('/success');
        });
router.get( '/google/failure',(req,res)=>{
        res.send('You failed to login. Please try again.');
})
router.get('/getAllUsers',middlewareToken,authController.getAllUsers);
router.post('/signup',authController.signup);
router.post('/signin',authController.signin);
router.post('/logout',authController.logout);
router.post('/secret',authController.secret);
router.get('/:id',verifyTokenAndAdminAuth,authController.delete);
router.get('/',authController.index);



module.exports = router;