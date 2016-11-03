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

function getCategories(req, res) {
  res.send('GET /catalog/categories/:dept and dept = ' + req.params.dept);
}

function addCategory(req, res) {
  res.send('POST /catalog/category');
}

function updateCategory(req, res) {
  res.send('PUT /catalog/category');
}

function deleteCategory(req, res) {
  res.send('DELETE /catalog/category/:dept/:cat');
}

module.exports.getCategories = getCategories;
module.exports.addCategory = addCategory;
module.exports.updateCategory = updateCategory;
module.exports.deleteCategory = deleteCategory;
