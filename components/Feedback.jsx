import React from 'react';
import GithubCorner from 'react-github-corner';

const Feedback = ({ sectionName }) => {
  if (sectionName !== 'react' || sectionName !== 'webpack') {
    sectionName = 'site'; // eslint-disable-line no-param-reassign
  }

  return (
    <GithubCorner
      href={`https://github.com/survivejs/${sectionName}`}
      bannerColor="#fff"
      octoColor="#000"
      width={80}
      height={80}
      direction="right"
      target="_blank"
    />
  );
};

export default Feedback;
