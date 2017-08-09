import React from "react";
import Link from "./Link";

const PrevNext = ({
  next,
  nextText,
  previous,
  previousText,
  getTitle = () => {}
}) => {
  if (!(next || previous)) {
    return <div className="new-prevnext" />;
  }

  // XXX: make sure page spans whole container if it's the only one
  let style = {
    width: "100%"
  };
  if (next && previous) {
    style = {};
  }

  console.log(previous, getTitle(previous));

  return (
    <div className="new-prevnext">
      {previous
        ? <div className="new-prevnext__prev" style={style}>
            {previous.file.attributes.headerImage &&
              <div
                className="new-prevnext__bg"
                style={{
                  backgroundImage: `url(${previous.file.attributes
                    .headerImage})`
                }}
              />}
            <span className="new-prevnext__info">
              {previousText}
            </span>
            <Link className="new-prevnext__link" to={previous.url}>
              {getTitle(previous)}
            </Link>
          </div>
        : null}
      {next
        ? <div className="new-prevnext__next" style={style}>
            {next.file.attributes.headerImage &&
              <div
                className="new-prevnext__bg"
                style={{
                  backgroundImage: `url(${next.file.attributes.headerImage})`
                }}
              />}
            <span className="new-prevnext__info">
              {nextText}
            </span>
            <Link className="new-prevnext__link" to={next.url}>
              {getTitle(next)}
            </Link>
          </div>
        : null}
    </div>
  );
};

export default PrevNext;
