#!/usr/bin/env node

'use strict';

var fs = require('fs');
var program = require('commander');
var ssq = require('../lib/ssq');

program
  .version(require('../package.json').version)
  .usage('[options] <JSON ...>')
  .option('-S, --sitemap', 'output sitemap.xml')
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
    if (typeof result[key] === 'number') {
      if (total[key] === undefined) {
        total[key] = 0;
      } else {
        total[key] += result[key];
      }
    }
  });

});


// Create Sitemap.xml
if (program.sitemap) {
  ssq.createSitemap('../assets/sitemap.hbs', ids);
}

Object.keys(total).forEach(function (key) {
  total[key] = total[key] / len;
});

console.log('Total Results: ' + len + '\n');
console.log(total);