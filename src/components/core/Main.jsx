import React, { Suspense } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import ArrowLeftIcon from '../common/ArrowLeftIcon';
import './Main.css';

/**
 * Description
 * @param {JSX.IntrinsicElements['main']} props
 * @returns {JSX.Element}
 */
function Main(props) {
  const location = useLocation();
  const isHomeLocation = location.pathname === '/';
  const { children } = props;
  return (
    <main className="Main min-h-[calc(100vh-84px-176px)] w-[100vw] xl:w-[1200px] m-auto flex flex-col gap-[20px] md:gap-[40px]">
      {!isHomeLocation && (
        <div className="hidden lg:[display:unset] ">
          <NavLink className="goto-blog">
            <ArrowLeftIcon /> Blog
          </NavLink>
        </div>
      )}
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </main>
  );
}

export default Main;
