/**
 * @file Gulp tasks for development and production
 * @todo Move to shareable module (upgrade to Gulp 4)
 */

import gulp from 'gulp';
import browsersync from 'browser-sync';
import fs from 'fs';
import critical from 'critical';
import del from 'del';
import sassdoc from 'sassdoc';
import jsonSass from 'json-sass';
import source from 'vinyl-source-stream';
import markdown from 'nunjucks-markdown';
import marked from 'marked';
import dotenv from 'dotenv';
import yargs from 'yargs';
import pngquant from 'imagemin-pngquant';

import { config } from './app_config.js';

const env = dotenv.config();
const browserSync = browsersync.create();
const $ = require('gulp-load-plugins')({
  rename: {
    'gulp-if': 'if'
  }
});

/* Flags for gulp cli */
const argv = yargs.argv;
let production = argv.production;
let staging = argv.staging;


// @@@ Depreciate
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


/**
 * Create .env file
 * @todo Make part of npm setup
 */
gulp.task('setup', () => {
  fs.createReadStream('.sample-env')
    .pipe(fs.createWriteStream('.env'));
});


/**
 * Generates a file of all the icons
 * @todo Move to nightshade-core or make this a more performant function that
 * runs when page is requested.
 * @todo remove dependency on createFile
 */
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


/**
 * Generates Sass color map from JSON file
 * @todo Move to nightshade-core
 */
gulp.task('colors-config', () => {
  fs.createReadStream(`${config.paths.nightshade}/color/lib/config.json`)
    .pipe(jsonSass({
      prefix: '$colors:',
    }))
    .pipe(fs.createWriteStream(`${config.paths.nightshade}/'color/lib/_config.scss`));
});


/**
 * Generates CSS from Sass with sourcemaps and vendor prefixing.
 */
gulp.task('sass', () => {
  return gulp.src(config.paths.src.styles)
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.autoprefixer())
    .pipe($.sourcemaps.write('./maps'))
    .pipe(gulp.dest(config.paths.tmp.styles))
    .pipe(browserSync.stream());
});


/**
 * Minify and rev CSS files to dist directory. Ignores files in maps/.
 */
gulp.task('optimize:css', () => {
  return gulp.src([
    config.paths.tmp.styles
  ])
  .pipe($.plumber())
  .pipe($.cssnano())
  .pipe($.rev())
  .pipe(gulp.dest(config.paths.build.styles))
  .pipe($.rev.manifest(`rev-manifest-css.json`))
  .pipe(gulp.dest(config.paths.manifests));
});


// Critical css
// @todo Cleanup paths in subsequent PR
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


/**
 * Optimize source SVG, PNG, GIF images. Moves all images to tmp.
 */
gulp.task('optimize:images', ['move:images'], () => {
  return gulp.src(config.paths.src.imagesOptim)
  .pipe($.imagemin({
    interlaced: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant({quality: '86'})]
  }))
  .pipe(gulp.dest(config.paths.tmp.images));
});


/**
 * Moves images that cannot be optimized to tmp directory
 */
gulp.task('move:images', () => {
  return gulp.src(config.paths.src.images)
    .pipe(gulp.dest(config.paths.tmp.images));
});


/**
 * Fingerprint all files in image directory. Save manifest file.
 */
gulp.task('rev:images', () => {
  return gulp.src(config.paths.tmp.images)
    .pipe($.rev())
    .pipe(gulp.dest(config.paths.build.images))
    .pipe($.rev.manifest(`rev-manifest-img.json`))
    .pipe(gulp.dest(config.paths.manifests));
});


/**
 * Compiles Nunjucks views to HTML.
 */
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

  return gulp.src(config.paths.src.views)
    .pipe($.plumber())
    .pipe($.nunjucksRender())
    .pipe(gulp.dest(config.paths.tmp.views));
});


/**
 * Precompiles Nunjucks templates for rendering via JS
 */
gulp.task('precompile', () => {
  return gulp.src(config.paths.src.tpls)
    .pipe($.plumber())
    .pipe($.nunjucks())
    .pipe($.concat('templates.js'))
    .pipe(gulp.dest(config.paths.tmp.scripts));
});


/**
 * Serve site for development
 * @todo Cleanup watch task paths?
 */
gulp.task('serve', () => {
  browserSync.init({
    logPrefix: 'Nightshade',
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

  gulp.watch([
    './node_modules/@casper/nightshade-core/src/**/*.json'
  ], ['colors-config']);
});


/**
 * Generate Sass documentation for Nightshade
 */
gulp.task('sassdoc', () => {
  return gulp.src([
    'app/**/*.scss',
    './node_modules/nightshade-core/src/**/*.scss'
  ])
  .pipe(sassdoc({
      dest: './dist/sassdoc'
  }));
});


/**
 * Clean tasks to remove files from tmp and dist directory
 */
gulp.task('clean:images', () => {
  del(config.paths.tmp.images);
});


/**
 * Task to publish dist directory to AWS.
 * To prepare an build run `gulp build:prod`
 */
gulp.task('publish', () => {

  /*
    Cloudflare/front set their own max-age headers so we don't have to set a
    far future expiry.
   */
  const day = 86400;
  const future = {'Cache-Control': 'max-age=600, must-revalidate, public' };
  const farFuture = {'Cache-Control': `max-age=${day * 365}, must-revalidate, public'`};
  const noCache = {'Cache-Control': 'no-cache'};

  const gzipTypes = '**/*.{html,css,js,svg,ico,json,txt}';
  const cacheBustedTypes = '**/*.{css,js}';
  const cachedTypes = '**/*.{gif,jpeg,jpg,png,svg,webp,ico,woff,woff2}';
  const noCacheTypes = '**/*.{html,json,xml,txt}';
  const otherTypes = [
    '**/*',
    `!${cacheBustedTypes}`,
    `!${cachedTypes}`,
    `!${noCacheTypes}`
  ];

  // Creates a new publisher using S3 options
  // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property
  const publisher = $.awspublish.create({
    params: {
      region: production ? config.s3.production.region : config.s3.staging.region,
      Bucket: production ? config.s3.production.bucket : config.s3.staging.bucket
    },
      "accessKeyId": env.S3_ACCESSID,
      "secretAccessKey": env.S3_KEY
  });

  return gulp.src(config.paths.build.base)
    .pipe($.plumber())
    .pipe($.if(gzipTypes, $.awspublish.gzip()))
    .pipe($.if(cacheBustedTypes, publisher.publish(future)))
    .pipe($.if(cachedTypes, publisher.publish(future)))
    .pipe($.if(noCacheTypes, publisher.publish(future)))
    .pipe($.if(otherTypes, publisher.publish()))
    .pipe($.awspublish.reporter());
});


/**
 * Task to start the application (gulp)
 */
gulp.task('default', [
  'precompile',
  'compile',
  'sass',
  'optimize:images',
  'sassdoc',
  'serve'
]);


/**
 * Build task
 * @todo Add build:prod
 */
gulp.task('build', ['critical']);
