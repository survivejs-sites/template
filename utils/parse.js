const marked = require('marked');
const removeMarkdown = require('remove-markdown');

function parseQuotes(data) {
  const tokens = marked.lexer(data).map((t) => {
    if (t.type === 'paragraph') {
      return parseCustomQuote(t, 'T>', 'tip') ||
        parseCustomQuote(t, 'W>', 'warning') ||
        parseCustomQuote(t, '?>', 'todo') ||
        t;
    }

    return t;
  });

  tokens.links = [];

  return tokens;
}
exports.quotes = parseQuotes;

function parseCustomQuote(token, match, className) {
  if (token.type === 'paragraph') {
    const text = token.text;
    let icon;

    if (text.indexOf(match) === 0) {
      switch (className) {
        case 'tip':
          icon = 'icon-info';
          break;
        case 'warning':
          icon = 'icon-warning';
          break;
        default:
          icon = 'icon-chevron-right';
          break;
      }

      return {
        type: 'html',
        text: `${`<blockquote class="${className}">` +
          `<div class="tip-title"><i class="tip-icon ${icon}"></i>${className}</div>`}${
          text.slice(2).trim()
        }</blockquote>`,
      };
    }
  }

  return token;
}
exports.customQuote = parseCustomQuote;

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
exports.title = parseTitle;
