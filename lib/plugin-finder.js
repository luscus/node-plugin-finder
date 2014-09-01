/*
    Copyright (C) 2013  Luscus
    <https://github.com/luscus/node-plugin-finder>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program: see COPYING in the root directory.
    If not, see <http://www.gnu.org/licenses/>.
*/

// load modules
var probe = require('root-probe'),
    path = require('path');

function match (regex) {

  if (regex.test) {
    var matching = [],
        idx = probe.dependencies.length;

    while (idx--) {
      if (regex.test(probe.dependencies[idx].name)) {
        matching.push(probe.dependencies[idx]);
      }
    }

    return matching;
  }
  else {
    unvalidRegularExprssion();
  }
}


function load (regex) {
  var matching = match(regex);

  if (matching.length === 1) {
    return require(probe.path + path.sep + matching[0].path);
  }
  else if (matching.length === 0) {
    noPluginFoundException();
  }
  else {
    multiplePluginFoundException();
  }
}


function loadAll (regex) {
  var matching = match(regex),
      idx = matching.length,
      loaded = {};

  if (matching.length) {
    while (idx--) {
      loaded[matching[idx].name] = require(probe.path + path.sep + matching[idx].path);
    }

    return loaded;
  }
  else {
    noPluginFoundException();
  }
}

module.exports = {
  match: function (regex) {
    return match(regex);
  },
  load: function (regex) {
    return load(regex);
  },
  loadAll: function (regex) {
    return loadAll(regex);
  }
};



function unvalidRegularExprssion () {
    var error = new Error('you have to provide a valid regular expression');
    error.name = 'UnvalidRegularExprssion';

    throw error;
}

function noPluginFoundException () {
    var error = new Error('no plugin found matching the provided regular expression: "'+regex+'"');
    error.name = 'NoPluginFoundException';

    throw error;
}

function multiplePluginFoundException () {
    var error = new Error('your regular expression returned too many plugins, be more specific');
    error.name = 'MultiplePluginFoundException';

    throw error;
}
