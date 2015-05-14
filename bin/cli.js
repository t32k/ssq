#!/usr/bin/env node

'use strict';

var fs = require('fs');
var path = require('path');
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

var ids = [];
data.results.forEach(function (result) {
  ids.push(result.objectId);
});
var len = data.results.length;


var file = path.join(__dirname, '../assets/sitemap.hbs');
var hoge = fs.readFileSync(file, {
  encoding: 'utf8'
});

console.log(hoge);

var template = Handlebars.compile('<div>{{foo}}</div>');
//console.log(template({foo: 'a'}));


Object.keys(total).forEach(function (key) {
  total[key] = total[key] / len;
});

//console.log(total);
//console.log(data.results.length);