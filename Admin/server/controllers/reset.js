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
The project is located at: https://github.com/mphuget/LugJS

Author: Marc-Philippe Huget
*/

//used when the user deliberately wants to reset his/her password
function reset_get(req, res) {
  if (req.isAuthenticated()) {
		res.render('../views/pages/resetPassword', {
		title: 'Lug - Reset password',
		email: req.user.local.email,
		alert : req.flash('alert'),
		success : req.flash('success'),
		info : req.flash('info')});
	}
	else {
		req.flash('alert', i18n.__('Reset_1'));
		res.redirect('/admin/signin');
	}
}

//reset a password after receiving an email with an id
function reset_get_id(req, res) {
	var LostPassword = require('../models/lostPassword');

	LostPassword.findOne({id : req.params.id}, function(err, lost) {
    	if (err)
    		console.log(err);
      if (lost != null) {
        	res.render('../views/pages/resetPassword', {
              email : lost.email,
        			alert : req.flash('alert'),
        			success : req.flash('success'),
        			info : i18n.__('Reset_2') + lost.email});
      }
      else {
        req.flash('alert', i18n.__('Reset_3') + req.params.id);
        res.redirect('/admin/signin');
      }
  });

}

//update password
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
              req.flash('info', i18n.__("Reset_4") + req.body.email);
    					res.redirect('/admin/signin');
          });
			});
		});
	});

}
module.exports.reset_get = reset_get;
module.exports.reset_get_id = reset_get_id;
module.exports.reset_post = reset_post;
