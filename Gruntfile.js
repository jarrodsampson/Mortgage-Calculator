module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: false
            },
            build: {
                src: ['assets/js/app.js','assets/js/main.js'],
                dest: 'build/assets/js/app.js'
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'assets/js/*.js']
        },
        copy: {
            main: {
                files: [
                    {expand: true, src: ['*.html'], dest: 'build/'},
                    {expand: true, src: ['assets/images/**/*'], dest: 'build/'},
                    {expand: true, src: ['assets/js/libs/**/*'], dest: 'build/'},
                    {expand: true, src: ['assets/css/libs/**/*'],  dest: 'build/'},
                    {expand: true, src: ['assets/fonts/**/*'],  dest: 'build/'}
                ]
            }
        },
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'build/assets/css/universal.css': ['assets/css/universal.sass'],
                    'build/assets/css/main.css': ['assets/css/main.sass']
                }
            }
        },
        watch: {
            scripts: {
                files: ['assets/js/*.js'],
                tasks: ['jshint','uglify'],
                options: {
                    spawn: false
                }
            },
            scripts2: {
                            files: ['*.html'],
                            tasks: ['copy'],
                            options: {
                                spawn: false
                 }
            },
                         scripts3: {
                                         files: ['assets/css/*.sass'],
                                         tasks: ['sass','cssmin'],
                                         options: {
                                             spawn: false
                              }
                         }
        },
        cssmin: {
            dist: {
                options: {
                    banner: '/*! MyLib.js 1.0.0 | Aurelio De Rosa (@AurelioDeRosa) | MIT Licensed */'
                },
                files: {
                    'build/assets/css/style.min.css': ['build/assets/css/*.css']
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'assets/views/',
                    src: '**/*.html',
                    dest: 'build/'
                }]
            }
        },
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: 'assets/images',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'build/assets/images/'
                }]
            }
        },
        clean: ['build/']
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'uglify','jshint','copy','sass','cssmin','htmlmin','imagemin']);

};