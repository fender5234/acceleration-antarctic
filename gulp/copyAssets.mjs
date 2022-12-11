import gulp from 'gulp';

const isDev = process.env.NODE_ENV === 'development';

const SOURCES = ['source/**.html', 'source/fonts/**', 'source/img/**'];
const IMAGE_SOURCES = ['source/img/**/*.{png,jpg,webp}'];
const PP_SOURCES = 'source/pixelperfect/**/*.{png,jpg,webp}';
if (isDev) {
  SOURCES.push(PP_SOURCES);
  IMAGE_SOURCES.push(PP_SOURCES);
}

const copySvg = () => gulp.src('source/img/**/*.svg', {base: 'source'}).pipe(gulp.dest('build'));

const copyImages = () => gulp.src(IMAGE_SOURCES, {base: 'source'}).pipe(gulp.dest('build'));

const copyFavicons = () => gulp.src('source/favicon/**').pipe(gulp.dest('build'));

const copy = () =>
  gulp
    .src(SOURCES, {
      base: 'source',
    })
    .pipe(gulp.dest('build'));

export {copy, copyFavicons, copyImages, copySvg};
