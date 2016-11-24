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

//to access the database stored in MongoDB
var mongoose = require('mongoose');

//middleware to handle HTTP 404
var errorHandlers = require('./Core/server/middleware/errorhandlers');

//to access server directories
var path = require('path');

//used to reduce response body
var compression = require('compression');

//session allows to store data such as user data
var session = require('express-session');

//sessions are stored into MongoDB
var MongoStore = require('connect-mongo/es5')(session);
var cookieParser = require('cookie-parser');

//flash messages are used to inform users of what happened (good or bad)
var flash = require('connect-flash');

//used for authentication, currently only with the email
var passport = require('passport');
var localPassport = require('./Admin/server/config/local-passport');

//set for internationalization
var configLang = {
    "lang": "en",
    "langFile": __dirname + "/locales/locale.json"
}

global.i18n = require('i18n-nodejs')(configLang.lang, configLang.langFile);

//start an express on Node
var app = express();

//connects to the MongoDB database
mongoose.connect(database.url, function(err) {

  if (err) {

    throw err;

  }
  else {

    console.log("Connected to the database Lug");

  }

});

//express logs via morgan
if (app.get('env') == 'production') {

  app.use(morgan('common', { skip: function(req, res) {
    return res.statusCode < 400 }, stream: __dirname + '/../morgan.log' }));
}
else {

  app.use(morgan('dev'));

}

//compress response body for better performance
app.use(compression());

//disable headers indicating pages are coming from an Express server
app.disable('x-powered-by');

//cookie setting
app.use(cookieParser(config.cookieKey));

//used to fetch the data from forms on HTTP POST
app.use(bodyParser.urlencoded({

  extended : true

}));

app.use(bodyParser.json());

//define the different directories where views are
//and set EJS as template engine
var dirViews = [path.join(__dirname, '/Core/server/views'),
                path.join(__dirname, '/Catalog/Department/server/views'),
                path.join(__dirname, '/Catalog/Category/server/views'),
                path.join(__dirname, '/Catalog/Item/server/views'),
                path.join(__dirname, '/Admin/server/views')];
app.set('views', dirViews);
app.set('view engine', 'ejs');

//setting session
app.use(session({

  resave: true,
  saveUninitialized: true,
  secret: 'mySecretKey',
  store: new MongoStore({ url: database.url, autoReconnect: true})

}));

// use connect-flash for flash messages stored in session
app.use(flash());

//use passport middleware
app.use(passport.initialize());
app.use(passport.session());

//accessing the static resources
app.use('/img',express.static(path.join(__dirname, 'Resources/images')));
app.use('/css',express.static(path.join(__dirname, 'Resources/css')));


//serve the RESTful API
//definition of the different routes
//RESTful API
var DepartmentRoutes = require('./Catalog/Department/server/routes');
app.use(DepartmentRoutes);

var CategoryRoutes = require('./Catalog/Category/server/routes');
app.use(CategoryRoutes);

var ItemRoutes = require('./Catalog/Item/server/routes');
app.use(ItemRoutes);

var AdminRoutes = require('./Admin/server/routes');
app.use(AdminRoutes);

var CoreRoutes = require('./Core/server/routes');
app.use(CoreRoutes);

//serve the 404 middleware
app.use(errorHandlers.notFound);

//start the Express server
app.listen(config.port);

console.log('App server running on port ' + config.port);
