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

// define the schema for our user model
//we make the distinction between connection through email (called local) or
//via social network
var Schema = mongoose.Schema;

var LostPasswordSchema = new Schema({
	id : String,
	email : String,
	createdAt: {
		type : Date,
		default : Date.now
	}
});

module.exports = mongoose.model('LostPassword', LostPasswordSchema);
