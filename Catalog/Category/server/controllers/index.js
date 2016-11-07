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

//get all the categories for a specific department
//the department is provided as parameters
function getCategories(req, res) {
  var Category = require('../models/category');
  var Department = require('../../../Department/server/models/department');

  Category.find({department: req.params.dept}, function(err, categories) {

    if (err) throw err;

    Department.findById(req.params.dept, function(err, department) {

      if (err) throw err;

      res.render('pages/department', {name: department.name,
                                      data : categories});
    });
  });

}

//add a category in a department
function addCategory(req, res) {
  var Category = require('../models/category');
  var newCategory = Category ({
      name : req.body.name,
      department: req.body.dept,
      visible : true
  });

  newCategory.save(function(err) {
    if (err) throw err;

    res.send("Category created " + req.body.name);
  })
}

//update the name of a category in a department
function updateCategory(req, res) {
  var Category = require('../models/category');
  Category.findOneAndUpdate({name: req.body.current,
                             department: req.body.dept},
                            { name: req.body.new }, function(err, user) {
    if (err) throw err;

    res.send("Old name: " + req.body.current + " New name: " + req.body.new);

  });

}

//delete a category from a department
function deleteCategory(req, res) {
  var Category = require('../models/category');

  Category.findOneAndRemove({ name: req.body.name,
                              department: req.body.dept }, function(err, category) {
    if (err) throw err;

    res.send(category);

  });
}

//get a specific category in a department
function getCategory(req, res) {
  var Category = require('../models/category');
  Category.findOne({name : req.params.cat, department : req.params.dept}, function(err, category) {
    if (err) throw err;

    res.send("Category found: " + category);
  });

}

//set visible a category
function setVisible(req, res) {
  var Category = require('../models/category');
  Category.findOneAndUpdate({name: req.body.current,
                             department: req.body.dept},
                            { visible: true }, function(err, user) {
    if (err) throw err;

  });

}

//set invisible a category
function setInvisible(req, res) {
  var Category = require('../models/category');
  Category.findOneAndUpdate({name: req.body.current,
                             department: req.body.dept},
                            { visible: false }, function(err, user) {
    if (err) throw err;

  });

}

module.exports.getCategories = getCategories;
module.exports.addCategory = addCategory;
module.exports.updateCategory = updateCategory;
module.exports.deleteCategory = deleteCategory;
module.exports.getCategory = getCategory;
module.exports.setVisible = setVisible;
module.exports.setInvisible = setInvisible;
