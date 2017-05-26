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
          './loaders/page-loader!./pages',
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
          sort: pages => _.sortBy(pages, 'date').reverse(),
          url: ({ sectionName, fileName }) => (
            `/${sectionName}/${_.trimStart(fileName, '0123456789-')}/`
          ),
          custom: () => require('./layouts/BlogIndex').default
        }
      }
    }
  }
});
