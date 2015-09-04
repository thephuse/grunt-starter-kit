module.exports = function(grunt) {

  "use strict";

  require("jit-grunt")(grunt);

  grunt.initConfig({

    /**
     * grunt-contrib-connect
     */
    connect : {
      dev : {
        options : {
          port : 8000,
          hostname : "*",
          base : "dist"
        }
      }
    },

    /**
     * grunt-webpack
     */
    webpack : {
      options : {
        module: {
          loaders: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
              query: {
                optional: ['es7.classProperties']
              }
            },
            {
              test: /\.json$/,
              exclude: /node_modules/,
              loader: 'json-loader'
            }
          ]
        }
      },
      static : {
        entry: "./src/js/app.js",
        output: {
          path: "dist",
          filename: "app.js",
        },
        stats: {
          colors: true,
          modules: false,
          reasons: true
        },
        progress: false,
        watch: false,
        keepalive: false
      }
    },

    /**
     * grunt-contrib-uglify
     */
    uglify: {
      options: {
        mangle: true,
        compress: true,
        report: "gzip"
      },
      static: {
        files: {
          "dist/app.min.js" : ["dist/app.js"]
        }
      }
    },

    /**
     * grunt-contrib-stylus
     */
    stylus: {
      options: {
        compress : false,
        use: [
          require('jeet'),
          function() {
            return require("autoprefixer-stylus")({
              browsers : ["last 2 versions", "ie 9"]
            });
          }
        ]
      },
      static: {
        files: {
          "dist/app.css": "src/styl/app.styl"
        }
      }
    },

    /**
     * grunt-csso
     */
    csso: {
      options: {
        report: "gzip"
      },
      static: {
        files: {
          "dist/app.min.css": ["dist/app.css"]
        }
      }
    },

    /**
     * grunt-contrib-copy
     */
    copy : {
      images : {
        files : [
          {expand: true, cwd: "src/img/", src: ["**"], dest: "dist/img/"}
        ]
      },
      fonts : {
        files : [
          {expand: true, cwd: "src/font/", src: ["**"], dest: "dist/font/"}
        ]
      }
    },

    /**
     * grunt-twig-render
     */
    twigRender: {
      static: {
        options: {
          client: false,
          pretty: false
        },
        files: [{
          data: "src/config/globals.json",
          cwd: "src/twig",
          src: ["*.twig"],
          dest: "dist",
          expand: true,
          ext: ".html"
        }]
      }
    },

    /**
     * grunt-contrib-watch
     */
    watch: {
      livereload : {
        options : {
          livereload : 8001
        },
        files: [
          "dist/**"
        ]
      },
      images : {
        files : ["src/img/**"],
        tasks : ["copy:images"]
      },
      fonts : {
        files : ["src/font/**"],
        tasks : ["copy:fonts"]
      },
      stylesheets : {
        files : ["src/styl/**"],
        tasks : ["stylus:static"]
      },
      twig : {
        files : ["src/twig/**"],
        tasks : ["twigRender:static"]
      },
      scripts : {
        files : ["src/js/**"],
        tasks : ["webpack:static"]
      }
    },

    /**
     * grunt-sftp-deploy
     */
    "sftp-deploy": {
      static: {
        auth: {
          host: "000.000.000.000",
          port: 0000,
          authKey: "key1"
        },
        cache: "sftpCache.json",
        src: "dist",
        dest: "/path/to/destination/directory",
        exclusions: ["dist/**/.DS_Store", "dist/**/Thumbs.db"],
        serverSep: "/",
        concurrency: 4,
        progress: true
      }
    }

  });

  grunt.registerTask("default", ["connect:dev", "copy:images", "copy:fonts", "twigRender:static", "stylus:static", "webpack:static", "watch"]);
  grunt.registerTask("dist", ["copy:images", "copy:fonts", "twigRender:static", "stylus:static", "csso:static", "webpack:static", "uglify:static"]);
  grunt.registerTask("stage",  ["dist", "sftp-deploy:static"]);

};
