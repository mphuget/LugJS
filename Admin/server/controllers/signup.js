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

//render the signup form
function getForm(req, res) {
    res.render('../views/pages/signup', {alert:{}, success:{}, info:{}});
}

//add the user
function addUser(req, res) {
  //we create a new User to be saved into the database
  var Admin = require('../models/admin');
  var admin = new Admin();

  //we create an object with all the data
  admin.local.firstName = req.body.firstName;
  admin.local.lastName = req.body.lastName;
  admin.local.email = req.body.email;
  admin.local.password = req.body.password;

  admin.save(function(err, user) {
      if (err) return next(err);

      req.session.admin = admin;
      res.redirect('/admin/profile');
  });
}

module.exports.getForm = getForm;
module.exports.addUser = addUser;
