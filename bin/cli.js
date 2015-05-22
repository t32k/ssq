#!/usr/bin/env node

'use strict';

var fs = require('fs');
var program = require('commander');
var ssq = require('../lib/ssq');

var moment = require('moment');
var numeral = require('numeral');

program
  .version(require('../package.json').version)
  .usage('[options] <JSON ...>')
  .option('-t, --time <period>', 'set a period of time')
  .option('-s, --sitemap', 'output sitemap.xml')
  .parse(process.argv);

var data = JSON.parse(fs.readFileSync(program.args[0], {
  encoding: 'utf8'
}));

// Set time
if (program.time) {
  //console.log(program.time);
}

function checkBetween(time, between) {
  if (!between) return true;

  var start, end;
  if (between.indexOf('-') !== -1) {
    start = between + '-01';
    end = between + '-31';
  } else {
    start = between + '-01-01';
    end = between + '-12-31';
  }
  return moment(time).isBetween(start, end);
}


var total = {};
var length = 0;

var ids = [];
data.results.forEach(function (result) {

  if (!checkBetween(result.published, program.time)) return;
  length += 1;
  ids.push(result.objectId);

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

// Create sitemap
if (program.sitemap) {
  ssq.createSitemap('../assets/sitemap.hbs', ids);
}

Object.keys(total).forEach(function (key) {
  total[key] = total[key] / length;
  // Prettified Data
  total[key] = numeral(total[key]).format('0,0.00');
});

console.log('Total Results: ' + length);
console.log(total);