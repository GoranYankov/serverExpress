const jswStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./../models/User')
const config = require('./db')

module.exports = function(passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
    console.log(opts.jwtFromRequest)
    opts.secretOrKey = config.secret;
    passport.use(new jswStrategy(opts, (jwt_peyloade, done)=>{
        
        User.findById(jwt_peyloade.data._id).then(user=>{
            if(user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
    }))
}