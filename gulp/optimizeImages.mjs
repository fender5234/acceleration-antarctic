import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import mozJpeg from 'imagemin-mozjpeg';
import pngQuant from 'imagemin-pngquant';
import svgoPlugin from 'imagemin-svgo';

import svgoConfig from '../svgo.config.js';
import webp from 'gulp-webp';
import {stacksvg} from 'gulp-stacksvg';

const optimizeRasters = imagemin([
  pngQuant({
    speed: 1,
    strip: true,
    dithering: 1,
    quality: [0.8, 0.9],
    optimizationLevel: 3,
  }),
  mozJpeg({quality: 75, progressive: true}),
]);

const svgo = () =>
  gulp
    .src('source/img/**/*.{svg}')
    .pipe(imagemin([svgoPlugin(svgoConfig)]))
    .pipe(gulp.dest('source/img'));

const sprite = () =>
  gulp
    .src('source/img/sprite/*.svg')
    .pipe(stacksvg({output: 'sprite'}))
    .pipe(gulp.dest('build/img'));

/*
  Optional tasks
  ---------------------------------

  Используйте отличное от дефолтного значение root, если нужно обработать отдельную папку в img,
  а не все изображения в img во всех папках.

  root = '' - по дефолту webp добавляются и обновляются во всех папках в source/img/
  root = 'content/' - webp добавляются и обновляются только в source/img/content/
*/

const createWebp = () => {
  const root = '';
  return gulp
    .src(`source/img/${root}**/*.{png,jpg}`)
    .pipe(optimizeRasters)
    .pipe(webp({quality: 75}))
    .pipe(gulp.dest(`source/img/${root}`));
};

const optimizeImages = () =>
  gulp.src('build/**/*.{png,jpg}', {base: 'build'}).pipe(optimizeRasters).pipe(gulp.dest('build'));

export {svgo, sprite, createWebp, optimizeImages};
