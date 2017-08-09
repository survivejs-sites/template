import React from "react";

const Resources = ({ resources }) =>
  resources
    ? <div className="resources__wrapper">
        <h4 className="resources--header">Resources</h4>

        <ul className="resources-nav">
          {resources.map((resource, i) =>
            <li key={`resourceItem${i}`}>
              <a
                href={`${resource.url}`}
                className="resource-nav__link"
                target="_blank"
              >
                {resource.name}
              </a>
            </li>
          )}
        </ul>
      </div>
    : null;

export default Resources;
