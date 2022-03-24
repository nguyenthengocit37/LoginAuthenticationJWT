const mongoose = require('mongoose');

async function connect(){
    try {
        await mongoose.connect(process.env.DB_CONNECT,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected Successfully !!!');
    } catch (error) {
        console.log('Error connecting !!!');
    }

}

module.exports = {connect};