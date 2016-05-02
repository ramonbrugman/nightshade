const dir = {
  tmp: `./.tmp`,
  src: `./app`,
  build: `./dist`,
  buildAssets: `/static-assets`,
  manifest: `./manifests`
}

const paths = {
  images: `assets/img`,
  js: `assets/js`
}

export const config = {
  paths: {
    tmp: {
      base: `${dir.tmp}`,
      styles: `${dir.tmp}/assets/css/*.css`,
      images: `${dir.tmp}/assets/img`,
      scripts: `${dir.tmp}/assets/js`,
      views: `${dir.tmp}/views/`,
    },
    src: {
      base: `${dir.src}`,
      styles: [`${dir.src}/assets/scss/**/*.scss`],
    },
    build: {
      base: `${dir.build}`,
      styles: `${dir.build}${dir.buildAssets}/css`,
      images: `${dir.build}${dir.buildAssets}/img`,
      scripts: `${dir.build}${dir.buildAssets}/js`,
      views: `${dir.build}`,
    },
    manifests: {
      base: `${dir.manifest}/`,
      styles: `rev-manifest-css.json`,
      images: `rev-manifest-img.json`,
      scripts: `rev-manifest-js.json`,
    },
  },
  files: {
    tmp: {
      images: `${dir.tmp}/${paths.images}/*`
    },
    src: {
      imagesOptim: `${dir.src}/${paths.images}/**/*.{svg,png,gif}`,
      images: `${dir.src}/${paths.images}/**/!(*.svg|*.png|*.gif)`
    },
  },
  "staging": {
    "s3": {
      "region": "website-us-east-1",
      "bucket": "staging-nightshade.rocks"
    }
  },
  "production": {
    "s3": {
      "region": "website-us-east-1",
      "bucket": "nightshade.rocks"
    }
  }
};

