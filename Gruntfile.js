module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**'],
            dest: 'build'
          }
        ]
      }
    },
    clean: [
      'build',
      'release'
    ],
    compress: {
      main: {
        options: {
          mode: 'zip',
          archive: 'release/<%= pkg.name %>' + '-' + '<%= pkg.version %>' + '.xpi'
        },
        expand: true,
        cwd: 'build',
        src: ['**'],
        dest: ''
      }
    },
    watch: {
    scripts: {
      files: ['src/*.js'],
      tasks: ['clean', 'copy'],
      options: {
        spawn: false,
      },
    }
}

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');


  grunt.registerTask('default', ['clean', 'copy']);
  grunt.registerTask('release', ['clean', 'copy', 'compress']);
};
