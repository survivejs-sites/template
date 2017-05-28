import _ from 'lodash';
import React from 'react';

import Disqus from '../components/Disqus';
import Moment from '../components/Moment';
import Author from '../components/Author';
import PrevNext from '../components/PrevNext';
import PrevNextMini from '../components/PrevNextMini';
import RelatedPosts from '../components/RelatedPosts';
import SocialLinks from '../components/SocialLinks';
import getRelatedPosts from '../utils/get-related-posts';

const BookPage = ({
  page: {
    file: {
      attributes: {
        author, date, headerExtra, headerImage, title,
      },
      body,
    },
    keywords,
    previous,
    next,
  },
  section,
  config,
}) => {
  let postAuthor = author || (config.blog && config.blog.author);
  const relatedPosts = getRelatedPosts(keywords, section.pages(), 10);
  const relatedHeaders = {
    interview: 'Interviews',
    opinion: 'Opinions',
    publishing: 'Publishing thoughts',
  };

  if (_.isFunction(postAuthor)) {
    postAuthor = postAuthor();
  }

  return (
    <div className="post__wrapper">
      {headerImage &&
        <div
          className="header-image"
          style={{
            backgroundImage: `url(${headerImage})`,
          }}
        />
      }

      <h1 className="post__heading">{title}</h1>

      <div className="toc-nav__wrapper">
        <RelatedPosts title={title} posts={relatedPosts} headers={relatedHeaders} />
      </div>

      <div className="post">
        <div className="post__content">
          <div dangerouslySetInnerHTML={{ __html: body }} />
          {headerExtra &&
            <div
              className="header-extra"
              dangerouslySetInnerHTML={{ __html: headerExtra }}
            />
          }
          {date && <Moment className="post__moment" datetime={date} /> }
          {postAuthor && <Author author={postAuthor} />}

          <SocialLinks type="blog post" />

          <PrevNext
            previous={previous}
            next={next}
            previousText="Previous post"
            nextText="Next post"
            getTitle={({ file }) => file && file.attributes && file.attributes.title}
          />

          <div id="disqus_thread" />
        </div>
      </div>

      <PrevNextMini
        previous={previous}
        next={next}
        getTitle={({ file }) => file && file.attributes && file.attributes.title}
      />

      <Disqus shortname="survivejs" />
    </div>
  );
};

export default BookPage;
