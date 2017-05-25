import React from 'react';

const Footer = ({ section }) => {
  const pages = section.pages ? section.pages('blog').slice(0, 10) : [];

  return (
    <footer>
      <div className='footer-wrapper'>
        <div className='footer-content-wrapper'>
          <div className='footer-social'>
            <h3>Social</h3>
            <ul>
              <li>
                <a href='https://twitter.com/survivejs' target='_blank'>@survivejs</a>
              </li>
              <li>
                <a href='http://eepurl.com/bth1v5' target='_blank'>Mailing List</a>
              </li>
              <li>
                <a href='https://gitter.im/survivejs' target='_blank'>Gitter Chat</a>
              </li>
              <li>
                <a href='https://github.com/survivejs' target='_blank'>GitHub</a>
              </li>
              <li>
                <a href='https://presentations.survivejs.com' target='_blank'>Presentations</a>
              </li>
              <li>
                <a href='http://goo.gl/forms/OWdGIOdHm9' target='_blank'>Contact</a>
              </li>
              <li>
                <a href='https://github.com/survivejs/ama/issues' target='_blank'>Ask Me Anything</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
