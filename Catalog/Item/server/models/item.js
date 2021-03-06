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

// define the schema for our department model
var Schema = mongoose.Schema;

var extraSchema = new Schema({
    key : String,
    value : String,
    id : String

});

var ImageSchema = new Schema({
      fileName: String,
      url: String
});

var ItemSchema = new Schema({

  department : String,
  category : String,
  id : String,
  name : String,
  description : String,
  price : Number,
  seller : String,
  quantity : Number,
  extra : [extraSchema],
  pictures : [ImageSchema],
  visible : Boolean,
  store : String

});


module.exports = mongoose.model('Item', ItemSchema);
