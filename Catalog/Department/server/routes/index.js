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

var enquiries = require('../controllers');

//add a new department
router.post('/catalog/department/', function(req, res) {
  res.send('POST /catalog/department/');
});

//retrieve a department
router.get('/catalog/department/:dept', function(req, res) {
  res.send('GET /catalog/department/:dept');
});

//update a department
router.put('/catalog/department/', function(req, res) {
  res.send('PUT /catalog/department/');
});

//delete a department
router.delete('/catalog/department/:dept', function(req, res) {
  res.send('DELETE /catalog/department/:dept');
});

//retrieve all the departments
router.get('/catalog/departments/', function(req, res) {
  res.send('GET /catalog/departments/');
});

module.exports = router;
