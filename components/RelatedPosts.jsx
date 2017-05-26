import _ from 'lodash';
import React from 'react';
import titleCase from 'title-case';

const RelatedPosts = ({
  title, posts, headers
}) => (
  <div>
    {_.map(posts, (pages, name) => {
      if (pages.length < 2) {
        return <div key={`related-posts-${name}`} />;
      }

      return (
        <div key={`related-posts-${name}`}>
          <h4 className="toc-nav--header">{headers[name] || titleCase(name)}</h4>

          <Toc sectionPages={() => pages} title={title} />
        </div>
      );
    })}
  </div>
);

export default RelatedPosts;
