const dotenv = require('dotenv');
const express = require('express');
const hdb = require('express-handlebars');
const path = require('path');
const app = express();
const morgan = require('morgan');
const port = process.env.PORT || 3000;
const router = require('./routes');
//Declare DB
const db = require('./config/db');

//Config dotenv 
dotenv.config();
//Connect to database
db.connect();

//Middleware Form data
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);
//HTTP logger 
app.use(morgan('combined'));

//Set static path
app.use(express.static(path.join(__dirname,'public')));

//Use Template Engine
app.engine('hbs', hdb.engine({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname, 'resources','views'));

//Route init
router(app);

//App listen
app.listen(port,()=>console.log(`Listening on port ${port}`));