import React from 'react';

/**
 * Description
 * @param {JSX.IntrinsicElements['div']} props
 * @returns {JSX.Element}
 */
function ChatIcon(props) {
  return (
    <div {...props}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 14V1.05C0 0.781667 0.105 0.539583 0.315 0.32375C0.525 0.107917 0.77 0 1.05 0H12.95C13.2183 0 13.4604 0.107917 13.6763 0.32375C13.8921 0.539583 14 0.781667 14 1.05V10.15C14 10.4183 13.8921 10.6604 13.6763 10.8763C13.4604 11.0921 13.2183 11.2 12.95 11.2H2.8L0 14ZM1.05 11.4625L2.3625 10.15H12.95V1.05H1.05V11.4625Z"
          fill="#9D9DB5"
        />
      </svg>
    </div>
  );
}

export default ChatIcon;
