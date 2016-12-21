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
The project is located at: https://github.com/mphuget/LugJS

Author: Marc-Philippe Huget
*/
//setting the strict mode while checking Javascript
'use strict';

var router = require('express').Router();

var signup = require('../controllers/signup');
var signin = require('../controllers/signin');
var signout = require('../controllers/signout');
var lost = require('../controllers/lost');
var reset = require('../controllers/reset');
var profile = require('../controllers/profile');
var passport = require('passport');
var local = require('../config/local-passport');

//STEP 1: ask for the sign up form
router.get('/admin/signup', function(req, res) {

  signup.getForm(req, res);

});

//STEP 2: check whether the username is already taken
router.get('/admin/username/:id', function(req, res) {
    var Admin = require('../models/admin');
    Admin.findOne({"local.username": req.params.id}, function(err, admin) {
      if (admin)
        res.send(i18n.__('Taken'));
      else {
        res.send(i18n.__('Available'));
      }
    });
});

//STEP 3: submit the sign up form to create the user
router.post('/admin/signup', function(req, res, next) {

  signup.addUser(req, res, next);

});

//STEP 4: confirm email account
router.get('/admin/confirm/:email/:key', function(req, res) {

  signup.confirm(req, res);

});

//STEP 5: ask for the sign in form
router.get('/admin/signin', function(req, res) {

  signin.getForm(req, res);

});

//STEP 6: authenticate the user
router.post('/admin/signin', passport.authenticate('login', {
		successRedirect : '/admin/profile', // redirect to the secure profile section
		failureRedirect : '/admin/signin', // redirect back to the signup page if there is an error
    failureFlash : true
}));

//STEP 7: show the user profile
router.get('/admin/profile', local.isAuthenticated, function(req, res) {

  profile.display(req, res);

});

//STEP 8: update profile
router.put('/admin/profile', local.isAuthenticated, function(req, res) {
  profile.update(req, res);
});

//STEP 9: sign out
router.get('/admin/signout', function(req, res) {

    signout.signout(req, res);
});

//STEP 10: display the sign in form while asking for /admin
router.get('/admin', function(req, res) {

  res.redirect('/admin/signin');

});

//STEP 5a.1: show the Lost Password form
router.get('/admin/signin/lost', function(req, res) {

  lost.lost_get(req, res);

});

//STEP 5a.2: ask to reset the password
router.post('/admin/signin/lost', function(req, res) {

  lost.lost_post(req, res);

});

//STEP 5a.3: show the Reset password form
router.get('/admin/signin/reset', function(req, res) {

  reset.reset_get(req, res);

});

//STEP 5a.4: show the Reset password form for a specific user
router.get('/admin/signin/reset/:id', function(req, res) {

  reset.reset_get_id(req, res);

});

//STEP 5a.5: reset the password
router.post('/admin/signin/reset', function(req, res) {

    reset.reset_post(req, res);

});

module.exports = router;

// router.get('/admin/test', function(req, res) {
//   res.send("Test unprotected");
// });
//
// router.get('/admin/ptest', local.isAuthenticated, function(req, res) {
//   res.send("Test protected");
// });
