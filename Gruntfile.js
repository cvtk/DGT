module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ['dist', 'tmp'],

    assemble: {
      options: {
        plugins: ['grunt-assemble-sitemap'],
        data: 'src/data/*.json',
        partials: ['src/includes/*.hbs'],
        layoutdir: 'src/layouts',
        collections: [
          {
            name: 'posts',
            inflection: 'post',
            sortorder: 'desc',
            sortby: 'created',
            index: 'src/pages/blog/index.hbs'
          },
          {
            name: 'cases',
            inflection: 'case',
            sortorder: 'desc',
            sortby: 'created',
            index: 'src/pages/cases/index.hbs'
          }
        ],
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
    imagemin: {
      all: {
        options: { optimizationLevel: 3 },
        files: [{
          expand: true,
          flatten: true,
          cwd: 'src/',
          src: ['**/*.{png,jpg,jpeg,gif}', '!assets/favicon'],
          dest: 'dist/'
        }]
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
      favicon: {
        files:[{
          dest: 'dist/',
          src: 'src/assets/favicon/*.*',
          expand: true,
          flatten: true
        }]
      },
      other: {
        files:[{
          dest: 'dist/',
          src: 'src/assets/other/*',
          expand: true,
          flatten: true
        }]
      },
    },

    sass: {
      dist: {
        options: { style: 'compressed', sourcemap: 'none' },
        files: [{
          dest: 'tmp/',
          src: 'src/assets/sass/*.sass',
          expand: true,
          flatten: true,
          ext: '.css'
        }]
      }
    },
    concat: {
      js: {
        files: [{
          dest: 'dist/b.js',
          src: [ 'src/assets/js/base.js', 'src/**/*.js' ],
        }]
      },
      css: {
        files: [{
          dest: 'dist/a.css',
          src: [ 'tmp/base.css', 'tmp/**/*.css' ],
        }]
      }
    },
    autoprefixer: {
      dist:{
        files:{
          'dist/a.css':'dist/a.css'
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'dist/a.css': ['dist/a.css']
        }
      }
    },
    uglify: {
      js: {
        files: [{
          dest: 'dist/',
          src: 'dist/b.js',
          expand: true,
          flatten: true
        }]
      }
    },

    rcs: {
      css: {
        options: {
          replaceCss: true
        },
        files: [{
          expand: true,
          flatten: true,
          src: 'dist/a.css',
          dest: 'dist/',
        }]
      },
      all: {
        files: [{
          expand: true,
          src: [
            'dist/b.js',
            'dist/about/index.html',
            'dist/blog/index.html',
            'dist/cases/index.html',
            'dist/contacts/index.html',
            'dist/services/index.html',
            'dist/index.html',
            'dist/404.html',
            'dist/cases/index.html',
            'dist/cases/administrirovanie-serverov-atrus.html',
            'dist/cases/administrirovanie-serverov-kristall.html',
            'dist/cases/administrirovanie-serverov-meganom.html',
            'dist/cases/bezopasnost-partner-finans.html',
            'dist/cases/bezopasnost-restoran-moreman.html',
            'dist/cases/bezopasnost-rinali.html',
            'dist/cases/ip-telefonija-defo.html',
            'dist/cases/ip-telefonija-klinicheskaya-bolnitsa-9.html',
            'dist/cases/ip-telefonija-vostok-servis.html',
            'dist/cases/montazh-i-nastrojka-seti-tekhnonikol.html',
            'dist/cases/montazh-i-nastrojka-seti-volzhskaya-zhemchuzhina.html',
            'dist/cases/montazh-i-nastrojka-seti-v-rtk.html',
            'dist/cases/obsluzhivanie-rabochih-mest-bjf.html',
            'dist/cases/obsluzhivanie-rabochih-mest-krasnyj-krest.html',
            'dist/cases/obsluzhivanie-rabochih-mest-yarvoda.html',
            'dist/cases/podderzhka-orgtehniki-cpv.html',
            'dist/cases/podderzhka-orgtehniki-rzhdt.html',
            'dist/cases/podderzhka-orgtehniki-vostok-servis.html',
            'dist/cases/seo-prodvizhenie-ferroplast.html',
            'dist/cases/seo-prodvizhenie-guard.html',
            'dist/cases/seo-prodvizhenie-satl.html',
            'dist/cases/veb-razrabotka-jekspert-finans.html',
            'dist/cases/veb-razrabotka-yarzak.html',
            'dist/cases/veb-razrabotka-yasr.html',
            'dist/cases/vnedrenie-programmnogo-obespechenija-dinamika76.html',
            'dist/cases/vnedrenie-programmnogo-obespechenija-ubil.html',
            'dist/cases/vnedrenie-programmnogo-obespechenija-yats.html',
            'dist/blog/*.html',
            'dist/blog/tags/*.html'
          ],
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
      build: ['Gruntfile.js', 'src/assets/js/*.js']
    },

    cacheBust: {
      options: {
        assets: ['**/*.{js,css,png,svg,jpg,jpeg,eot,ttf,woff,woff2}'],
        baseDir: './dist/',
        deleteOriginals: true,
        length: 7,
      },
      taskName: {
        files: [{   
            expand: true,
            cwd: 'dist/',
            src: ['**/*.html', '**/*.css']
        }]
      }
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
        tasks: ['assemble', 'jshint', 'copy', 'sass', 'concat'],
        options: {
          spawn: false,
          livereload: true
        },
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-assemble');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-rcs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-cache-bust');
  grunt.registerTask('default', ['clean', 'assemble', 'imagemin', 'copy', 'sass', 'concat', 'autoprefixer', 'uglify', 'cssmin', 'cacheBust', 'htmlmin']);
  // grunt.registerTask('default', ['clean', 'assemble', 'jshint', 'copy', 'uglify', 'sass', 'rcs', 'htmlmin', 'cacheBust']);
  grunt.registerTask('dev', ['connect', 'watch']);
};