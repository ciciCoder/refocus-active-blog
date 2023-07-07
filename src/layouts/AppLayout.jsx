import React from 'react';
import Header from '../components/core/Header';
import { Outlet } from 'react-router-dom';
import Main from '../components/core/Main';
import Footer from '../components/core/Footer';

function AppLayout() {
  return (
    <div>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </div>
  );
}

export default AppLayout;
