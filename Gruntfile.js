const matchdep = require('matchdep')
const mergeFiles = require('./grunt-scripts/mergeFiles')

module.exports = function (grunt) {
  matchdep.filterAll(['grunt-*', '!grunt-cli']).forEach(grunt.loadNpmTasks)
  mergeFiles(grunt)

  grunt.initConfig({
    screeps: {
      options: {
        email: 'Henrikcoll',
        password: 'password123',
        branch: 'default',
        ptr: false,
        server: {
          host: '192.168.0.20',
          port: 21025,
          http: true
        }
      },
      dist: {
        src: ['dist/*.js']
      }
    },

    copy: {
      main: {
        expand: true,
        flatten: true,
        filter: 'isFile',
        cwd: 'dist/',
        src: '**',
        dest: 'Update This Path'
      }
    }
  })

  grunt.registerTask('main', ['merge', 'write'])
  grunt.registerTask('sandbox', ['merge', 'write-private'])
  grunt.registerTask('merge', 'mergeFiles')
  grunt.registerTask('write', 'screeps')
  grunt.registerTask('write-private', 'copy')
}
