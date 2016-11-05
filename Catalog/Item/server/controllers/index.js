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

//get all the items from a category in a department
function getItems(req, res) {
  var Item = require('../models/item');
  Item.find({department: req.params.dept, category : req.params.cat}, function(err, items) {
    if (err) throw err;

    res.send(items);
  });

}

//add an item in a category
function addItem(req, res) {
  var Item = require('../models/item');
  var newItem = Item ({
      name : req.body.name,
      description : req.body.description,
      price : req.body.price,
      seller : req.body.seller,
      id : req.body.id,
      quantity : req.body.quantity,
      department: req.body.dept,
      category : req.body.cat,
      visible : true
  });

  newItem.save(function(err) {
    if (err) throw err;

    res.send("Item created " + req.body.name);
  })
}

//update an item from a category
function updateItem(req, res) {
  var Item = require('../models/item');
  Item.findOneAndUpdate({id : req.body.id},
                        { name: req.body.newName,
                          description : req.body.newDescription,
                          price : req.body.newPrice,
                          seller : req.body.newSeller }, function(err, user) {
    if (err) throw err;

    res.send("Item updated");

  });

}

//delete an item based on its id
function deleteItem(req, res) {
  var Item = require('../models/item');

  Item.findOneAndRemove({ id: req.body.id }, function(err, item) {
    if (err) throw err;

    res.send(item);

  });
}

//get an item from its id
function getItem(req, res) {
  var Item = require('../models/item');
  Item.findOne({id : req.params.id}, function(err, item) {
    if (err) throw err;

    res.send("Item found: " + item);
  });

}

//modify the quantity
function updateQuantity(req, res) {
  var Item = require('../models/item');
  Item.findOneAndUpdate({id : req.body.id},
                        { quantity : req.body.quantity}, function(err, item) {
    if (err) throw err;

    res.send(item);

  });

}

//toggle visible/invisible an item
function setVisible(req, res) {
  var Item = require('../models/item');
  Item.findOneAndUpdate({id : req.body.id},
                        { visible : true}, function(err, item) {
    if (err) throw err;

    res.send(item);

  });

}

function setInvisible(req, res) {
  var Item = require('../models/item');
  Item.findOneAndUpdate({id : req.body.id},
                        { visible : false}, function(err, item) {
    if (err) throw err;

    res.send(item);

  });

}

//add an extra field to an item
function addExtra(req, res) {
  var Item = require('../models/item');
  Item.findOneAndUpdate(
          req.body.id,
          {$push: {"extra": {key: req.body.key,
                             value: req.body.value,
                             id: req.body.extra_id}}},
          {upsert: true, new : true},
          function(err, model) {
            if (err) throw err;

            res.send(model);

          }
      );
}

//update an extra for an item
function updateExtra(req, res) {
  var Item = require('../models/item');

  Item.findOneAndUpdate({'extra.id' : req.body.id},
              {'$set' : {
                'extra.$.value' : req.body.value
              }}, function(err) {
                if (err) throw err;

                res.send("Extra updated");
              }
            );
}

//delete an extra of an item
function deleteExtra(req, res) {
  var Item = require('../models/item');
  Item.findOneAndUpdate({id:req.body.id}, {
    $pull: {
      extra: {id: req.body.extra_id}
    }
  }, function(err, item) {
    if (err) throw err;

    res.send(item);
    
  });
}

module.exports.getItems = getItems;
module.exports.addItem = addItem;
module.exports.updateIem = updateItem;
module.exports.deleteItem = deleteItem;
module.exports.getItem = getItem;
module.exports.updateQuantity = updateQuantity;
module.exports.setVisible = setVisible;
module.exports.setInvisible = setInvisible;
module.exports.addExtra = addExtra;
module.exports.updateExtra = updateExtra;
module.exports.deleteExtra = deleteExtra;
