import React, { useRef, useState } from 'react';
import './LazyImg.css';

/**
 * Description
 * @param {JSX.IntrinsicElements['img']} props
 * @returns {JSX.Element}
 */
function LazyImg(props, ref) {
  /**@type {React.MutableRefObject<HTMLDivElement>} */
  const loaderRef = useRef();
  const onLoadHandler = e => {
    const el = e.target;
    if (!(el instanceof HTMLImageElement))
      throw new Error(['not an image element']);
    if (loaderRef.current instanceof HTMLDivElement) {
      loaderRef.current.style = {
        display: 'none',
      };
    }
    el.classList.add('loaded');
  };
  return (
    <div className="LazyImg object-cover">
      <div
        ref={loaderRef}
        className="absolute z-auto top-0 flex items-center justify-center w-full h-full bg-slate-blue"
      >
        <span className="text-2xl text-white animate-bounce">Loading...</span>
      </div>
      <img
        style={{ objectFit: 'cover' }}
        loading="lazy"
        alt=""
        onLoad={onLoadHandler}
        {...props}
        ref={ref}
      />
    </div>
  );
}

export default React.forwardRef(LazyImg);
