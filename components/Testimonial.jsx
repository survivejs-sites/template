import React from "react";

const Testimonial = ({ text, image, url, name, title = "\u00a0" }) =>
  <div className="testimonial">
    <div className="text-wrapper">
      <div className="text">
        {text}
      </div>
    </div>

    {image &&
      <div className="photo-wrapper">
        {url
          ? <a href={url} target="_blank">
              <img className="photo" src={image} alt={name} />
            </a>
          : <img className="photo" src={image} alt={name} />}
      </div>}

    <div className="name-wrapper">
      <span className="name">
        {name}
      </span>
    </div>
    <div className="title-wrapper">
      <span className="title">
        {title}
      </span>
    </div>
  </div>;

export default Testimonial;
