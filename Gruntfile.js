module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-bower-task');

  grunt.initConfig({
    compass: {
      dist: {
        files: [{
          expand: true,
          src: ['./sass/*.sass'],
          dest: './css',
          ext: '.css'
        }]
      }
    },
    watch: {
      css: {
        files: './sass/*.sass',
        tasks: ['compass'],
        options: {
          livereload: true,
        },
      },
    },
		bower: {
      install: {
        options: {
          targetDir: './demo/lib',
          layout: 'byType',
          install: true,
          verbose: true,
          cleanBowerDir: true
        }
      }
		}
  });

  grunt.registerTask('default', ['watch']);

};