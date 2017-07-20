const _ = require('lodash');

function cleanChapterName(resourcePath) {
  return _.trimStart(resourcePath, '0123456789-_').toLowerCase()
    .replace(/ /g, '-').replace(/_/g, '-');
}
exports.chapterName = cleanChapterName;
