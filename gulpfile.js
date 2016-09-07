'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var bower = require('gulp-bower');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify');
var pump = require('pump');

gulp.task('sass', function () {
  return gulp.src('app/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('app/styles/*.scss', ['sass']);
});

gulp.task('bower', function() {
  return bower();
});

gulp.task('compress', function (cb) {
  pump([
        gulp.src('app/**/*.js'),
        uglify(),
        gulp.dest('dist')
    ],
    cb
  );
});

gulp.task('index', function () {
  var target = gulp.src('app/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(['dist/**/*.js', 'dist/**/*.css'], {read: false});
 
  return target.pipe(inject(sources))
    .pipe(gulp.dest('app'));
});



gulp.task('default', ['sass', 'bower','compress', 'index']);



 
