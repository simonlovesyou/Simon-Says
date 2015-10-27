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
          "dest": "client/logic",
          "ext": ".js"
	      }]
	    },
      client: {
        options: {
          sourceMap: true
        },
        files: [{
          "expand": true,
          "cwd": "modules/client/assets/js/",
          "src": ["**/*.js"],
          "dest": "modules/client/assets/js/tmp/",
          "ext": ".js"
        }]
      }
	  },
	  watch: {
	  	background: {
	  		files: ["./modules/background/**/*.js"],
	  		tasks: ["eslint", "babel"],
	  		options: {
          spawn: false
        },
	  	}
	  },
	  eslint: {
	  	target: ['./modules/*.js']
	  }
	});

	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-babel');
	grunt.registerTask("default", ["babel", "eslint", "watch"]);


};