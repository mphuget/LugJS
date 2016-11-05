/*
This file is part of LugJS.

Lug is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Lug is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Lug.  If not, see <http://www.gnu.org/licenses/>.
*/
/*
The project is located at: https://github.com/mphuget/LugJS

Author: Marc-Philippe Huget
*/

//used to set strict mode when checking the code
'use strict';

//use the express middleware for routing
var express = require('express');

//used to log request details
var morgan = require('morgan');

//to access form data
var bodyParser = require('body-parser');

//contains the Node configuration
var config = require('./Core/server/config/config_server');

//contains the database configuration
var database = require('./Core/server/config/config_database');

//to access the database
var mongoose = require('mongoose');

//middleware to handle HTTP 404
var errorHandlers = require('./Core/server/middleware/errorhandlers');

var app = express();

//connects to the MongoDB database
//connect to the database
mongoose.connect(database.url, function(err) {
  if (err) {
    console.log(err);
  }
  else {
    console.log("Connected to the database Lug");
  }
});

//express logs via morgan
if (app.get('env') == 'production') {
  app.use(morgan('common', { skip: function(req, res) { return res.statusCode < 400 }, stream: __dirname + '/../morgan.log' }));
} else {
  app.use(morgan('dev'));
}

//disable headers indicating pages are coming from an Express server
app.disable('x-powered-by');

//used to fetch the data from forms on HTTP POST
app.use(bodyParser.urlencoded({
  extended : true
}));

app.use(bodyParser.json());

//define the different directories where views are
//and set EJS as template engine
var dirViews = [path.join(__dirname, '/Core/server/views'),
                path.join(__dirname, '/Department/server/views'),
                path.join(__dirname, '/Category/server/views'),
                path.join(__dirname, '/Item/server/views'),];
app.set('views', dirViews);
app.set('view engine', 'ejs');

//serve the RESTful API
//definition of the different routes
//RESTful API
var DepartmentRoutes = require('./Catalog/Department/server/routes');
app.use(DepartmentRoutes);

var CategoryRoutes = require('./Catalog/Category/server/routes');
app.use(CategoryRoutes);

var ItemRoutes = require('./Catalog/Item/server/routes');
app.use(ItemRoutes);

//serve the 404 middleware
app.use(errorHandlers.notFound);

app.listen(config.port);
console.log('App server running on port ' + config.port);
