module.exports = function(grunt) {

	grunt.initConfig({
	  "babel": {
	    options: {
	      sourceMap: true
	    },
	    dist: {
	      files: {
	        "dist/index.js": "modules/index.js",
	        "dist/logic.js": "modules/logic.js"
	      }
	    }
	  },
	  watch: {
	  	babel: {
	  		files: ['./modules/*.js'],
	  		tasks: ['babel'],
	  		options: {
          spawn: false,
        },
	  	}
	  }
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-babel');
	grunt.registerTask("default", ["babel", "watch"]);


};