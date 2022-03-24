const authRouter = require('./auth');
function router(app){
    app.use('/auth',authRouter);
    app.use('/',(req, res) => {
        res.send('oke')
    });
}
module.exports = router;