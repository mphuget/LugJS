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
    var message = req.flash('alert');
    res.render('../views/pages/signup',{alert:message, success:{}, info:{}});
}

//add the user
function addUser(req, res, next) {
  //we create a new User to be saved into the database
  var Admin = require('../models/admin');
  var admin = new Admin();
  var utilities = require('../../../Core/server/utilities');

  //we check whether all the fields were filled
	//a first check is performed on form but two checks are better than one...
	if (typeof req.body.firstName === 'string' &&
		  typeof req.body.lastName === 'string' &&
      typeof req.body.username === 'string' &&
		  typeof req.body.email === 'string' &&
		  typeof req.body.password === 'string' &&
		  req.body.firstName != '' &&
		  req.body.lastName != '' &&
      req.body.username != '' &&
		  req.body.email != '' &&
		  req.body.password != '' &&
		  utilities.validateEmail(req.body.email)) {

        //we create an object with all the data
        admin.local.firstName = req.body.firstName;
        admin.local.lastName = req.body.lastName;
        admin.local.username = req.body.username;
        admin.local.email = req.body.email;
        admin.local.password = req.body.password;

        //we check whether this email already exists
    		Admin.findOne({"local.email": req.body.email }, function(err, existingUser) {

    		    if (existingUser) {
    		    	  //we issue a flash message for the form to render
    		      	req.flash('alert', 'Account with that email address already exists');
    		      	res.redirect('/admin/signup');
    		    }
    		    else {
    		      	admin.save(function(err, admin) {
    		        	   if (err) return next(err);

    			           req.logIn(admin, function(err) {
                				if (err) return next(err);

                        req.session.admin = admin;
                				req.flash('info', "Welcome to LugJS!");
                				res.redirect('/admin/profile');
                    })
    		       });
    		    }
  		});
  }

  //there are errors on the validation
  //issue an error to the user
  else {
    req.flash('alert', 'There is an error on the form data, please check again');
    res.status(400).redirect('/admin/signup');
  }

}

module.exports.getForm = getForm;
module.exports.addUser = addUser;
