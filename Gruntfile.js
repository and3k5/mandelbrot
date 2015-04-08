module.exports = function(grunt) {
    grunt.initConfig({
        projectName: 'Mandelbrot',
        jshint: {
            options: {
                unused:true
            },
            files: ['Gruntfile.js', 'src/Mandelbrot.js'],
        },
        uglify: {
            dist: {
                files: {
                    'src/Mandelbrot.min.js': ['src/Mandelbrot.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['jshint']);

    grunt.registerTask('build', ['jshint','uglify']);

};