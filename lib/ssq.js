var fs = require('fs');
var path = require('path');

var Handlebars = require('handlebars');

/**
 * Create sitemap.xml
 * @param {String} template file path.
 * @param {Array} Parse Object IDs
 * @returns {String}
 */
function createSitemap(templatePath, data) {
  var file = path.join(__dirname, templatePath);
  var templateStrings = fs.readFileSync(file, {
    encoding: 'utf8'
  });
  var template = Handlebars.compile(templateStrings);
  console.log(template({id: data}));
  process.exit();
}

module.exports = {
  createSitemap: createSitemap
};