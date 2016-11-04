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
router.delete('/catalog/item/:id', function(req, res) {
  enquiries.deleteItem(req, res);
});

//retrieve an item from a category from a department
router.get('/catalog/item/:id', function(req, res) {
  enquiries.getItem(req, res);
});

//add quantity to an item
router.post('/catalog/item/quantity', function(req, res) {
  enquiries.updateQuantity(req, res);
});

//set visible an item
router.post('/catalog/item/visible', function(req, res) {
  enquiries.setVisible(req, res);
});

//set invisible an item
router.post('/catalog/item/invisible', function(req, res) {
  enquiries.setInvisible(req, res);
});

//add an extra on an item
router.post('/catalog/item/extra', function(req, res) {
  enquiries.addExtra(req, res);
});

//update an extra of an item
router.put('/catalog/item/extra', function(req, res) {
  enquiries.updateExtra(req, res);
});

//delete an extra of an item
router.delete('/catalog/item/extra', function(req, res) {
  enquiries.deleteExtra(req, res);
});

module.exports = router;
