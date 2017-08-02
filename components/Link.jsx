import React from 'react';
import { Link as RRLink } from 'react-router-dom';

const Link = ({ to, children }) => (
  /^https?:\/\//.test(to)
    ? <a href={to}>{children}</a>
    : <RRLink to={to}>{children}</RRLink>
);

export default Link;
