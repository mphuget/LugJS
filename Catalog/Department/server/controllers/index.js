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

//get all the departments for a store
function getDepartments(req, res) {
  var Department = require('../models/department');
  Department.find({}, function(err, departments) {
    if (err) throw err;

    res.send(departments);
  });

}

//add a department to a store
function addDepartment(req, res) {
  var Department = require('../models/department');
  var newDepartment = Department ({
      name : req.body.name,
      visible : true
  });

  newDepartment.save(function(err) {
    if (err) throw err;

    res.send("Department created " + req.body.name);
  })
}

//modify the name of a department
function updateDepartment(req, res) {
  var Department = require('../models/department');
  Department.findOneAndUpdate({name: req.body.current}, { name: req.body.new }, function(err, user) {
    if (err) throw err;

    res.send("Old name: " + req.body.current + " New name: " + req.body.new);

  });

}

//delete a department from the store
function deleteDepartment(req, res) {
  var Department = require('../models/department');

  Department.findOneAndRemove({ name: req.body.name }, function(err, department) {
    if (err) throw err;

    res.send(department);

  });
}

//get a department from the store
function getDepartment(req, res) {
  var Department = require('../models/department');
  Department.findOne({name : req.params.dept}, function(err, department) {
    if (err) throw err;

    res.send("Department found: " + department);
  });

}

//set visible a department
function setVisible(req, res) {
  var Department = require('../models/department');
  Department.findOneAndUpdate({name: req.body.current}, { visible: true }, function(err, user) {
    if (err) throw err;

  });

}

//set visible a department
function setVisible(req, res) {
  var Department = require('../models/department');
  Department.findOneAndUpdate({name: req.body.current}, { visible: true }, function(err, user) {
    if (err) throw err;

  });

}

//set invisible a department
function setInvisible(req, res) {
  var Department = require('../models/department');
  Department.findOneAndUpdate({name: req.body.current}, { visible: false }, function(err, user) {
    if (err) throw err;

  });

}

module.exports.getDepartments = getDepartments;
module.exports.addDepartment = addDepartment;
module.exports.updateDepartment = updateDepartment;
module.exports.deleteDepartment = deleteDepartment;
module.exports.getDepartment = getDepartment;
module.exports.setVisible = setVisible;
module.exports.setInvisible = setInvisible;
