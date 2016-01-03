// 'use strict';

// require('babel-core/register');

const gulp = require('gulp');
const fs = require('fs');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const nunjucks = require('gulp-nunjucks');
const nunjucksRender = require('gulp-nunjucks-render');
// const mocha = require('gulp-mocha');
const critical = require('critical');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const rename = require('gulp-rename');

const file_paths =  {
    'base': './app',
    'dest': './dist',
    'css': './dist/assets/css/',
    'local_sass': './app/assets/scss/',
    'module_sass': './app/modules/',
    'views': './app/views/'
};


// Run tests
// gulp.task('test', () => {
//   return gulp.src('./test/dropdown.js', {read: false})
//     .pipe(mocha({
//       reporter: 'nyan'
//   }));
// });


// Compile Sass
gulp.task('sass', () => {
  return gulp.src(['./app/assets/scss/**/*.scss', './app/modules/**/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename('application.css'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(file_paths.css))
    .pipe(browserSync.stream());
});


// Critical css
gulp.task('critical', ['sass', 'compile'], (cb) =>  {
  critical.generate({
    inline: true,
    base: 'dist/',
    css: ['dist/css/application.css'],
    src: 'index.html',
    dest: 'dist/index-critical.html',
    minify: true,
    width: 320,
    height: 480
  });
});


// Compile templates to html
gulp.task('compile', () => {
    nunjucksRender.nunjucks.configure(['./app/views'], {watch: false});
    return gulp.src('./app/views/**/*.html')
      .pipe(nunjucksRender())
      .pipe(gulp.dest('./dist'));
});


// Precompile templates to js for rendering in the browser
gulp.task('precompile', () => {
  return gulp.src(['./app/templates/**/*.html', './app/modules/**/*.html'])
    .pipe(nunjucks())
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./dist/assets/js'));
});


// Watch templates
gulp.task('html-watch', ['compile', 'precompile'], browserSync.reload);

// Static server
// @TODO fix sha error and set https: true,
gulp.task('browser-sync', () => {
    browserSync.init({
        logPrefix: 'Ando',
        server: {
          baseDir: ['./app', './dist', './']
        },
        middleware: function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            next();
        }
      });


  gulp.watch(['app/assets/js/**/*.js', 'app/dist/**/*.js' ], browserSync.reload);
  gulp.watch(['./app/assets/scss/**/*.scss', './app/modules/**/*.scss' ], ['sass']);
  gulp.watch(['app/modules/**/*.html', 'app/templates/**/*.html', 'dist/**/*.html'], ['html-watch']);
    // gulp.watch(['test/**'], ['test']);

});


// Start task (default gulp)
gulp.task('default', ['compile', 'precompile', 'sass', 'browser-sync']);


// Build task
gulp.task('build', ['critical']);
