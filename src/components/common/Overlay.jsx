import React from 'react';
import 'animate.css';

/**
 * Description
 * @typedef {Object} OverlayProps
 * @property {React.ReactNode} children
 * @property {boolean} value
 * @param {OverlayProps} props
 * @returns {JSX.Element}
 */
function Overlay({ children, value }) {
  return (
    <>
      {value && (
        <div className="fixed w-[100vw] h-[100vh] top-0 left-0 z-50 flex items-center justify-center animate__aniamted animate__fadeIn">
          <div className="absolute top-0 w-full h-full opacity-[0.5] bg-dark-midnight-blue"></div>
          <div className="relative">{children}</div>
        </div>
      )}
    </>
  );
}

export default Overlay;
