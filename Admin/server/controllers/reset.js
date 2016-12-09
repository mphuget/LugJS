/*
This file is part of Lug.

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
The project is located at: https://github.com/mphuget/Lug

Author: Marc-Philippe Huget
*/

function reset_get(req, res) {
  if (req.isAuthenticated()) {
		res.render('../views/pages/resetPassword', {
		title: 'Node.js eCommerce - Reset password',
		email: req.user.local.email,
		alert : '',
		success : '',
		info : ''});
	}
	else {
		req.flash('alert', 'You should be authenticated to reset your password');
		res.redirect('/admin/signin');
	}
}

function reset_get_id(req, res) {
	var LostPassword = require('../models/lostPassword');

	LostPassword.findOne({id : req.params.id}, function(err, lost) {
    	if (err)
    		console.log(err);
      if (lost != null) {
        	res.render('../views/pages/resetPassword', {email : lost.email,
        									   alert : '',
        									   success : '',
        									   info : 'You could change the password for account: ' + lost.email});
      }
      else {
        req.flash('alert', 'This id no longer exists to reset a password ' + req.params.id);
        res.redirect('/admin/signin');
      }
  });

}

function reset_post(req, res) {
	var bcrypt   = require('bcrypt-nodejs');
	var User = require('../models/admin');
  var LostPassword = require('../models/lostPassword');

	bcrypt.genSalt(10, function(err, salt) {
		if (err)
			return next(err);
		bcrypt.hash(req.body.password, salt, null, function(err, hash) {
	  		if (err)
	  			return next(err);
			  User.update({"local.email" : req.body.email},
						{"local.password" : hash},
						{multi : false}, function(err, updated) {
					if (err)
						console.log(err);

          LostPassword.remove({email : req.body.email}, function(err, entry) {
              if (err)
                console.log(err);
              console.log('update done for ' + req.body.email);
              req.flash('info', 'Modification done for ' + req.body.email);
    					res.redirect('/admin/signin');
          });
			});
		});
	});

}
module.exports.reset_get = reset_get;
module.exports.reset_get_id = reset_get_id;
module.exports.reset_post = reset_post;
