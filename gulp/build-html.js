//@flow
'use strict';

const gulp = require('gulp-help')(require('gulp'));
const util = require('gulp-util');

gulp.task('build:html', 'Build ./assets/pages/*.jinja into production HTML files', () => {
  const {Environment, FileSystemLoader} = require('nunjucks');
  const env = new Environment([
    new FileSystemLoader('assets/pages'),
    new FileSystemLoader('assets/layouts')
  ]);

  return gulp.src('assets/pages/**/*.jinja')
    .pipe(require('gulp-nunjucks').compile({}, {env}))
    .pipe(require('gulp-htmlmin')({
      collapseWhitespace: true
    }))
    .pipe(require('gulp-rename')({
      extname: '.html'
    }))
    .on('error', util.log)
    .pipe(gulp.dest('public'));
});