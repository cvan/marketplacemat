/*global module:false*/
module.exports = function(grunt) {
  var indices = require('./build/indices');

  grunt.initConfig({
    'gh-pages': {
      options: {
        base: 'build',
      },
      src: ['**']
    },
    'indices': {
      src: 'history'
    }
  });

  grunt.loadTasks('build');
  grunt.loadNpmTasks('grunt-gh-pages');
};
