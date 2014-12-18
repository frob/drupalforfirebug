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
          },
          {
            expand: true,
            cwd: 'templates/firefox/',
            src: ['package.json'],
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
    sed: {
      name: {
        path: 'build/',
        pattern: '%PKG.NAME%',
        replacement: '<%= pkg.name %>',
        recursive: true
      },
      title: {
        path: 'build/',
        pattern: '%PKG.TITLE%',
        replacement: '<%= pkg.title || pkg.name %>',
        recursive: true
      },
      description: {
        path: 'build/',
        pattern: '%PKG.DESCRIPTION%',
        replacement: '<%= pkg.description %>',
        recursive: true
      },
      homepage: {
        path: 'build/',
        pattern: '%PKG.HOMEPAGE%',
        replacement: '<%= pkg.homepage || "" %>',
        recursive: true
      },
      author: {
        path: 'build/',
        pattern: '%PKG.AUTHOR%',
        replacement: '<%= pkg.author.name %>',
        recursive: true
      },
      icon: {
        path: 'build/',
        pattern: '%PKG.ICON%',
        replacement: '<%= pkg.icon || "icon.png" %>',
        recursive: true
      },
      license: {
        path: 'build/',
        pattern: '%PKG.LICENSE%',
        replacement: '<%= _.pluck(pkg.licenses, "type").join(", ") %>',
        recursive: true
      },
      version: {
        path: 'build/',
        pattern: '%PKG.VERSION%',
        replacement: '<%= pkg.version %>',
        recursive: true
      }
    },
    watch: {
      scripts: {
        files: ['src/*.js'],
        tasks: ['clean', 'copy'],
        options: {
          spawn: false,
        },
      },
    },
    "mozilla-addon-sdk" : {
      'release': {
        options: {
          revision: "1.16"
        }
      }
    },
    "mozilla-cfx-xpi" : {
      'release': {
        options: {
          "mozilla-addon-sdk": "release",
          extension_dir: "build",
          dist_dir: "release/build",
          // --output-file is an experimental option, not guaranteed to exist.
          // @see https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/cfx#Experimental_Options_3
          arguments: "--output-file=<%= pkg.name %>.xpi"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-sed');
  grunt.loadNpmTasks('grunt-mozilla-addon-sdk');


  grunt.registerTask('default', ['clean', 'copy', 'sed']);
  grunt.registerTask('release', ['clean', 'copy', 'sed', 'compress']);
  grunt.registerTask('build', 'Builds the Firefox extension.', ['mozilla-cfx-xpi']);

  // Autoload tasks.
  // Firefox.
  // @see https://addons.mozilla.org/en-US/firefox/addon/autoinstaller/
  grunt.registerTask('autoload', 'Loads the XPI extension into Firefox.', function () {
    var done = this.async();
    var xpi = 'release/' + grunt.template.process('<%= pkg.name %>-<%= pkg.version %>.xpi');
    grunt.util.spawn({
      cmd: 'wget',
      args: [
        '--post-file=' + xpi,
        'http://localhost:8888'
      ],
      opts: !grunt.option('debug') ? {} : {
        stdio: 'inherit'
      }
    },
    function (error, result, code) {
      if (code !== 8) {
        return grunt.warn('Auto-loading ' + xpi + ' failed:\n\n' +
          code + ': ' + error + '\n\n' +
          'Ensure you have the AutoInstaller extension installed in Firefox:\n' +
          'https://addons.mozilla.org/en-US/firefox/addon/autoinstaller/\n\n'
        );
      }
      grunt.log.ok('Auto-loaded ' + xpi + ' into Firefox.');
      done();
    });
  });
};
