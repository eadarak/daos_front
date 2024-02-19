// Layout.js
import React from 'react';
import SidebarComp from '../components/SidebarComp';

function Layout({ children }) {
  return (
    <div className="layout">
      <SidebarComp />
      <div className="content">{children}</div>
    </div>
  );
}

export default Layout;
