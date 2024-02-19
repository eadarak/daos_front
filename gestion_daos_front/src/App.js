import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SidebarComp from './components/SidebarComp';
import Layout from './Layouts/Layout';


const router = createBrowserRouter([
  {
    path : '/',
    element :  <Layout><Home /></Layout>
  }
])

function App() {
  return (
    <RouterProvider router={router}>
      <div className='App'>
        <SidebarComp />
      </div>
    </RouterProvider>

  );
}

export default App;
