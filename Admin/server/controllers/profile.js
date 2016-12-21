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
along with LugJS.  If not, see <http://www.gnu.org/licenses/>.
*/
/*
The project is located at: https://github.com/mphuget/LugJS

Author: Marc-Philippe Huget
*/

//display the profile
function display(req, res) {
  res.render('../views/pages/profile', {
    alert : req.flash('alert'),
    success : req.flash('success'),
    info : req.flash('info')}
  );
}

//update the profile
function update(req, res) {

    res.send("TODO update profile");

}

module.exports.profile = profile;
module.exports.update = update;
