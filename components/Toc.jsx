import React from 'react';
import { Link } from 'react-router-dom';

const Toc = ({ sectionPages, title }) => (
  <ul className="toc-nav">
    {sectionPages().map((navPage, i) => {
      const type = navPage.type || '';

      return (
        <li key={`navPage${i}`} className={type && `toc-l${type}`}>
          {navPage.title === title ?
            <span className={`toc-nav__link toc-nav__link--current ${type}`}>
              {navPage.title}
            </span> :
            <Link to={`/${navPage.url}`} className={`toc-nav__link ${type}`}>
              {navPage.title}
            </Link>
          }
        </li>
      );
    })}
  </ul>
);

export default Toc;
