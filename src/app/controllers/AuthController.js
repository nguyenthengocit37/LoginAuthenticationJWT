const User = require('../models/User');
const bcrypt = require('bcryptjs');
class AuthController{
    //[GET] /auth
    index(req, res, next) {
        res.render('login');
    }
    //[POST] /auth/signup
    async signup(req, res, next) {
        const { name, pass ,email } = req.body;
        
        if(!name || typeof name !== 'string'){
            return res.json({ error:'Invalid Username'});
        }
        else if(!pass || typeof pass !== 'string'){
            return res.json({ error:'Invalid Password'});
        }
        else if(!email || typeof email !== 'string'){
            return res.json({ error:'Invalid Email'});
        }
        else if(pass.length < 6){
            return res.json({ error:'Password must be at least 6 characters'});
        }else{
            const foundUser = await User.where({email});
            foundUser.findOne((err, existingUser) => {
                if(err) {
                    return res.json(err);
                }
                else if(existingUser){
                   return res.json('User already exists');
                }
                else {
                    const user = new User({...req.body});
                    res.json(user);
                    // user.save()
                    // .then((req, res,next) => {
                    //     res.json(user);
                    // })
                    // .catch(next);
                }
            });
        }
       
    }
    //[POST] /auth/signin
    signin(req, res, next){
        res.send('Signin');
      
    }
    secret(req, res, next){
        res.send('secret');
    }
}
module.exports = new AuthController();