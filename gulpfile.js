import gulp from 'gulp';
import browserSync from 'browser-sync';
import del from 'del';
import compileLayouts from './gulp/compileLayouts.mjs';
import compileStyles from './gulp/compileStyles.mjs';
import {copy, copyFavicons, copyImages, copySvg} from './gulp/copyAssets.mjs';
import js from './gulp/compileScripts.mjs';
import {svgo, sprite, createWebp, optimizeImages} from './gulp/optimizeImages.mjs';
import {LintableFiles, lintSpaces, lintStyles, lintScripts} from './gulp/lintSources.mjs';

const server = browserSync.create();
const streamStyles = () => compileStyles().pipe(server.stream());

const clean = () => del('build');

const syncServer = () => {
  server.init({
    server: 'build/',
    index: 'sitemap.html',
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch(LintableFiles.EDITORCONFIG, lintSpaces);
  gulp.watch('source/**/*.{html,php}', gulp.series(copy, refresh));
  gulp.watch(['source/layouts/**/*.twig', 'source/data/**/*.js'], gulp.series(compileLayouts, refresh));
  gulp.watch(LintableFiles.STYLES, gulp.parallel(streamStyles, lintStyles));
  gulp.watch(LintableFiles.SCRIPTS, gulp.parallel(gulp.series(js, refresh), lintScripts));
  gulp.watch('source/img/**/*.svg', gulp.series(copySvg, sprite, refresh));
  gulp.watch('source/img/**/*.{png,jpg,webp}', gulp.series(copyImages, refresh));

  gulp.watch('source/favicon/**', gulp.series(copyFavicons, refresh));
  gulp.watch('source/{downloads,fonts,video}/**', gulp.series(copy, refresh));
};

const refresh = (done) => {
  server.reload();
  done();
};

const build = gulp.series(
  gulp.parallel(lintSpaces, lintStyles, lintScripts),
  clean,
  svgo,
  gulp.parallel(copy, copyFavicons, compileLayouts, compileStyles, sprite, js)
);
const start = gulp.series(build, syncServer);

export {optimizeImages as imagemin, createWebp as webp, build, start};
