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

//profile
function profile(req, res) {

  var admin = req.session.admin;
  stores = admin.local.stores;
  if (stores.length > 0) {
    var Store = require('../../../../Store/server/models/store');

    Store.find({id: store}, function(err, aStore) {

    })
  }
  else
    res.render('../views/pages/profile', {stores: []});
}

module.exports.profile = profile;
