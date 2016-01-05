module.exports = function(grunt) {

	grunt.initConfig({
	  babel: {
      options: {
        presets: ['es2015']
      },
	    background: {
        options: {
          sourceMap: false
        },
	      files: {
          'client/background.js': 'src/background.js'
        }
	    },
      client: {
        options: {
          sourceMap: true
        },
        files: [{
          "expand": true,
          "cwd": "src/",
          "src": ["engine/**/*.js", "index.js"],
          "dest": "./client/",
          "ext": ".js"
        }]
      },
      react: {
        options: {
          plugins: ['transform-react-jsx'],
          presets: ['es2015', 'react', 'stage-1'],
          sourceMap: true
        },
        files: [{
          expand: true,
          cwd: 'src/', // Custom folder
          src: ['**/*.jsx'],
          dest: './client/', 
          ext: '.js'
        }]
      },
      db: {
        options: {
          sourceMap: true
        },
        files: [{
          "expand": true,
          "cwd": "src/db/",
          "src": ["**/*.js"],
          "dest": "./client/db/",
          "ext": ".js"
        }]
      }
	  },
    eslint: {
      target: ["./src/**/*.js"]
    },
    jade: {
      release: {
        options: {
          data: {
            debug: false
          },
          pretty: true
        },
        files: {
          "client/static/html/index.html": ["src/views/content.jade"],
          "client/static/html/folders.html": ["src/views/folders.jade"]
        },
        compile: {
          expand: true
        }
      }
    },
    copy: {
      json: {
        files: [{
          expand: true, 
          cwd: 'src/static/',
          src: ['json/*.json'], 
          dest: 'client/static/', 
          filter: 'isFile'
        }]
      },
      css: {
        files: [{
          expand: true,
          cwd: 'src/static/',
          src: ['css/**/*.css'],
          dest: 'client/static/',
          ext: '.min.css'
        }]
      },
      js: {
        files: [{
          expand: true,
          cwd: 'src/static/',
          src: ['js/**/*.js'],
          dest: 'client/static/',
          ext: '.js'
        }]
      },
    },
    clean: {
      tmp: ["client/**/*", "!client/package.json", "!client/node_modules/**"]
    },
	  watch: {
      options: {
        spawn: false
      },
	  	client: {
	  		files: ["engine/**/*.js", "src/index.js"],
	  		tasks: ["babel:client"]
	  	},
      background: {
        files: ["src/background.js"],
        tasks: ["babel:background"]
      },
      jsx: {
        files: ["src/components/**/*.jsx"],
        tasks: ["babel:react"]
      }, 
      db: {
        files: ["src/db/**/*.js"],
        tasks: ["babel:db"]
      },
      jade: {
        files: ["./src/**/*.jade"],
        tasks: ["jade"]
      },
      js: {
        files: ["./src/static/js/*.js"],
        tasks: ["copy:js"]
      },
      json: {
        files: ["./src/static/json/*.json"],
        tasks: ["copy:json"]
      },
      css: {
        files: ["./src/static/css/*.css"],
        tasks: ["copy:css"]
      }
	  }
	});
  grunt.loadNpmTasks("grunt-babel");
	grunt.loadNpmTasks("grunt-eslint");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-jade");
	grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-clean");

	grunt.registerTask("default", ["clean", "babel", "jade", "copy", "watch"]);

};