/**
 * @file Configuration for application
 * @module config
 * @todo Move to nightshade-core
 */


/* Convinence object for long directory names  */
const dir = {
  nightshade: `./node_modules/@casper/nightshade-core/src`
}

export const config = {
  paths: {
    nightshade: `${dir.nightshade}`,
    manifest: `./manifests`,
    tmp: {
      base: `./.tmp`,
      styles: './.tmp/assets/css',
      images: `./.tmp/assets/img`,
      scripts: `./.tmp/assets/js`,
      views: `./.tmp/views/`,
    },
    src: {
      styles: `app/assets/scss/**/*.scss`,
      views: `./app/views/**/[^_]*.html`,
      tpls: [
        `./app/views/**/_*.html`,
        `${dir.nightshade}/**/*.html`
      ],
      imagesOptim: `./app/assets/img/**/*.{svg,png,gif}`,
      images: `./app/assets/img/**/!(*.svg|*.png|*.gif)`,
    },
    build: {
      base: `./dist/**/*`,
      styles: `./dist/static-assets/css`,
      images: `./dist/static-assets/img`,
      scripts: `./dist/static-assets/js`,
    },
  },
  s3: {
    staging: {
      region: `website-us-east-1`,
      bucket: `staging-nightshade.rocks`,
    },
    production: {
      region: `website-us-east-1`,
      bucket: `nightshade.rocks`,
    },
  },
};
