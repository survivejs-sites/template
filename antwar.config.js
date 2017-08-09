const _ = require("lodash");
const path = require("path");
const generateAdjacent = require("./utils/generate-adjacent");
const clean = require("./utils/clean");

module.exports = () => ({
  template: {
    title: "Template",
    file: path.resolve(__dirname, "templates/page.ejs")
  },
  output: "build",
  layout: () => require("./layouts/SiteBody").default,
  paths: {
    "/": {
      content: () => require.context("./pages", true, /^\.\/.*\.md$/),
      index: () => require("./layouts/SiteIndex").default,
      paths: {
        blog: {
          index: () => require("./layouts/BlogIndex").default,
          layout: () => require("./layouts/BlogPage").default,
          transform: pages => _.sortBy(pages, "date").reverse(),
          url: ({ sectionName, fileName }) =>
            `/${sectionName}/${_.trimStart(fileName, "0123456789-")}/`
        }
      }
    },
    react: {
      content: () =>
        require.context("./books/react-book/manuscript", true, /^\.\/.*\.md$/),
      index: () => require("./layouts/BookIndex").default,
      layout: () => require("./layouts/BookPage").default,
      transform: pages =>
        generateAdjacent(
          require("./books/react-book/manuscript/Book.txt")
            .split("\n")
            .filter(name => path.extname(name) === ".md")
            .map(fileName => {
              const result = _.find(pages, { fileName });

              if (!result) {
                return console.error("Failed to find", fileName);
              }

              return result;
            })
        ),
      url: ({ sectionName, fileName }) =>
        `/${sectionName}/${clean.chapterName(fileName)}/`
    },
    webpack: {
      content: () =>
        require.context(
          "./books/webpack-book/manuscript",
          true,
          /^\.\/.*\.md$/
        ),
      index: () => require("./layouts/WebpackIndex").default,
      layout: () => require("./layouts/BookPage").default,
      transform: pages =>
        generateAdjacent(
          require("./books/webpack-book/manuscript/Book.txt")
            .split("\n")
            .filter(name => path.extname(name) === ".md")
            .map(fileName => {
              const result = _.find(pages, { fileName });

              if (!result) {
                return console.error("Failed to find", fileName);
              }

              return result;
            })
        ),
      url: ({ sectionName, fileName }) =>
        `/${sectionName}/${clean.chapterName(fileName)}/`
    }
  }
});
