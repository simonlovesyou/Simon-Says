module.exports = function(grunt) {

	grunt.initConfig({
	  "babel": {
	    background: {
        options: {
          sourceMap: false
        },
	      files: [{
          "expand": true,
          "cwd": "modules/background/",
          "src": ["**/*.js"],
          "dest": "client/logic/background",
          "ext": ".js"
	      }]
	    },
      client: {
        options: {
          sourceMap: true
        },
        files: [{
          "expand": true,
          "cwd": "modules/client/app/",
          "src": ["**/*.js"],
          "dest": "client/app/",
          "ext": ".js"
        }]
      }
	  },
    eslint: {
      target: ["./modules/**/*.js"]
    },
    uglify: {
      client: {
        options: {
          sourceMapIncludeSources: true,
          sourceMap: function(path) { return path.replace(/.js/,".map")} 
        },
        files: [{
          expand: true,
          cwd: "client/app/",
          src: "**/*.js",
          dest: "client/app/",
          ext: ".min.js"
        }]
      }
    },
    jade: {
      debug: {
        options: {
          data: {
            debug: true
          },
          pretty: true
        },
        files: {
          "debug/index.html": ["modules/client/app/index/content.jade"],
          "debug/folders.html": ["modules/client/app/folders/folders.jade"]
        }
      },
      release: {
        options: {
          data: {
            debug: false
          },
          pretty: false
        },
        files: {
          "client/app/index/index.html": ["modules/client/app/index/content.jade"],
          "client/app/folders/folders.html": ["modules/client/app/folders/folders.jade"]
        },
        compile: {
          expand: true
        }
      }
    },
    jsonmin: {
      build: {
        options: {
          stripWhiteSpace: true,
          stripComments: true
        },
        files: {
          "client/config/app_configuration.min.JSON": "modules/JSON/app_configuration.JSON",
          "client/config/window_configuration.min.JSON": "modules/JSON/window_configuration.JSON"
        }
      }
    },
    cssmin: {
      main: {
      files: [{
        expand: true,
        cwd: 'modules/client/app/',
        src: ['**/*.css'],
        dest: 'client/app',
        ext: '.min.css'
      }]
      }
    },
    clean: {
      tmp: ['modules/client/assets/js/tmp']
    },
	  watch: {
	  	background: {
	  		files: ["./modules/background/**/*.js"],
	  		tasks: ["eslint", "babel"],
	  		options: {
          spawn: false
        },
	  	},
      client: {
        files: ["./modules/client/**/*.js"],
        tasks: ["eslint", "babel:client", "concat", "clean"],
        options: {
          spawn: false
        },
      },
      jade: {
        files: ["./modules/**/*.jade"],
        tasks: ["jade"],
        options: {
          spawn: false
        }
      },
      json: {
        files: ["./modules/**/*.JSON"],
        tasks: ["jsonmin"],
        options: {
          spawn: false
        }
      },
      css: {
        files: ["./modules/**/*.css"],
        tasks: ["cssmin"],
        options: {
          spawn: false
        }
      }
	  }
	});
  grunt.loadNpmTasks("grunt-babel");
	grunt.loadNpmTasks("grunt-eslint");
  grunt.loadNpmTasks("grunt-jsonmin");
  grunt.loadNpmTasks("grunt-contrib-jade");
	grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.registerTask("default", ["clean", "eslint", "babel", "jade", "jsonmin", "cssmin", "uglify", "watch"]);

};