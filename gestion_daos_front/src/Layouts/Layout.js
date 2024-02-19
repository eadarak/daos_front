// Layout.js
import React, { useState } from 'react';
import SidebarComp from '../components/SidebarComp';

import '../styles/layout.css'

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleDrawerOpen = () => {
    setSidebarOpen(true);
  };

  const handleDrawerClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="layout">
      <SidebarComp sidebarOpen={sidebarOpen} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
      <div className="content"style={{ marginLeft: sidebarOpen ? '280px' : '0' }}>{children}</div>
    </div>
  );
}

export default Layout;
