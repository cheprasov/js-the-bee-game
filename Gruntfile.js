module.exports = function(grunt) {

    grunt.initConfig({

        browserify: {
            build: {
                options: {
                    transform: [
                        ["babelify", {"presets": ["es2015"]}]
                    ]
                },
                files: {
                    './build/game/js/app.js': ['./src/**/*.js']
                }
            },
            tests: {
                options: {
                    transform: [
                        ["babelify", {"presets": ["es2015"]}]
                    ]
                },
                files: [{
                    "expand": true,
                    "src": ["./test/**/*.test.js"],
                    "dest": "build/",
                    "ext": ".test.js"
                }]
            }
        },

        shell: {
            cleanJs: {
                command: 'rm -f -r ./build/game/js/*.js'
            },
            cleanCss: {
                command: 'rm -f -r ./build/game/css/*.css'
            },
            cleanHtml: {
                command: 'rm -f -r ./build/game/**/*.html'
            },
            cleanImgs: {
                command: 'rm -f -r ./build/game/imgs/*'
            },
            cleanMp3: {
                command: 'rm -f -r ./build/game/mp3/*'
            },
            cleanTests: {
                command: 'rm -f -r ./build/test/*'
            }
        },

        concat: {
            css: {
                files: {
                    'build/game/css/style.css': ['files/**/*.css']
                }
            }
        },

        copy: {
            html: {
                expand: true,
                flatten: true,
                filter: 'isFile',
                src: './files/index.html',
                dest: './build/game'
            },
            imgs: {
                expand: true,
                flatten: true,
                filter: 'isFile',
                src: './files/imgs/*',
                dest: './build/game/imgs'
            },
            mp3: {
                expand: true,
                flatten: true,
                filter: 'isFile',
                src: './files/mp3/*',
                dest: './build/game/mp3'
            }
        },

        watch: {
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['update-js'],
                options: {
                    spawn: false
                }
            },
            styles: {
                files: ['files/css/*.css'],
                tasks: ['update-css'],
                options: {
                    spawn: false
                }
            },
            html: {
                files: ['files/**/*.html'],
                tasks: ['update-html'],
                options: {
                    spawn: false
                }
            },
            imgs: {
                files: ['files/imgs/*'],
                tasks: ['update-imgs'],
                options: {
                    spawn: false
                }
            },
            mp3: {
                files: ['files/mp3/*'],
                tasks: ['update-mp3'],
                options: {
                    spawn: false
                }
            }
            ,
            tests: {
                files: ['test/**/*'],
                tasks: ['build-tests'],
                options: {
                    spawn: false
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-babel');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('update-js', ['shell:cleanJs', 'browserify:build']);
    grunt.registerTask('update-css', ['shell:cleanCss', 'concat:css']);
    grunt.registerTask('update-html', ['shell:cleanHtml', 'copy:html']);
    grunt.registerTask('update-imgs', ['shell:cleanImgs', 'copy:imgs']);
    grunt.registerTask('update-mp3', ['shell:cleanMp3', 'copy:mp3']);

    grunt.registerTask('build-tests', ['shell:cleanTests', 'browserify:tests']);

    grunt.registerTask('default', ['update-js', 'update-css', 'update-html', 'update-imgs', 'update-mp3', 'watch']);

};
