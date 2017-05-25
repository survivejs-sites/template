module.exports = () => ({
  template: {
    title: 'Template'
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
      redirects: {}
    }
  }
});
