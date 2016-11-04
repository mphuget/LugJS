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
along with Lug.  If not, see <http://www.gnu.org/licenses/>.
*/
/*
The project is located at: https://github.com/mphuget/LugJS

Author: Marc-Philippe Huget
*/
//setting the strict mode while checking Javascript
'use strict';

var router = require('express').Router();

var enquiries = require('../controllers');

//retrieve all the categories for a department
router.get('/catalog/categories/:dept', function(req, res) {
    enquiries.getCategories(req, res);
});

//add a category to a department
router.post('/catalog/category', function(req, res) {
  enquiries.addCategory(req, res);
});

//update a category from a department
router.put('/catalog/category', function(req, res) {
  enquiries.updateCategory(req, res);
});

//delete a category from a department
router.delete('/catalog/category/', function(req, res) {
  enquiries.deleteCategory(req, res);
});

//retrieve a specific category
router.get('/catalog/category/:dept/:cat', function(req, res) {
    enquiries.getCategory(req, res);
});

//set visible a category
router.post('/catalog/category/visible', function(req, res) {
  enquiries.setVisible(req, res);
});

//set invisible a category
router.post('/catalog/category/invisible', function(req, res) {
  enquiries.setInvisible(req, res);
});

module.exports = router;
