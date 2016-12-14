/*
This file is part of LugJS.

LugJS is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

LugJS is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with LugJS.  If not, see <http://www.gnu.org/licenses/>.
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
var logout = require('../controllers/logout');
var passport = require('passport');
var local = require('../config/local-passport');

//provide the signup form
router.get('/admin/signup', function(req, res) {

  signup.getForm(req, res);

});

//add the user
router.post('/admin/signup', function(req, res, next) {

  signup.addUser(req, res, next);

});

//signout
router.get('/admin/signout', function(req, res) {

    signout.signout(req, res);
});

//user profile
router.get('/admin/profile', local.isAuthenticated, function(req, res) {

  profile.profile(req, res);

});

// router.get('/admin/test', function(req, res) {
//   res.send("Test unprotected");
// });
//
// router.get('/admin/ptest', local.isAuthenticated, function(req, res) {
//   res.send("Test protected");
// });

//when hitting the admin home, go directly to signin
router.get('/admin', function(req, res) {

  res.redirect('/admin/signin');

});

//sign in
router.get('/admin/signin', function(req, res) {

  signin.getForm(req, res);

});

//lost password route
router.get('/admin/signin/lost', function(req, res) {

  lost.lost_get(req, res);

});

router.post('/admin/signin/lost', function(req, res) {

  lost.lost_post(req, res);

});

//reset password
router.get('/admin/signin/reset', function(req, res) {

  reset.reset_get(req, res);

});

router.get('/admin/signin/reset/:id', function(req, res) {

  reset.reset_get_id(req, res);

});

router.post('/admin/signin/reset', function(req, res) {

    reset.reset_post(req, res);

});

//authenticate the user
router.post('/admin/signin', passport.authenticate('login', {
		successRedirect : '/admin/profile', // redirect to the secure profile section
		failureRedirect : '/admin/signin', // redirect back to the signup page if there is an error
    failureFlash : true
}));

router.get('/admin/username/:id', function(req, res) {
    var Admin = require('../models/admin');
    Admin.findOne({"local.username": req.params.id}, function(err, admin) {
      if (admin)
        res.send("Taken");
      else {
        res.send("Available");
      }
    });

})

//logout
router.get('/admin/logout', function(req, res) {

  logout.logout(req, res);

});

//confirm account
router.get('/admin/confirm/:email/:key', function(req, res) {

  signup.confirm(req, res);

});

module.exports = router;
