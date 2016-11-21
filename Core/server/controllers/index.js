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

//controller when user hits the "/" URL
//just displaying the home page
function home(req, res) {
  //retrieve the store to display the information in the header, menu and footer
  var Store = require('../../../Store/server/models/store');

  //access the store id
  var config = require('../config/config_store');

  Store.findOne({id: config.storeId}, function(err, store) {

    if (err)
      throw err;

    res.render('../views/pages/home', {store : store});

  });

}

//controller when user hits the "/about" URL
//just displaying the about page
function about(req, res) {
  //retrieve the store to display the information in the header, menu and footer
  var Store = require('../../../Store/server/models/store');

  //access the store id
  var config = require('../config/config_store');

  Store.findOne({id: config.storeId}, function(err, store) {

    if (err)
      throw err;

    res.render('../views/pages/about', {store : store});

  });

}

//controller when user hits the "/contact" URL
//just displaying the contact page
function contact(req, res) {
  //retrieve the store to display the information in the header, menu and footer
  var Store = require('../../../Store/server/models/store');

  //access the store id
  var config = require('../config/config_store');

  Store.findOne({id: config.storeId}, function(err, store) {

    if (err)
      throw err;

    res.render('../views/pages/contact', {store : store});

  });

}

module.exports.home = home;
module.exports.about = about;
module.exports.contact = contact;
