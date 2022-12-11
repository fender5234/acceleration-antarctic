import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'gulp-csso';
import gcmq from 'gulp-group-css-media-queries';
import rename from 'gulp-rename';

const isDev = process.env.NODE_ENV === 'development';
const sass = gulpSass(dartSass);

const compileStyles = () =>
  gulp
    .src('source/sass/style.scss', {sourcemaps: isDev})
    .pipe(sass().on('error', sass.logError))
    .pipe(
      postcss([
        autoprefixer({
          grid: true,
        }),
      ])
    )
    .pipe(gcmq())
    .pipe(gulp.dest('build/css'))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', {sourcemaps: '.'}));

export default compileStyles;
