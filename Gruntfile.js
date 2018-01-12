module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      fonts: {
        files: [{
          dest: 'dist/',
          src: 'src/fonts/**/*.{eot,svg,ttf,woff,woff2}',
          expand: true,
          flatten: true
        }]
      },
      html: {
        files: [{
          dest: 'dist/',
          src: 'src/*.html',
          expand: true,
          flatten: true
        }]
        
      }
    },

    sass: {
      dist: {
        options: { style: 'compressed', sourcemap: 'none' },
        files: [{
          dest: 'dist/',
          src: 'src/sass/*.sass',
          expand: true,
          flatten: true,
          ext: '.css'
        }]
      }
    },

    uglify: {
      js: {
        files: [{
          dest: 'dist/',
          src: 'src/js/*.js',
          expand: true,
          flatten: true
        }]
      }
    },

    "class-id-minifier": {
      simple: {
        options: {
          jsMapFile: 'tmp/simple/map.js',
          jsMapDevFile: 'tmp/simple/map.dev.js',
          minifyFilter: function (k, type) {
            return /^J_/.test(k) ? false : true;
          },
          jsMapFilter: function (k, type) {
            return !!type.id;
          }
        },
        files: [{
          dest: 'dist/',
          src: 'dist/*.{html,css}',
          expand: true,
          flatten: true
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          dest: 'dist/',
          src: 'dist/*.html',
          expand: true,
          flatten: true
        }]
      }
    },

    jshint: {
      build: ['Gruntfile.js', 'src/**/*.js']
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: 'dist/'
        }
      }
    },

    watch: {
      assets: {
        files: 'src/**/*.*',
        tasks: ['jshint', 'copy', 'uglify', 'sass', 'class-id-minifier', 'htmlmin'],
        options: {
          spawn: false,
          livereload: true
        },
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-class-id-minifier');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.registerTask('default', ['jshint', 'copy', 'uglify', 'sass', 'class-id-minifier', 'htmlmin']);
  grunt.registerTask('dev', ['connect', 'watch']);
};