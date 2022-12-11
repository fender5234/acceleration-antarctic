import beautify from 'gulp-html-beautify';
import createHtml from 'gulp-twig';
import getData from 'gulp-data';
import gulp from 'gulp';
import processHtml from 'gulp-posthtml';
import useCondition from 'gulp-if';

const isDev = process.env.NODE_ENV === 'development';
const lintMode = Boolean(process.env.LINT);

const SOURCES = ['source/layouts/pages/**/*.twig'];
if (!isDev) {
  SOURCES.push('!source/layouts/pages/**/*-dev.twig');
}

const compileLayouts = () =>
  gulp
    .src(SOURCES)
    .pipe(
      getData(async ({path}) => {
        const page = path.replace(/^.*pages(\\+|\/+)(.*)\.twig$/, '$2').replace(/\\/g, '/');
        const versionId = new Date().getTime();
        let commonData = {};
        let pageData = {};

        try {
          commonData = await import(`../source/data/global.js?${versionId}`);
        } catch (error) {
          // do nothing
        }

        try {
          pageData = await import(`../source/data/pages/${page}.js?${versionId}`);
        } catch (error) {
          // do nothing
        }

        return {
          ...commonData.default,
          ...pageData.default,
          isDev,
          page,
          version: isDev ? `?${versionId}` : '',
        };
      })
    )
    .pipe(
      createHtml({
        functions: [
          {
            name: 'contains',
            func(str, pattern) {
              return str.includes(pattern);
            },
          },
        ],
      })
    )
    .pipe(processHtml())
    .pipe(useCondition(!lintMode, beautify()))
    .pipe(useCondition(!lintMode, gulp.dest('build')));

export default compileLayouts;
