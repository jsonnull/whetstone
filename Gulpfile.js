var plumber = require('gulp-plumber')
var babel = require('gulp-babel')
var gulp = require('gulp')
var gutil = require('gulp-util')
var rename = require('gulp-rename')
var path = require('path')

var scripts = [
  './packages/*/src/**/*.js',
]
var dest = 'packages'

gulp.task('default', ['build'])

gulp.task('build', function () {
  return gulp.src(scripts)
    .pipe(plumber({
      errorHandler: function (err) {
        gutil.log(err.stack)
      }
    }))
    .pipe(babel())
    .pipe(rename(function (file) {
      // Rename dirname from package/src to package/lib
      file.dirname = file.dirname.replace(/src$/, 'lib')
      return file;
    }))
    .pipe(gulp.dest(dest))
})
