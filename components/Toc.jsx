import React from 'react';
import Link from './Link';

const Toc = ({ sectionPages, title }) => (
  <ul className="toc-nav">
    {sectionPages().map(({ file: { attributes }, url }, i) => (
      <li key={`navPage${i}`} className={`toc-${attributes.type}`}>
        {attributes.title === title ?
          <span className={`toc-nav__link toc-nav__link--current ${attributes.type}`}>
            {attributes.title}
          </span> :
          <Link to={url} className={`toc-nav__link ${attributes.type}`}>
            {attributes.title}
          </Link>
        }
      </li>
    ))}
  </ul>
);

export default Toc;
