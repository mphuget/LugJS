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

//retrieve all the items from a category from a department
router.get('/catalog/items/:dept/:cat', function(req, res) {
  enquiries.getItems(req, res);
});

//add an item to a category from a department
router.post('/catalog/item', function(req, res) {
  enquiries.addItem(req, res);
});

//update an item from a category
router.put('/catalog/item', function(req, res) {
  enquiries.updateItem(req, res);
});

//delete an item from a category
router.delete('/catalog/item/:item', function(req, res) {
  enquiries.deleteItem(req, res);
});

module.exports = router;
