// App.js
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Repartition from './pages/Repartition';
import Maquette from './pages/Maquette';
import Emploi from './pages/Emploi';
import Layout from './Layouts/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><Home /></Layout>
  },
  {
    path: '/repartition',
    element: <Layout><Repartition /> </Layout>
  },
  {
    path: '/maquette',
    element:<Layout>  <Maquette /> </Layout>
  },
  {
    path : '/emploi',
    element: <Layout> <Emploi /> </Layout>
  }

]);

function App() {
  return (
    <RouterProvider router={router}>
      {/* Inclure ici le composant Layout qui contient Home */}
      <Layout />
    </RouterProvider>
  );
}

export default App;
