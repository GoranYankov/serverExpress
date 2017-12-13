const express = require('express') // от библиотеката екрест
const path = require('path') // Идва от библиотеката коре
const bodyParser = require('body-parser')
const cors = require('cors');
const passport = require('passport')
const mongoose = require('mongoose')
const db = require('./config/db') //бд

//Връзка са базата данни
mongoose.Promise = global.Promise
mongoose.connect(db.database, {useMongoClient: true}, ()=>{
    console.log('ДБ е свръзана')
})


const app = express();


//==== Мидълеари=----
// Cors
app.use(cors())
//Auth
app.use(passport.initialize());
app.use(passport.session())
require('./config/pasport')(passport)

// BodyParser 
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


const users = require('./routs/users')
app.use('/users', users)


//===== Router======


const port = 3006;

app.listen(port, ()=>{
    console.log('Сървара е пуснат на порт ' + port)
})