const authRouter = require('./auth');
function router(app){
    app.use('/auth',authRouter);
    app.use('/',authRouter);
}
module.exports = router;