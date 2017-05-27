import React from 'react';

const GitterChat = ({
  room = 'react',
  title = 'Need help?',
}) => (
  <div>
    <div className="gitter-open-chat-button">{title}</div>
    <script
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `
          ((window.gitter = {}).chat = {}).options = {
            showChatByDefault: false,
            activationElement: '.gitter-open-chat-button',
            room: 'survivejs/${room}'
          };
        `,
      }}
    />
    <script src="https://sidecar.gitter.im/dist/sidecar.v1.js" async defer />
  </div>
);

export default GitterChat;
