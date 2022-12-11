const {getPosthtmlBemLinter} = require('posthtml-bem-linter');
const {getPosthtmlW3cValidator} = require('posthtml-w3c-validator');
const parser = require('posthtml-parser');
const render = require('posthtml-render');
const Typograf = require('typograf');

const typograf = new Typograf({
  locale: ['ru', 'en-US'],
  htmlEntity: {type: 'name'},
});
typograf.disableRule('ru/other/phone-number');
const typography = () => (tree) => parser(typograf.execute(render(tree)));

const getSourceName = (filename) => filename.replace(/^.*pages(\\+|\/+)(.*)\.twig$/, '$2').replace(/\\/g, '/');

module.exports = {
  plugins: [
    typography(),
    getPosthtmlW3cValidator({
      exit: process.env.NODE_ENV === 'development',
      forceOffline: true,
      getSourceName,
    }),
    getPosthtmlBemLinter({
      getSourceName,
    }),
  ],
};
