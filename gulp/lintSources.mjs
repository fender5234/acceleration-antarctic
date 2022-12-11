import eslint from 'gulp-eslint';
import gulp from 'gulp';
import lintspaces from 'gulp-lintspaces';
import postcss from 'gulp-postcss';
import reportStylelint from 'postcss-reporter';
import scssSyntax from 'postcss-less';
import stylelint from 'stylelint';
import useCondition from 'gulp-if';

const isDev = process.env.NODE_ENV === 'development';

export const LintableFiles = {
  EDITORCONFIG: [
    '*.{cjs,js,json,md,mjs}',
    '{gulp,source}/**/*.{html,js,json,md,mjs,scss,svg,twig}',
    '!source/{js,sass}/vendor/**',
  ],
  SCRIPTS: 'source/**/*.{cjs,js,mjs}',
  STYLES: 'source/sass/**/*.scss',
};

// Задачи линтинга

export const lintSpaces = () =>
  gulp
    .src(LintableFiles.EDITORCONFIG)
    .pipe(lintspaces({editorconfig: '.editorconfig'}))
    .pipe(lintspaces.reporter({breakOnWarning: !isDev}));

export const lintStyles = () =>
  gulp.src(LintableFiles.STYLES).pipe(
    postcss(
      [
        stylelint(),
        reportStylelint({
          clearAllMessages: true,
          throwError: !isDev,
        }),
      ],
      {syntax: scssSyntax}
    )
  );

export const lintScripts = () =>
  gulp
    .src(LintableFiles.SCRIPTS)
    .pipe(eslint({fix: false}))
    .pipe(eslint.format())
    .pipe(useCondition(!isDev, eslint.failAfterError()));
