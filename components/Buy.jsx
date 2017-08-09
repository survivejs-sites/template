import React from "react";

const Buy = ({ sectionName }) => {
  if (sectionName === "webpack") {
    return (
      <div>
        <BuyWebpack />

        <h3>See also</h3>
        <BuyReact />
      </div>
    );
  }

  return (
    <div>
      <BuyReact />

      <h3>See also</h3>
      <BuyWebpack />
    </div>
  );
};

const BuyWebpack = () =>
  <div className="buy-container">
    <a href="/webpack/foreword">
      <img
        alt="Webpack book cover"
        className="sidebar-cover"
        src={require("assets/img/webpack_title_page_small.png")}
        width="255"
        height="329"
      />
    </a>

    <p>
      <a
        className="btn btn--normal btn--buy"
        href="https://leanpub.com/survivejs-webpack"
      >
        Buy at Leanpub
      </a>
      <a
        className="btn btn--normal btn--buy"
        href="https://www.amazon.com/dp/9526868803/"
      >
        Buy at Amazon
      </a>
      <a
        className="btn btn--normal btn--buy"
        href="https://www.amazon.com/dp/B06XWZZGBS"
      >
        Buy for Kindle
      </a>
      <a
        className="btn btn--normal btn--buy"
        href="https://survivejs.typeform.com/to/LUQK0T"
      >
        Buy Signed LE
      </a>
    </p>
  </div>;

const BuyReact = () =>
  <div className="buy-container">
    <a href="/react/introduction">
      <img
        alt="React book cover"
        className="sidebar-cover"
        src={require("assets/img/react_title_page_small.png")}
        width="255"
        height="329"
      />
    </a>

    <p>
      <a
        className="btn btn--normal btn--buy"
        href="https://leanpub.com/survivejs-react"
      >
        Buy at Leanpub
      </a>
    </p>
  </div>;

export default Buy;
