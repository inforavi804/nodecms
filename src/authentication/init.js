import passport from 'passport';
import passportlocal from 'passport-local';
import bcrypt from 'bcrypt';
import authenticationMiddleware from './middleware'

import UserModel from '../models/User';

const LocalStrategy = passportlocal.Strategy
// Generate Password
//const saltRounds = 10
///const myPlaintextPassword = 'my-password'
//const salt = bcrypt.genSaltSync(saltRounds)
//const passwordHash = bcrypt.hashSync(myPlaintextPassword, salt)


passport.serializeUser(function (user, cb) {
    cb(null, user.username)
})

passport.deserializeUser(function (username, cb) {
    findUser(username, cb)
})


function initPassport(req, res) {
    passport.use(new LocalStrategy((username, password, done) => {

                console.log('+-------- Input Pswd -----------+', password);
                UserModel.findOne({ username: username }).then(function(response) {
                    console.log('+---------- UserModel Response ------------+', response)
                    const hashedDbPswd = response.password;
                    if (!response) {
                        return done(null, false, { message: "Incorrect Username!."});
                    }
                    // If there is a user with the given username, but the password the user gives us is incorrect
                    //(!response.validPassword(password))
                    else if (!bcrypt.compareSync(password, hashedDbPswd)){
                        return done(null, false, { message: "Incorrect password."});
                    }
                    // If none of the above, return the user
                    return done(null, response);
                });
        }
    ))

    passport.authenticationMiddleware = authenticationMiddleware
}

module.exports = initPassport