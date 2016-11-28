/*
This file is part of Lug.

Lug is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Lug is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Lug.  If not, see <http://www.gnu.org/licenses/>.
*/
/*
The project is located at: https://github.com/mphuget/Lug

Author: Marc-Philippe Huget
*/
var passport = require('passport');

//define a local strategy for passport
var LocalStrategy = require('passport-local').Strategy;

//describe the model for the user
var User = require('../models/admin');

// serialize and deserialize
passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
});


//Middleware
passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, done) {
    User.findOne({ 'local.email': email}, function(err, user) {
      if (err) return done(err);

      if (!user) {
        return done(null, false, req.flash('alert', 'No user has been found'));
      }

      if (!user.comparePassword(password)) {
        return done(null, false, req.flash('alert', 'The password does not match the the user account'));
    }
    return done(null, user);
  });
}));

//custom function to validate
exports.isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  else
    res.redirect('/admin/signin');
}
