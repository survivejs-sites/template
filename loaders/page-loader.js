const _ = require('lodash');
const frontmatter = require('front-matter');
const loaderUtils = require('loader-utils');
const removeMarkdown = require('remove-markdown');
const markdown = require('../utils/markdown');
const highlight = require('../utils/highlight');

module.exports = function pageLoader(source) {
  const result = frontmatter(source);

  const { title, body } = parseTitle(result.body);

  result.attributes = result.attributes || {};

  if (!result.attributes.title) {
    result.attributes.title = title;
  }

  result.preview = generatePreview(result, body);
  result.description = generateDescription(result);
  result.keywords = generateKeywords(result);
  result.body = markdown().process(body, highlight);

  delete result.frontmatter;

  if (result.attributes.headerImage) {
    result.attributes.headerImage = `__IMG_START__${result.attributes.headerImage}__IMG_END__`;
  }

  const context = this;

  return `module.exports = ${JSON.stringify(result)};`.replace(
    /__IMG_START__([^,\]>]+)__IMG_END__/g, (match, src) => {
      if (_.startsWith(src, 'http')) {
        return src;
      }

      return `" + require(${loaderUtils.stringifyRequest(context, src)}) + "`;
    }
  );
};

function parseTitle(body) {
  const lines = body.split('\n');

  if (lines[0].indexOf('#') === 0 && lines[0][1] === ' ') {
    return {
      title: removeMarkdown(lines[0]),
      body: lines.slice(1).join('\n'),
    };
  }

  if (lines[0].indexOf('-#') === 0) {
    return {
      title: removeMarkdown(lines[0].slice(2).trim()),
      body: lines.slice(1).join('\n'),
    };
  }

  return { body };
}

function generatePreview(file, body) {
  let ret = body;

  if (file.attributes && file.attributes.preview) {
    ret = file.attributes.preview;
  }

  return `${removeMarkdown(ret).slice(0, 100)}…`;
}

function generateDescription(file) {
  if (file.attributes) {
    return file.attributes.description || file.attributes.preview;
  }

  return file.preview;
}

function generateKeywords(file) {
  let keywords = [];

  if (file.attributes && file.attributes.keywords) {
    keywords = file.attributes.keywords;
  }

  if (_.isString(keywords)) {
    return keywords.split(',');
  }

  return keywords;
}
