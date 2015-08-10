module.exports = function(grunt) {

	grunt.initConfig({
	  "babel": {
	    options: {
	      sourceMap: true
	    },
	    dist: {
	      files: [{
          "expand": true,
          "cwd": "modules/",
          "src": ["**/*.js"],
          "dest": "dist/",
          "ext": ".js"
	      }]
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