import React from 'react';

const SiteIndex = ({
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
    <h1>Index - {title}</h1>

    <div dangerouslySetInnerHTML={{ __html: body }} />
  </div>
);

export default SiteIndex;
