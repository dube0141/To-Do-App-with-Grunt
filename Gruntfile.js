/*global module:false*/
module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		bower: {
			install: {}
		},
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
		// Task configuration.
		concat: {
			dist: {
				src: ['www/js/*.js'],
				dest: 'dist/concat.js'
			}
		},
		uglify: {
			dist: {
				src: '<%= concat.dist.dest %>',
				dest: 'dist/concat.min.js'
			}
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: false,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				unused: true,
				boss: true,
				eqnull: true,
				globals: {
					"angular": false,
					"console": true,
					"cordova": true,
					"window": true,
					"StatusBar": true,
					"localStorage": true,
					"navigator": true
				}
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			src_js: {
				src: ["dist/concat.js"]
			},
		},
		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			lib_test: {
				files: '<%= jshint.lib_test.src %>',
				tasks: ['jshint:lib_test', 'qunit']
			}
		},
		cordovacli: {
			options: {
				cli: 'cordova' // cca or cordova
			},
			cordova: {
				options: {
					command: ['platform', 'build'],
					platforms: ['android'],
					path: 'plugins'
				}
			},
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-cordovacli');

	// Default task.
	grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};