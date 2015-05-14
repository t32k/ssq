#!/usr/bin/env node

'use strict';

var fs = require('fs');
var program = require('commander');
var Handlebars = require('handlebars');

program
  .version(require('../package.json').version)
  .usage('[options] <file ...>')
  .parse(process.argv);

var json = fs.readFileSync(program.args[0], {
  encoding: 'utf8'
});

var data = JSON.parse(json);

var total = {};

data.results.forEach(function (result) {
  //console.log(result.objectId);
});
var len = data.results.length;

var template = Handlebars.compile('{{foo}}');
console.log(template({}));


Object.keys(total).forEach(function (key) {
  total[key] = total[key] / len;
});

//console.log(total);
//console.log(data.results.length);