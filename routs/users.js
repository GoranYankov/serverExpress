const express = require('express');
const router = express.Router();
const User = require('./../models/User')

const passport = require('passport')
const jswt = require('jsonwebtoken')
const config = require('./../config/db')
//Routers

router.post('/login', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({username}).then(user=>{
       if(user) {
           User.chekPass(password, user.password, (err, isMatch)=>{
               if(isMatch) {
                   const token = jswt.sign({data: user}, config.secret, {
                       expiresIn: 60*60*12 //sled kolko vreme izti4a
                   });
                   return res.json({success:true,token:'JWT ' + token, user})
               } else {
                return res.json({success:false, msg: "Не успешен вход"})
               }
           })
       } else {
        return res.json({success:false, msg: "Не успешен вход"})
       }
    
    })
  
})
// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
	console.log(req.headers);
    res.json({user: req.user});
  });

router.post('/register',(req, res, next) => {
    console.log(req.body);
    let newUser = new User({name: req.body.name, email: req.body.email, username: req.body.username, password: req.body.password})

    User
        .findOne({'username': newUser.username})
        .then(user => {
            if (user) {
                res.json({success: false, msg: 'Потребителя вече съществува'})
            } else {
                User.addUser(newUser)
                res.json({success: true, msg: 'Успешно регистриран потребител'})
            }
        }) 
})

module.exports = router;