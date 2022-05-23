const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class AuthController {
  //[GET] /auth
  index(req, res, next) {
    res.render("login");
  }
  //[GET] /auth/:id
  delete(req, res, next) {
    User.deleteOne({_id:req.params.id})
    .then(()=>{
      res.status(200).json('User Deleted');
    })
    .catch(()=>{
      res.status(500).json('Error delete')
    })
  }
  //[GET] /auth/getUser
  getAllUsers(req, res, next) {
    try {
      User.find()
      .then(user=>{
        res.status(200).json(user);
      })
      .catch(()=>{
        res.status(404).json('Error Get data');
       })
    } catch (error) {
        res.status(500).json('Error Get data');
    }
  }
  //[POST] /auth/signup
   signup(req, res, next) {
    try {
      //Get data request
      const { nameSignup, emailSignup, passwordSignup } = req.body;
      //Check data validity
      if (!nameSignup || typeof nameSignup !== "string") {
        return res.json({ error: "Invalid Username" });
      } else if (!passwordSignup || typeof passwordSignup !== "string") {
        return res.json({ error: "Invalid Password" });
      } else if (!emailSignup || typeof emailSignup !== "string") {
        return res.json({ error: "Invalid Email" });
      } else if (passwordSignup.length < 6) {
        return res.json({ error: "Password must be at least 6 characters" });
      } else {
        //Hash the password
          bcrypt.genSalt(10)
          .then(salt=>{
            bcrypt.hash(passwordSignup, salt)
            .then(passHash=>{
              //Find user validity
              const foundUser = User.where({email:emailSignup});
              foundUser.findOne((err, existingUser) => {
                if (err) {
                  return res.json(err);
                } else if (existingUser) {
                  return res.json("User already exists");
                } else {
                  //Save user
                  const userNew =  new User({
                    name: nameSignup,
                    email:emailSignup,
                    password : passHash
                    });
                    userNew.save()
                    .then(()=>{
                      res.send("Đăng ký thành công")
                    })
                    .catch(()=>{
                      res.json("error");
                    })
                }
               });
            })
            .catch(next)
          })
          .catch(next)
        }
    } catch (error) {
        res.status(500).json(error);
    }    
  }
  //Generate access token
  generateAccessToken(user){
    jwt.sign({
      id : user._id,
      admin : user.isAdmin
    },
    process.env.JWT_ASSESS_KEY,
    {
      expiresIn:'30s'
    });
  }
  //Generate refresh token
  generateRefreshToken(user){
    jwt.sign({
      id : user._id,
      admin : user.isAdmin
    },
    process.env.JWT_ASSESS_KEY,
    {
      expiresIn:'365d'
    });
  }
  //[POST] /auth/signin
   signin(req, res, next) {
    try {
      User.findOne({email: req.body.email})
      .then(user => {
        bcrypt.compare(req.body.password,user.password)
        .then(validPassword => {
          if(!validPassword) {
            return res.status(403).json({
              success:false,
              error:'Wrong Email or Password'
            });
          }
          if(user && validPassword){
            // const assertToken = AuthController.generateAccessToken(user);
            // const refreshToken = AuthController.generateRefreshToken(user);
            // res.status(200).json({
            //   'user':user,
            //   'assertToken':assertToken,
            //   'refreshToken':refreshToken
            // })
            res.render('home',{username : user.name});
          }
        })
        .catch(
          console.log("error2")
        )
      })
      .catch(err => {
        return res.status(403).json({
          success:false,
          error:'Wrong Email or Password'
        });
      });
    } catch (error) {
      res.json(error);
    }
  }
  secret(req, res, next) {
    res.send("secret");
  }
  //[GET] /auth/logout
  logout(req, res, next){
    req.logout();
      res.redirect('/');
  }
  //Login Google Successfully
  loginGoogleSuccess(req, res){
    const username = req.user.displayName;
    res.render('home',{ username});
  }
  //Login Google Failurefully
  loginFailed(req,res){
    res.send('You failed to login. Please try again.');
  }
  //Google callback
  googleCallback(req,res){
    res.redirect('/success');
  }
  //Facebook callback
  facebookCallback(req,res){
    const username = req.user.displayName;
    res.render('home',{ username});
  }
}
module.exports = new AuthController();
