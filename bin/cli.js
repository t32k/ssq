#!/usr/bin/env node

'use strict';

var fs = require('fs');
var program = require('commander');

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
  Object.keys(result).forEach(function (key) {
    if (typeof result[key] === 'number') {
      if (total[key] === undefined) {
        total[key] = 0;
      } else {
        total[key] += result[key];
      }
    }
  });
});
var len = data.results.length;

Object.keys(total).forEach(function (key) {
  total[key] = total[key] / len;
});

console.log(total);
//console.log(data.results.length);