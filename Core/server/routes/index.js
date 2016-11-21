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

var core = require('../controllers');

//provide the home page
router.get('/', function(req, res) {

  core.home(req, res);

});

//provide the about page
router.get('/about', function(req, res) {

  core.about(req, res);

});

//provide the contact page
router.get('/contact', function(req, res) {

  core.contact(req, res);

});

module.exports = router;
