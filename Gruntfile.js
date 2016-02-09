module.exports = function (grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-wiredep');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    app: {
      src: 'web/src',
      dist: 'web/dist',
      tmp: 'web/tmp'
    },
    clean: {
      tmp: ['<%= app.tmp %>'],
      dist: ['<%= app.dist %>']
    },
    compass: {
      dist: {
        options: {
          sassDir: '<%= app.src %>/sass',
          cssDir: '<%= app.dist %>/css'
        }
      }
    },
    copy: {
      bower: {
        cwd: '<%= app.src %>',
        src: 'bower_components/**',
        dest: '<%= app.dist %>',
        expand: true
      },
      html: {
        cwd: '<%= app.src %>',
        src: ['**/*.html'],
        dest: '<%= app.dist %>',
        expand: true
      },
      misc: {
        cwd: '<%= app.src %>',
        src: 'images/**',
        dest: '<%= app.dist %>',
        expand: true
      }
    },
    concurrent: {
      tasks: ['serve', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    },
    requirejs: {
      compile: {
        options: {
          mainConfigFile: '<%= app.src %>/js/main.js',
          name: 'main',
          out: '<%= app.dist %>/js/compiled.js',
          optimizer: 'none'
        }
      }
    },
    watch: {
      scripts: {
        files: ['<%= app.src %>/**/*.js'],
        tasks: ['requirejs']
      },
      html: {
        files: ['<%= app.src %>/**/*.html'],
        tasks: ['copy:html']
      },
      css: {
        files: ['<%= app.src %>/**/*.scss'],
        tasks: ['compass']
      },
      server: {
        files: ['server/**'],
        tasks: ['serve']
      },
      options: {
        livereload: true
      }
    }
  });

  grunt.registerTask('serve', function() {
    require('./server');
    this.async();
  });

  grunt.registerTask('build', ['clean', 'copy', 'compass', 'requirejs']);
  grunt.registerTask('heroku:development', ['build', 'serve']);
  grunt.registerTask('heroku:production', ['heroku:development']);
  grunt.registerTask('default', ['build', 'concurrent']);

};
