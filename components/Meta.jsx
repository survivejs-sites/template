import React from "react";

const Meta = ({ demo, endSource }) => {
  if (!(endSource || demo)) {
    return null;
  }

  return (
    <div className="post__meta">
      {endSource &&
        <a className="post__end_source" href={endSource} target="_blank">
          Finished source code
        </a>}
      {demo &&
        <a className="post__demo" href={demo} target="_blank">
          Demo
        </a>}
    </div>
  );
};

export default Meta;
