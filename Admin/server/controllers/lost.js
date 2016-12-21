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

//generate a key
function generate()
{

	var tab=new Array();
	var tab2=new Array();

	//generate the available characters for the key
	for(i=48; i<=57; i++) {
		tab.push(i);
	}
	for(i=65; i<=90; i++) {
		tab.push(i);
	}
	for(i=97; i<=122; i++) {
		tab.push(i);
	}

  tab2[0]=String.fromCharCode(tab[Math.round((Math.random()*tab.length))]);

  for(i=1; i<=10; i++) {
    	var recur=(tab2[i-1].charCodeAt(0))%(tab.length);
    	var indice=Math.round(Math.random()*tab.length);
    	tab2[i]=String.fromCharCode(tab[(recur+indice)%tab.length] );
  }
	var code=tab2.join('');
	return code;
}

//this is the controller for the Lost Password form
function lost_get(req, res) {

	if (req.isAuthenticated()) {
		res.redirect('/admin/profile');
	}
	else {
		res.render('../views/pages/lostPassword', {
			title: i18n.__('Company'),
			alert : req.flash('alert'),
			success : req.flash('success'),
			info : req.flash('info')
		});
	}
}

//create a mail to the email account to create a new password
function lost_post(req, res) {
	var User = require('../models/admin');
	var LostPassword = require('../models/lostPassword');
	var nodemailer = require('nodemailer');
  var mg = require('nodemailer-mailgun-transport');
  var config_mailgun = require('../config/mailgun');

	// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
  var auth = {
    auth: {
      api_key: config_mailgun.api_key,
      domain: config_mailgun.domain
    }
  }

  var nodemailerMailgun = nodemailer.createTransport(mg(auth));

	User.findOne({'local.email' : req.body.email}, function(err, existingUser) {
	    if (existingUser) {
	    		//we issue a flash message for the form to render
	      	req.flash('info', i18n.__('Lost_1') + req.body.email);

	      	var id = generate();
	      	var LP = new LostPassword();
	      	LP.id = id;
	      	LP.email = existingUser.local.email;
	      	LP.save(function(err, lost) {
	      		if (err)
	      			console.log(err);

							nodemailerMailgun.sendMail({
						    from: config_mailgun.from,
						    to: 'mphuget@gmail.com',
						    subject: "Lug: reset your password",
						    text: "Dear " + existingUser.local.firstName + ' ' + existingUser.local.lastName + '\n' +
										'\n Please enter your new password when clicking on: ' + config_mailgun.url + '/admin/signin/reset/' + id;
						  }, function (err, info) {
						    if (err) {
						      console.log('Error: ' + err);
						    }
						    else {
						      console.log('Response: ' + info);
						    }
						  });

	      	});

	      	return res.redirect('/admin/signin');
	    }
	    else {
	      	req.flash('alert', i18n.__('Lost_2') + req.body.email);
	      	return res.redirect('/admin/signin/lost');
	    }

	});

}

module.exports.lost_get = lost_get;
module.exports.lost_post = lost_post;
