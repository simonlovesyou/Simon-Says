module.exports = function(grunt) {

	grunt.initConfig({
	  "babel": {
	    options: {
	      sourceMap: true
	    },
	    dist: {
	      files: {
	        "index_c.js": "index.js",
	        "dirsort_c.js": "logic.js"
	      }
	    }
	  },
	  watch: {
	  	babel: {
	  		files: ['./logic.js', './index.js'],
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