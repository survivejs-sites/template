import React from 'react';
import _ from 'lodash';

const LatestPost = ({ section }) => {
  const post = _.reject(section.pages('blog'), ({ isDraft }) => isDraft)[0];

  if (!post) {
    return null;
  }

  return (
    <div>
      <blockquote className="latestpost tip">
        <a className="latestpost-link" href={`/${post.url}`}>
          {post.title}
        </a>
        <hr />
        <a className="latestpost-link" href="/clinic/">
          <b>Register</b> for Vienna clinics (late July, August)
        </a>
      </blockquote>
    </div>
  );
};

export default LatestPost;
