'use strict';
module.exports = function(grunt) {
  var npmDependencies = require('./package.json').devDependencies;
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * <%= pkg.themeName %> Version <%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2015-<%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
            ' */\n',
    themeheader:  '/*\n' +
                  'Theme Name: <%= pkg.themeName %>\n' +
                  'Author: <%= pkg.author.name %>\n' +
                  'Author URI: <%= pkg.author.url %>\n' +
                  'Version: <%= pkg.version %>\n' +
                  '*/',

    jshint: {
      options: {
        jshintrc: 'assets/dev/.jshintrc'
      },
      src: [
        'assets/dev/scripts.js'
      ]
    },

    uglify: {
      options: {
        preserveComments: 'some',
        report: 'min'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'assets/dist/<%= pkg.functionPrefix %>.min.js'
      }
    },

    autoprefixer: {
      options: {
        browsers: [
          'Android 2.3',
          'Android >= 4',
          'Chrome >= 20',
          'Firefox >= 24',
          'Explorer >= 8',
          'iOS >= 6',
          'Opera >= 12',
          'Safari >= 6'
        ]
      },
      dist: {
        src: 'assets/dist/<%= pkg.functionPrefix %>.css'
      }
    },

    cssjoin: {
      dist: {
        files: {
          'assets/dist/<%= pkg.functionPrefix %>.min.css': 'assets/dist/<%= pkg.functionPrefix %>.css'
        }
      },
    },

    copy: {
      main: {
        src: 'assets/dev/scripts.js',
        dest: 'assets/dist/scripts.js'
      },
    },

    usebanner: {
      options: {
        position: 'top',
        banner: '<%= banner %>'
      },
      files: {
        src: 'assets/dist/*.css'
      }
    },

    replace: {
      dist: {
        src: ['style.css'],
        overwrite: true,
        replacements: [{
          from: /((?:\/\*(?:[^*]|(?:\*+[^*\/]))*\*+\/)|(?:\/\/.*))/,
          to: '<%= themeheader %>'
        }]
      },
      init: {
        src: [
          'bower.json',
          'inc/components/*.php',
          'inc/*.php',
          'comments.php',
          'footer.php',
          'functions.php',
          'header.php',
          'index.php',
          'sidebar.php'
        ],
        overwrite: true,
        replacements: [{
          from: 'MyWPTheme',
          to: '<%= pkg.classPrefix %>'
        }, {
          from: 'MYWPTHEME',
          to: '<%= pkg.constantPrefix %>'
        }, {
          from: 'mywptheme',
          to: '<%= pkg.functionPrefix %>'
        }]
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-cssjoin');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('concat:dev', 'concats scripts for dev', function(){
    grunt.config.merge({    
      concat: {
        options: {
          banner: '<%= banner %>'
        },
        dist: {
          src: [
            'assets/dev/bootstrap/js/*.js'
          ],
          dest: 'assets/dist/<%= pkg.functionPrefix %>.js'
        }
      }
    });
    grunt.task.run('concat');
    grunt.task.run('copy');
  });

  grunt.registerTask('concat:prod', 'concats scripts for prod', function(){
    grunt.config.merge({    
      concat: {
        options: {
          banner: '<%= banner %>'
        },
        dist: {
          src: [
            'assets/dev/bootstrap/js/*.js',
            'assets/dev/scripts.js'
          ],
          dest: 'assets/dist/<%= pkg.functionPrefix %>.js'
        }
      }
    });
    grunt.task.run('concat');
  });

  grunt.registerTask('less:dev', 'compiles less scripts for dev', function(){
    grunt.config.merge({    
      less: {
        dist: {
          options: {
            strictMath: true
          },
          files: {
            'assets/dist/<%= pkg.functionPrefix %>.css': 'assets/dev/style.less'
          }
        }
      },
    });
    grunt.task.run('less');
  });

  grunt.registerTask('less:prod', 'compiles less scripts for prod', function(){
    grunt.config.merge({    
      less: {
        dist: {
          options: {
            strictMath: true,
            compress: true
          },
          files: {
            'assets/dist/<%= pkg.functionPrefix %>.css': 'assets/dev/style.less'
          }
        }
      },
    });
    grunt.task.run('less');
  });

  grunt.registerTask('cleanAll', 'removes not minified files', function(){
    grunt.config.merge({
      clean: 
        files [
          'assets/dist/<%= pkg.functionPrefix %>.js',
          'assets/dist/<%= pkg.functionPrefix %>.min.js',
          'assets/dist/<%= pkg.functionPrefix %>.css',
          'assets/dist/<%= pkg.functionPrefix %>.min.css'
        ]
    });
    grunt.task.run('clean');
  });

  grunt.registerTask('cleanProdCss', 'removes not minified files', function(){
    grunt.config.merge({
      clean: 
        files ['assets/dist/<%= pkg.functionPrefix %>.css']
    });
    grunt.task.run('clean');
  });

  grunt.registerTask('cleanProdJs', 'removes not minified files', function(){
    grunt.config.merge({
      clean: 
        files [
          'assets/dist/<%= pkg.functionPrefix %>.js'
        ]
    });
    grunt.task.run('clean');
  });

  grunt.registerTask('stylesheets:dev', 'prepares stylesheets for dev', function(){
    grunt.task.run(['cleanAll', 'less:dev', 'autoprefixer']);
  });

  grunt.registerTask('stylesheets:prod', 'prepares stylesheets for prod', function(){
    grunt.task.run(['cleanAll', 'less:prod', 'autoprefixer', 'cssjoin', 'usebanner', 'cleanProdCss']);
  });

  grunt.registerTask('scripts:dev', 'prepares scripts for dev', function(){
    grunt.task.run(['cleanAll', 'jshint', 'concat:dev']);
  });

  grunt.registerTask('scripts:prod', 'prepares scripts for prod', function(){
    grunt.task.run(['cleanAll', 'jshint', 'concat:prod', 'uglify', 'cleanProdJs']);
  });

  grunt.registerTask('watch:dev', 'watch setup for dev environment', function(){
    grunt.config.merge({
      watch: {
        scripts: {
          files: ['assets/dev/scripts.js'],
          tasks: ['scripts:dev'],
          options: {
            livereload: true
          }
        },
        stylesheets: {
          files: ['assets/dev/style.less'],
          tasks: ['stylesheets:dev'],
          options: {
            livereload: true
          }
        }
      }
    });
    grunt.task.run('watch');    
  });

  grunt.registerTask('watch:prod', 'watch setup for prod environment', function(){
    grunt.config.merge({
      watch: {
        scripts: {
          files: ['assets/dist/scripts.js'],
          tasks: ['scripts:prod'],
          options: {
            livereload: true
          }
        },
        stylesheets: {
          files: ['assets/dist/style.less'],
          tasks: ['stylesheets:prod'],
          options: {
            livereload: true
          }
        }
      }
    });
    grunt.task.run('watch');    
  });

  grunt.registerTask('default', [
    'watch:dev'
  ]);

  grunt.registerTask('watch-production', [
    'watch:prod'
  ]);

  grunt.registerTask('build:dev', [
    'scripts:dev',
    'stylesheets:dev',
    'replace:dist'
  ])

  grunt.registerTask('build:prod', [
    'scripts:prod',
    'stylesheets:prod',
    'replace:dist'
  ]);

  grunt.registerTask('setup', [
    'replace:init',
    'bower-install',
    'build:dev'
  ]);

  grunt.registerTask('bower-install', function() {
    var done = this.async();
    var bower = require('bower').commands;
    bower.install().on('end', function(data) {
      done();
    }).on('data', function(data) {
      console.log(data);
    }).on('error', function(err) {
      console.error(err);
      done();
    });
  });
};
