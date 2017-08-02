import React from 'react';
import { Link as RRLink } from 'react-router-dom';
import isExternal from 'is-url-external';

const Link = ({ to, children }) => (
  isExternal(to)
    ? <a href={to}>{children}</a>
    : <RRLink to={to}>{children}</RRLink>
);

export default Link;
