const _ = require('lodash');
const path = require('path');

module.exports = () => ({
  template: {
    title: 'Template',
    file: path.resolve(__dirname, 'templates/page.ejs')
  },
  output: 'build',
  layout: () => require('./layouts/SiteBody').default,
  paths: {
    '/': {
      content: () => (
        require.context(
          'page-loader!./pages',
          true,
          /^\.\/.*\.md$/
        )
      ),
      custom: () => require('./layouts/SiteIndex').default,
      layouts: {
        index: () => require('./layouts/Index').default,
        page: () => require('./layouts/Page').default
      },
      paths: {
        blog: {
          layouts: {
            page: () => require('./layouts/BlogPage').default
          },
          sort: pages => _.sortBy(pages, 'date').reverse(),
          url: ({ sectionName, fileName }) => (
            `/${sectionName}/${_.trimStart(fileName, '0123456789-')}/`
          ),
          custom: () => require('./layouts/BlogIndex').default
        }
      }
    },
    'webpack': {
      content: () => (
        require.context(
          'page-loader!./books/webpack-book/manuscript',
          true,
          /^\.\/.*\.md$/
        )
      ),
      sort: pages => {
        let order = require('raw-loader!./books/webpack-book/manuscript/Book.txt').split('\n').filter(id);

        const ret = [];

        order = order.filter(function(name) {
          return path.extname(name) === '.md';
        });

        order.forEach(function(fileName, i) {
          const parts = fileName.split('/');
          const chapterName = _.last(parts).split('.')[0];
          const partName = parts.length > 1 ? '/' + _.head(parts) : '';
          const result = _.find(pages, {
            fileName: chapterName,
            sectionName: 'webpack' + partName
          });

          if(!result) {
            return console.error('Failed to find', chapterName, partName);
          }

          ret.push(result);
        });

        ret.reverse();

        return ret;
      },
      url: ({ sectionName, fileName }) => {
        const fixedFileName = _.lowerCase(_.trimStart(fileName, '0123456789-_')).replace(/ /g, '-');

        return `/webpack${sectionName}/${fixedFileName}/`
      },
      custom: () => require('./layouts/WebpackIndex.jsx').default,
      layouts: {
        page: () => require('./layouts/ChapterPage.jsx').default
      }
    }
  }
});

function id(a) {return a;}
