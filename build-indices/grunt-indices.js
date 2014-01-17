var fs = require('fs');
var path = require('path');

/*
  Walks a directory (not recursively) and
  returns an array of arrays [boolean of dictionary, filename].
*/
function walk(grunt, dir, done) {
  var results = [];
  var list = grunt.file.match({}, dir);
  var i = 0;
  (function next() {
    var file = list[i++];
    if (!file) {
      return done(null, results);
    }
    if (grunt.file.isDir(file)) {
      console.log('yes')
      results.push([true, file]);
      createIndex(file);
      next();
    } else {
      results.push([false, file]);
      next();
    }
  })();
};

var isDir;
var fn;

module.exports = function(grunt) {
  function createIndex(dir) {
    walk(grunt, dir, function(err, files) {
      if (err) {
        throw err;
      }
      grunt.file.read(path.resolve(__dirname, 'index.html.template'), 'utf8',
                  function(err, html) {
        if (err) {
          throw err;
        }
        var filesHTML = '';
        files.forEach(function(file) {
          isDir = file[0];
          fn = path.basename(file[1]);
          filesHTML += '<li><a class="icon ' + (isDir ? 'dir' : 'file') +
                       '" href="' + fn + '">' + fn + '</a></li>\n';
        });
        html = html.replace(/{{ dir }}/g, path.basename(dir));
        html = html.replace('{{ files }}', filesHTML);
        var fnIndex = path.resolve(dir, 'index.html');
        grunt.file.write(fnIndex, html, 'utf8', function(err) {
          if (err) {
            throw err;
          }
          console.log('Directory index created:', fnIndex);
        });
      });
    });
  }

  grunt.registerMultiTask('indices', 'Create directory indices', function() {
    grunt.log.writeln('Creating directory indices...');
    createIndex(this.data);
  });

  return {createIndex: createIndex};
};
