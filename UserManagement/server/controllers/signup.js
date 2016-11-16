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
  var Store = require('../../../Store/server/models/store');

  Store.findOne({id: '1'}, function(err, store) {
    if (err) throw err;

    res.render('../views/pages/signup', {store : store});

  });

}

//add the user
function addUser(req, res) {
  //we create a new User to be saved into the database
  var User = require('../models/user');
  var user = new User();

  //we create an object with all the data
  user.local.firstName = req.body.firstName;
  user.local.lastName = req.body.lastName;
  user.local.email = req.body.email;
  user.local.password = req.body.password;

  user.save(function(err, user) {
      if (err) return next(err);

      res.redirect('/admin/profile');
  });
}

//profile
function profile(req, res) {
  var Store = require('../../../Store/server/models/store');
  Store.findOne({id: '1'}, function(err, store) {
    if (err) throw err;

    res.render('../views/pages/profile', {store : store});
  });
}

module.exports.getForm = getForm;
module.exports.addUser = addUser;
module.exports.profile = profile;
