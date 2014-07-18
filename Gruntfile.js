module.exports = function(grunt) {

  "use strict";

  require('jit-grunt')(grunt);

  grunt.initConfig({

    path: "theme",
    port: 9090,

    concurrent : {
      options : {
        logConcurrentOutput : true
      },
      dev : ["compass", "watch"]
    },

    compass : {

      dev : {
        options : {
          sassDir         : ["<%= path %>/src/sass"],
          cssDir          : ["<%= path %>/dist/css"],
          environment     : "development",
          outputStyle     : "compressed",
          relativeAssets  : true,
          force           : true,
          watch           : true
        }
      },

      prod : {
        options : {
          sassDir         : ["<%= path %>/src/sass"],
          cssDir          : ["<%= path %>/dist/css"],
          environment     : "production",
          outputStyle     : "compressed",
          relativeAssets  : true,
          force           : true
        }
      }

    },

    browserify: {

      dev : {
        files : {
          "<%= path %>/dist/js/app.js" : ["<%= path %>/src/js/app.{js,coffee}"]
        },
        options: {
          transform: ["coffeeify"]
        }
      }

    },

    uglify: {

      options: {
        mangle: true,
        compress: true
      },
      target: {
        files: {
          "<%= path %>/dist/js/app.min.js" : ["<%= path %>/dist/js/app.js"]
        }
      }

    },

    watch: {

      options : {
        livereload : {
          port : '<%= port %>'
        }
      },

      stylesheets : {
        files : ["<%= path %>/dist/css/app.css"]
      },

      scripts : {
        files : ["<%= path %>/src/js/**/*.{js,coffee}", "<%= path %>/src/js/app.{js,coffee}"],
        tasks : ["browserify:dev"]
      }

    }

  });
  
  grunt.registerTask("default", ["concurrent:dev"]);
  grunt.registerTask("build",   ["compass:prod",  "browserify:dev", "uglify"]);

};