module.exports = () => ({
  template: {
    title: 'Template'
  },
  output: 'build',
  paths: {
    '/': {
      content: () => (
        require.context(
          './loaders/page-loader!./pages',
          true,
          /^\.\/.*\.md$/
        )
      ),
      layouts: {
        index: () => require('./layouts/Index').default,
        page: () => require('./layouts/Page').default
      },
      redirects: {}
    }
  }
});
