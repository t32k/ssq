#!/usr/bin/env node

'use strict';

var fs = require('fs');
var program = require('commander');
var ssq = require('../lib/ssq');

var moment =  require('moment');
var numeral =  require('numeral');

program
  .version(require('../package.json').version)
  .usage('[options] <JSON ...>')
  .option('-t, --time <period>', 'set a period of time')
  .option('-s, --sitemap', 'output sitemap.xml')
  .parse(process.argv);

var data = JSON.parse(fs.readFileSync(program.args[0], {
  encoding: 'utf8'
}));

var total = {};
var len = data.results.length;

var ids = [];
data.results.forEach(function (result) {

  ids.push(result.objectId);

  Object.keys(result).forEach(function (key) {

    //console.log(moment(result.published).isBefore('2015-5-01'));

    if (typeof result[key] === 'number') {
      if (total[key] === undefined) {
        total[key] = 0;
      } else {
        total[key] += result[key];
      }
    }
  });

});

//console.log(moment('2012-10-20').isBetween('2012-10', 'monthly'));

// Set time
if (program.time) {
  //console.log(program.time);
}

// Create sitemap
if (program.sitemap) {
  ssq.createSitemap('../assets/sitemap.hbs', ids);
}

Object.keys(total).forEach(function (key) {
  total[key] = total[key] / len;
  total[key] =  numeral(total[key]).format('0,0.00');
});

console.log('Total Results: ' + len + '\n');
console.log(total);