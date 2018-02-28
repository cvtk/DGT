module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    assemble: {
      options: {
        plugins: ['grunt-assemble-sitemap'],
        partials: ['src/includes/*.hbs'],
        layoutdir: 'src/layouts',
        collections: [{
          name: 'posts',
          inflection: 'post',
          sortorder: 'desc',
          sortby: 'created',
          index: 'src/pages/blog/index.hbs'
        }],
        sitemap: {
          homepage: 'http://digit-it.ru',
          changefreq: 'daily',
          priority: '0.8',
          pretty: true,
          dest: 'dist',
          relativedest: true
          }
      },
      site: {
        options: {
          layout: 'post.hbs'
        },
        expand: true,
        cwd: 'src/pages',
        src: '**/*.{hbs,yml}',
        dest: 'dist/'
      }
    },

    copy: {
      fonts: {
        files: [{
          dest: 'dist/',
          src: 'src/assets/fonts/**/*.{eot,svg,ttf,woff,woff2}',
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
      },
      img: {
        files:[{
          dest: 'dist/',
          src: 'src/assets/img/**/*.{png,svg,jpg,jpeg}',
          expand: true,
          flatten: true
        }]
      },
      blogimg: {
        files:[{
          dest: 'dist/blog/i',
          src: 'src/pages/blog/i/*.jpg',
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
          src: 'src/assets/sass/*.sass',
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
          src: 'src/assets/js/*.js',
          expand: true,
          flatten: true
        }]
      }
    },

    rcs: {
      options: {},
      css: {
        options: {
          replaceCss: true
        },
        files: [{
          expand: true,
          flatten: true,
          src: 'dist/**/*.css',
          dest: 'dist/',
        }]
      },
      all: {
        files: [{
          expand: true,
          src: ['dist/**/*.js', 'dist/**/*.html'],
          dest: './'
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
          src: 'dist/**/*.html',
          dest: './',
          expand: true,
        }]
      }
    },

    jshint: {
      build: ['Gruntfile.js', 'src/assets/**/*.js']
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
        tasks: ['assemble', 'jshint', 'copy', 'uglify', 'sass', 'rcs', 'htmlmin'],
        options: {
          spawn: false,
          livereload: true
        },
      },
    }
  });

  grunt.loadNpmTasks('grunt-assemble');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-rcs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.registerTask('default', ['assemble', 'jshint', 'copy', 'uglify', 'sass', 'rcs', 'htmlmin']);
  grunt.registerTask('dev', ['connect', 'watch']);
};