const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//User Shema

const UserShema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

const User = mongoose.model('User', UserShema);

module.exports = User;

module.exports.addUser = function (newUser, calback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save(calback)

        })
    })
}

module.exports.chekPass = function (pass, hash, calback) {
   
  bcrypt.compare(pass, hash, (err, isMatch)=>{
      console.log(isMatch);
      calback(null, isMatch)
  })
}

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
  }