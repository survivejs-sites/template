const _ = require('lodash');
const path = require('path');

module.exports = () => ({
  template: {
    title: 'Template',
    file: path.resolve(__dirname, 'templates/page.ejs'),
  },
  output: 'build',
  layout: () => require('./layouts/SiteBody').default,
  paths: {
    '/': {
      content: () => (
        require.context('./pages', true, /^\.\/.*\.md$/)
      ),
      index: () => require('./layouts/SiteIndex').default,
      paths: {
        blog: {
          index: () => require('./layouts/BlogIndex').default,
          layout: () => require('./layouts/BlogPage').default,
          sort: pages => _.sortBy(pages, 'date').reverse(),
          url: ({ sectionName, fileName }) => (
            `/${sectionName}/${_.trimStart(fileName, '0123456789-')}/`
          ),
        },
      },
    },
    webpack: {
      content: () => (
        require.context('./books/webpack-book/manuscript', true, /^\.\/.*\.md$/)
      ),
      index: () => require('./layouts/WebpackIndex.jsx').default,
      layout: () => require('./layouts/ChapterPage.jsx').default,
      sort: (pages) => {
        let order = require('./books/webpack-book/manuscript/Book.txt').split('\n').filter(id);

        const ret = [];

        order = order.filter(name => path.extname(name) === '.md');

        order.forEach((fileName) => {
          const parts = fileName.split('/');
          const chapterName = _.last(parts).split('.')[0];
          const partName = parts.length > 1 ? `/${_.head(parts)}` : '';
          const result = _.find(pages, {
            fileName: chapterName,
            sectionName: `webpack${partName}`,
          });

          if (!result) {
            return console.error('Failed to find', chapterName, partName);
          }

          ret.push(result);

          return null;
        });

        ret.reverse();

        return ret;
      },
      url: ({ sectionName, fileName }) => {
        const fixedFileName = _.lowerCase(_.trimStart(fileName, '0123456789-_')).replace(/ /g, '-');

        return `/webpack${sectionName}/${fixedFileName}/`;
      },
    },
  },
});

function id(a) { return a; }
