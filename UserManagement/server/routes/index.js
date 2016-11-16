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

var passport = require('passport');

//provide the signup form
router.get('/admin/signup', function(req, res) {

  signup.getForm(req, res);

});

//add the user
router.post('/admin/signup', function(req, res) {

  signup.addUser(req, res);

});

//user profile
router.get('/admin/profile', function(req, res) {

  signup.profile(req, res);

});

//sign in
router.get('/admin/signin', function(req, res) {

  signin.getForm(req, res);

});

//authenticate the user
router.post('/admin/signin', passport.authenticate('login', {
		successRedirect : '/admin/profile', // redirect to the secure profile section
		failureRedirect : '/admin/signin', // redirect back to the signup page if there is an error
    failureFlash : true
}));


module.exports = router;
