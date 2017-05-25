import React from 'react';

const SitePage = ({
  page: {
    file: {
      attributes: {
        title
      },
      body
    }
  }
}) => (
  <div>
    <h1>Page - {title}</h1>

    <div dangerouslySetInnerHTML={{ __html: body }} />
  </div>
);

export default SitePage;
