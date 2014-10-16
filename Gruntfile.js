'use strict';
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};
module.exports = function(grunt) {



  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    // Task configuration.
    clean: {
      files: ['./tmp/']
    },
    uglify: {
      dist: {
        src: 'js/index.js',
        dest: 'js/index.min.js'
      },
    },
    watch: {
      app: {
        files: 'index.haml',
        tasks: ['haml']
      },
      less: {
        files: ['less/style.less'],
        tasks: ['less:dev']
      },
      dev: {
        files: ['index.html','css/style.css','js/index.js'],
        options: {
          livereload: true
        }
      },
    },
    haml: {                              // Task
      dev: {                             // Another target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {
          'index.html': 'index.haml'
        }
      }
    },
    less: {
      dev: {
        files: {
          "css/style.css": "less/style.less"
        },
        options: {
          compress: true,
          sourceMap: true,
          sourceMapBasepath:"./tmp/css",
          sourceMapFilename: 'style.css.min.map',
          sourceMapRootpath: ''
        }
      },
      build: {
        files: {
          "css/style.css": "less/style.less"
        }
      }
    },
    connect: {
      development: {
        options: {
          port: 2222,
          open: true,
          base: ["."]
        }
      },
      production: {
        options: {
          keepalive: true,
          port: 8080,
          open: true,
          base: ["./dist","./mock"]
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-haml');

  // Default task.
  grunt.registerTask('default', ['connect:development']);
  grunt.registerTask('dev', ['haml','less','connect:development', 'watch']);


};
