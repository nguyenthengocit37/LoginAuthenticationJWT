const jwt = require('jsonwebtoken');

const middlewareToken = (req, res, next) => {
    try {
        const token = req.headers.token;
        if(token){
            const assertToken =  token.split(" ")[1];
            jwt.verify(assertToken,process.env.JWT_ASSESS_KEY,(err, user) => {
                if(err){
                    res.status(403).json('Token not valid');
                }
                req.user = user;
                next();
            })
        }else{
            res.status(403).json("You'er not authorized");
        }

    } catch (error) {
        res.status(403).json('Error');
    }
}
const verifyTokenAndAdminAuth = (req, res,next) => {
    middlewareToken(req, res,()=>{
        if(req.user.id == req.params.id || req.user.admin){
            next();
        }
        else{
            res.status(403).json('You are not allowed');
        }
    })
}
module.exports ={middlewareToken,verifyTokenAndAdminAuth};