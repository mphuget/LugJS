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

  	for(i=1; i<=6; i++) {
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
		alert : '',
		success : '',
		info : ''});
	}

}

function lost_post(req, res) {
	var User = require('../models/admin');
	//var utilities = require('../../../Core/server/utilities/utilities');
	var LostPassword = require('../models/lostPassword');

	User.findOne({'local.email' : req.body.email}, function(err, existingUser) {
	    if (existingUser) {
	    	//we issue a flash message for the form to render
	      	req.flash('info', 'An email was sent to this account ' + req.body.email + ' to set a new password');
	      	// var text = 'Dear ' + existingUser.local.firstName + ' ' + existingUser.local.lastName + '\n';
	      	var id = generate();
	      	// text = text + '\n Please enter your new email when clicking on: http://localhost:3000/signin/reset/' + id;
	      	// utilities.sendEmail(existingUser, text);

	      	var LP = new LostPassword();
	      	LP.id = id;
	      	LP.email = existingUser.local.email;
	      	LP.save(function(err, lost) {
	      		if (err)
	      			console.log(err);

	      	});

	      	return res.redirect('/admin/signin');
	    }
	    else {
	      	req.flash('alert', 'This account does not exist ' + req.body.email);
	      	return res.redirect('/admin/signin/lost');
	    }

	});

}

module.exports.lost_get = lost_get;
module.exports.lost_post = lost_post;
