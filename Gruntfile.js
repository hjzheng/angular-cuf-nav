module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);
 
 // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> by hjzheng <%= grunt.template.today("yyyy-mm-dd") %> */\n',
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      build: {
        src: 'tmp/<%= pkg.name %>.all.js',
        dest: 'build/js/<%= pkg.name %>.min.js'
      }
    },
    cssmin: {
      options: {
        banner: '<%= banner %>' 
      },
      build: {
        src: 'src/css/<%= pkg.name %>.css',
        dest: 'build/css/<%= pkg.name %>.min.css'
      }   
    },
    html2js: {
      options: {
        module: 'cuf-nav-template'
      },
      main: {
        src: ['src/template/*.html'],
        dest: 'tmp/templates.js'
      }
    },
    copy: {
      main: {
         files:[
           {expand: true, cwd: 'src/js', src: ['*.js'], dest: 'tmp/'}
         ]
      }
    },
    concat: {
      main: {
       src: ['tmp/templates.js', 'tmp/<%= pkg.name %>.js'],
       dest: 'tmp/<%= pkg.name %>.all.js'
      }  
    }, 
    clean: {
      all: ['tmp', 'build/*'],
      tmp: ['tmp']
    },
    //use ngmin for uglify angular bug
    ngmin: {
      main: {
        src: 'tmp/<%= pkg.name %>.all.js',
        dest: 'tmp/<%= pkg.name %>.all.js'
      }
    }
  });

  //Load the plugin that provides the task.
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-cssmin');
  
  // Default task(s).
  grunt.registerTask('default', ['clean:all', 'copy:main', 'html2js:main', 'concat:main', 'ngmin', 'uglify', 'cssmin']);

};
