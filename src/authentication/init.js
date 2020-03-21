const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy

const authenticationMiddleware = require('./middleware')


import UserModel from '../models/User';

// Generate Password
const saltRounds = 10
const myPlaintextPassword = 'my-password'
const salt = bcrypt.genSaltSync(saltRounds)
const passwordHash = bcrypt.hashSync(myPlaintextPassword, salt)

// const user = {
//     username: 'rameshkumar',
//     passwordHash,
//     id: 1
// }

// function findUser (username, callback) {
   
//     if (username === user.username) {
//         return callback(null, user)
//     }
//     return callback(null)
// }


passport.serializeUser(function (user, cb) {
  cb(null, user.username)
})

passport.deserializeUser(function (username, cb) {
  findUser(username, cb)
})


function initPassport(req, res) {
    passport.use(new LocalStrategy((username, password, done) => {
      

        console.log('+--------------- Local Strategy Worked --------------------------+')
        UserModel.findOne({ username: username }).then(function(response) {
            if (!response) {
                return done(null, false, { message: "Incorrect Username!."});
            }
              // If there is a user with the given username, but the password the user gives us is incorrect
            else if (!response.validPassword(password)) {
                return done(null, false, { message: "Incorrect password."});
            }
            // If none of the above, return the user
            return done(null, response);
        });
          // findUser(username, (err, user) => {
          //       if (err) {
          //         return done(err)
          //       }

          //       // User not found
          //       if (!user) {
          //         console.log('User not found')
          //         return done(null, false)
          //       }

          //       // Always use hashed passwords and fixed time comparison
          //       bcrypt.compare(password, user.passwordHash, (err, isValid) => {
          //           if (err) {
          //             return done(err)
          //           }
          //           if (!isValid) {
          //             return done(null, false)
          //           }
          //           return done(null, user)
          //       })
          //   })
        }
    ))

    passport.authenticationMiddleware = authenticationMiddleware
}

module.exports = initPassport