/*global module:false*/
module.exports = function(grunt) {
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

  grunt.loadTasks('build-indices');
  grunt.loadNpmTasks('grunt-gh-pages');
};
