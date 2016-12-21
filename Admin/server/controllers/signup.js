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

//generate an email and send it via mailgun
function generateEmail(mailgun_to, mailgun_subject, mailgun_text) {

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

  nodemailerMailgun.sendMail({
    from: config_mailgun.from,
    //has to be changed, on the sandbox, I have to use my own address
    to: mailgun_to,
    subject: mailgun_subject,
    text: mailgun_text,
  }, function (err, info) {
    if (err) {
      console.log('Error: ' + err);
    }
    else {
      console.log('Response: ' + info);
    }
  });

}

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
  var Confirm = require('../models/confirm');

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
    		      	req.flash('alert', i18n.__("Signup_1"));
    		      	res.redirect('/admin/signup');
    		    }
    		    else {
    		      	admin.save(function(err, admin) {
    		        	   if (err) return next(err);

    			           req.logIn(admin, function(err) {
                				if (err) return next(err);

                        req.session.admin = admin;
                				req.flash('info', i18n.__("Signup_2"));
                				res.redirect('/admin/signin');
                    })
    		       });

               var confirm = new Confirm();
               confirm.email = admin.local.email;
               confirm.id = generate();
               confirm.save(function(err, account) {
                  if (err) return next(err);

               });

               generateEmail('mphuget@gmail.com',
                             'Lug: Please confirm your email',
                             'Click on this link to confirm your account: http://localhost:3000/admin/confirm/' + admin.local.email + '/' + confirm.id);

    		    }
  		});
  }

  //there are errors on the validation
  //issue an error to the user
  else {
    req.flash('alert', i18n.__("Signup_4"));
    res.status(400).redirect('/admin/signup');
  }

}

//confirmation of the email account after receiving an email from Lug
function confirm(req, res) {

    var Admin = require('../models/admin');
    var Confirm = require('../models/confirm');

    Admin.findOne({"local.email": req.params.email}, function(err, admin) {

        if (err)
          throw err;

        Confirm.findOne({email:admin.local.email}, function(err, account) {
            if (err)
              throw err;

            if (account.id == req.params.key) {
              Confirm.remove({email:admin.local.email}, function(err) {
                if (err)
                  throw err;

              });
            }
            else {
              req.flash('alert', i18n.__("Signup_5"));
              res.redirect('/admin/signin');
            }

        });

        Admin.update({"local.email": req.params.email}, {"local.confirmed":true}, {upsert:true}, function(err, admin) {
            if (err)
              throw err;

            req.flash('Info', i18n.__("Signup_6"));
            res.redirect('/admin/signin');

        });

    });
}

module.exports.getForm = getForm;
module.exports.addUser = addUser;
module.exports.confirm = confirm;
