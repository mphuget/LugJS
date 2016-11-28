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
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
//we make the distinction between connection through email (called local) or
//through social network
var Schema = mongoose.Schema;

var AdminSchema = new Schema({

	local : {
    firstName: String,
    lastName : String,
      email : {
        type : String,
        index : true,
        unique : true,
        lowercase : true
      },
      password : String,
      createdAt : {
        type : Date,
        default : Date.now
      },
			stores : [ String ]
  }
});


//  Hash the password before we even save it to the database
AdminSchema.pre('save', function(next) {
  var admin = this;
  if (!admin.isModified('local.password'))
  	return next();
  bcrypt.genSalt(10, function(err, salt) {
    if (err)
    	return next(err);
    bcrypt.hash(admin.local.password, salt, null, function(err, hash) {
      if (err)
      	return next(err);
      admin.local.password = hash;
      next();
    });
  });
})

// compare password in the database and the one that the user type in
AdminSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
}

// UserSchema.methods.canPlayRoleOf = function(role) {
//   if (role === "admin" && this.local.roles.admin) {
//     return true;
//   }
//
//   if (role === "account" && this.local.roles.account) {
//     return true;
//   }
//
//   return false;
// }

// AdminSchema.methods.defaultReturnUrl = function() {
//     var returnUrl = '/';
//     if (this.canPlayRoleOf('account')) {
//       returnUrl = '/profile/';
//     }
//
//     if (this.canPlayRoleOf('admin')) {
//       returnUrl = '/admin/';
//     }
//
//     return returnUrl;
// }

module.exports = mongoose.model('Admin', AdminSchema);
