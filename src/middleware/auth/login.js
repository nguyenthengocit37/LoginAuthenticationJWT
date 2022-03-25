const isLoggedIn =(req, res, next)=>{
    if(req.user) next();
    else res.send('error login');
}

module.exports ={isLoggedIn};