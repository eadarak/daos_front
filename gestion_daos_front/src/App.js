// App.js
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Repartition from './pages/Repartition';
import Maquette from './pages/Maquette';
import Emploi from './pages/Emploi';
import Layout from './Layouts/Layout';
import Authentification from './pages/Authentification';
import ListeUE from './components/_Listes/Maquette/ListeUE';
import ListePER from './components/_Listes/Repartition/ListePER';
import ListeVAC from './components/_Listes/Repartition/ListeVAC';
import ListeAllEnseignant from './components/_Listes/Repartition/ListeAllEnseignant';
import ListeBatiment from './components/_Listes/Emploi/ListeBatiment';
import ListeDeroulement from './components/_Listes/Emploi/ListeDeroulement';
import ListeSalle from './components/_Listes/Emploi/ListeSalle';
import ListeSeance from './components/_Listes/Emploi/ListeSeance';
import ListeRepartition from './components/_Listes/Repartition/ListeRepartition';
import DetailsBatiment from './components/_Emploi/_Pages Details/DetailsBatiment';

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
  },
  {
    path : '/authentification',
    element: <Layout> <Authentification /> </Layout>
  },
  {
    path : '/listeUE',
    element: <Layout> <ListeUE/> </Layout>
  },
  {
    path : '/listePER',
    element: <Layout> <ListePER/> </Layout>
  },
  {
    path : '/listeVAC',
    element : <Layout> <ListeVAC/> </Layout>
  },
  {
    path : '/listeAllEnseignant',
    element : <Layout> <ListeAllEnseignant/> </Layout>
  },
  {
    path : '/listeBatiment',
    element : <Layout> <ListeBatiment/> </Layout>
  },
  {
    path : '/listeDeroulement',
    element : <Layout> <ListeDeroulement/> </Layout>
  },
  {
    path : '/listeEmploiDuTemps',
    element : <Layout> <ListeAllEnseignant/> </Layout>
  },
  {
    path : '/listeSalle',
    element : <Layout> <ListeSalle/> </Layout>
  },
  {
    path : '/listeSeance',
    element : <Layout> <ListeSeance/> </Layout>
  },
  {
    path : '/listeRepartition',
    element : <Layout> <ListeRepartition/> </Layout>
  },
  {
    path : '/detailsBatiments',
    element : <Layout> <DetailsBatiment/> </Layout>
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
