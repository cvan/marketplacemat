var fs = require('fs');
var path = require('path');

/*
  Walks a directory (not recursively) and
  returns an array of arrays [boolean of dictionary, filename].
*/
function walk(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) {
      return done(err);
    }
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) {
        return done(null, results);
      }
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          results.push([true, file]);
          createIndex(file);
          next();
        } else {
          results.push([false, file]);
          next();
        }
      });
    })();
  });
};

var isDir;
var fn;

module.exports.createIndex = createIndex = function createIndex(dir) {
  walk(dir, function(err, files) {
    if (err) {
      throw err;
    }
    fs.readFile(path.resolve(__dirname, 'index.html.template'), 'utf8',
                function(err, html) {
      if (err) {
        throw err;
      }
      var filesHTML = '';
      files.forEach(function(file) {
        isDir = file[0];
        fn = path.basename(file[1]);
        if (fn === 'index.html') {
          continue;
        }
        filesHTML += '<li><a class="icon ' + (isDir ? 'dir' : 'file') +
                     '" href="' + fn + '"><span>' + fn + '</span></a></li>\n';
      });
      html = html.replace(/{{ dir }}/g, path.basename(dir));
      html = html.replace('{{ files }}', filesHTML);
      var fnIndex = path.resolve(dir, 'index.html');
      fs.writeFile(fnIndex, html, 'utf8', function(err) {
        if (err) {
          throw err;
        }
        console.log('Directory index created:', fnIndex);
      });
    });
  });
}

createIndex('history');
