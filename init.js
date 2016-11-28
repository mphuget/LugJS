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

//used to set strict mode when checking the code
'use strict';

//contains the database configuration
var database = require('./Core/server/config/config_database');

//to access the database stored in MongoDB
var mongoose = require('mongoose');

//connects to the MongoDB database
mongoose.connect(database.url, function(err) {

  if (err) {

    throw err;

  }
  else {

    console.log("Connected to the database Lug");

  }

});

//var User = require('/Admin/server/models/user');
//var aUser = new User();
var args = process.argv.slice(2);
args.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});
