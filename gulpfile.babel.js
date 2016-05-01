import gulp from 'gulp';
import browsersync from 'browser-sync';
import fs from 'fs';
import critical from 'critical';
import sassdoc from 'sassdoc';
import jsonSass from 'json-sass';
import source from 'vinyl-source-stream';
import markdown from 'nunjucks-markdown';
import marked from 'marked';

const browserSync = browsersync.create();
const $ = require('gulp-load-plugins')();

const file_paths =  {
    'base': './app',
    'dest': './dist',
    'css': './dist/assets/css/',
    'local_sass': './app/assets/scss/',
    'module_sass': './app/modules/',
    'views': './app/views/',
    'nightshade': './node_modules/@casper/nightshade-core/src/'
};

// @@@ Maybe pull these out into utilities
const createFile = (name, data) => {
  fs.writeFile(`${name}`, data , (err) => {
    if (err) return console.log(err);
    console.log(`${name} successfully created`)
  });
}

// Run tests
// gulp.task('test', () => {
//   return gulp.src('./test/dropdown.js', {read: false})
//     .pipe($.mocha({
//       reporter: 'nyan'
//   }));
// });


// Generates a file of all the icons
gulp.task('icons-config', () => {

  const dir = './node_modules/@casper/nightshade-icons/lib/storefront';
  const icons = [];

  return fs.readdir(dir, (err, files) => {
      if (err) throw err;

      // Bit naughty but since all of these are .svg, we'll gamble
      for (let file of files) {
        icons.push(file.slice(0, -4));
      }

      createFile(`./app/views/icons/icons_list.js`, `export const icons_list = ` + JSON.stringify(icons));
    });
});

// Generate colors config
gulp.task('colors-config', () => {
  fs.createReadStream(file_paths.nightshade + 'color/lib/config.json')
    .pipe(jsonSass({
      prefix: '$colors:',
    }))
    .pipe(fs.createWriteStream(file_paths.nightshade + 'color/lib/_config.scss'));
});


// Compile Sass
gulp.task('sass', () => {
  return gulp.src(['./app/assets/scss/**/*.scss'])
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.autoprefixer())
    .pipe($.sourcemaps.write('./maps'))
    .pipe(gulp.dest(file_paths.css))
    .pipe(browserSync.stream());
});


// Critical css
gulp.task('critical', ['sass', 'compile'], (cb) =>  {
  critical.generate({
    inline: true,
    base: 'dist/',
    css: ['dist/assets/css/application.css'],
    src: 'index.html',
    dest: 'dist/index-critical.html',
    minify: true,
    width: 320,
    height: 480
  });
});


// Compile templates to html
gulp.task('compile', () => {
  const env = $.nunjucksRender.nunjucks.configure(['./app/views/', './node_modules/@casper/'], {watch: false});

  markdown.register(env, marked);

  marked.setOptions({
    gfm: true,
    tables: true,
    breaks: false,
    pendantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
  });

    return gulp.src(['./app/views/**/[^_]*.html'])
      .pipe($.plumber())
      .pipe($.nunjucksRender())
      .pipe(gulp.dest('./dist'));
});


// Precompile templates to js for rendering in the browser
gulp.task('precompile', () => {
  return gulp.src([
    './app/**/_*.html',
    './node_modules/@casper/nightshade-core/src/**/*.html'
    ])
    .pipe($.plumber())
    .pipe($.nunjucks())
    .pipe($.concat('templates.js'))
    .pipe(gulp.dest('./dist/assets/js'));
});


// Static server
// @TODO fix sha error and set https: true,
gulp.task('browser-sync', () => {
  browserSync.init({
      logPrefix: 'Ando',
      browser: false,
      reloadDelay: 100,
      server: {
        baseDir: ['./app', './dist', './', './node_modules/@casper']
      },
      middleware: function (req, res, next) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          next();
      }
    });


  gulp.watch([
    'app/assets/js/**/*.js',
    'app/views/**/*.js',
    'app/dist/**/*.js',
    './node_modules/@casper/nightshade-core/src/**/*.js'
     ]).on('change', browserSync.reload);

  gulp.watch([
    './app/assets/scss/**/*.scss',
    './app/views/**/*.scss',
    './node_modules/@casper/nightshade-core/src/**/*.scss'
    ], ['sass']);

  gulp.watch([
    './app/views/**/*.html',
    './node_modules/@casper/nightshade-core/src/**/*.html'
    ], ['precompile', 'compile']).on('change', browserSync.reload);

    // gulp.watch(['test/**'], ['test']);

  gulp.watch([
    './node_modules/@casper/nightshade-core/src/**/*.json'
    ], ['colors-config']);

});


//Sassdoc task
gulp.task('sassdoc', () => {
  return gulp.src([
    'app/**/*.scss',
    './node_modules/nightshade-core/src/**/*.scss'
  ])
  .pipe(sassdoc({
      dest: './dist/sassdoc'
  }));
});

// clean tasks
// @@@ TODO: tasks to remove generated files (Dist)


// Start task (default gulp)
gulp.task('default', ['precompile', 'compile', 'sass', 'sassdoc', 'browser-sync']);


// Build task
gulp.task('build', ['critical']);
