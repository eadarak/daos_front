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
import DetailsBatiment from './components/_Details/Emploi/DetailsBatiment';
import DetailsUE from './components/_Details/Maquette/DetailsUE';
import ListeEC from './components/_Listes/Maquette/ListeEC';
import ListeModules from './components/_Listes/Maquette/ListeModule';
import ListeClasse from './components/_Listes/Maquette/ListeClasse';
import ListeGroupe from './components/_Listes/Maquette/ListeGroupe';
import ListeEnseignement from './components/_Listes/Maquette/ListeEnseignement';
import ListeCycle from './components/_Listes/Maquette/ListeCycle';
import ListeNiveau from './components/_Listes/Maquette/ListeNiveau';
import ListeEmploiDuTemps from './components/_Listes/Emploi/ListeEmploiDuTemps';
import ListeFormation from './components/_Listes/Maquette/ListeFormation';
import ListeFiliere from './components/_Listes/Maquette/ListeFiliere';
import ListeSemestre from './components/_Listes/Maquette/ListeSemestre';
import ListeMaquette from './components/_Listes/Maquette/ListeMaquette';
import Lister_salle from './components/_API/Lister_salle';
import Lister_classe from './components/_API/Lister_classe';


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
    path : '/listeSalle',
    element : <Layout> <ListeSalle/> </Layout>
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
  },
  {
    path : '/detailsUE/:id', // Mettez à jour le chemin ici en incluant un paramètre d'ID
    element : <Layout> <DetailsUE /> </Layout> // Utilisez le composant DetailsUE ici
  },

  {
    path : '/listes-ec',
    element: <Layout> <ListeEC/> </Layout>
  },
  {
    path : '/listes-module',
    element: <Layout> <ListeModules/> </Layout>
  },
  {
    path : '/listes-classe',
    element: <Layout> <ListeClasse/> </Layout>
  },
  {
    path : '/listes-groupe',
    element: <Layout> <ListeGroupe/> </Layout>
  },
  {
    path : '/listes-enseignement',
    element: <Layout> <ListeEnseignement/> </Layout>
  },
  {
    path : '/listes-cycle',
    element: <Layout> <ListeCycle/> </Layout>
  },
  {
    path : '/listes-niveau',
    element: <Layout> <ListeNiveau/> </Layout>
  },
  {
    path : '/listes-emploi-du-temps',
    element: <Layout><ListeEmploiDuTemps/> </Layout>
  },
  {
    path : '/listes-formation',
    element: <Layout><ListeFormation/> </Layout>
  },
  {
    path : '/listes-filiere',
    element: <Layout><ListeFiliere/> </Layout>
  },
  {
    path : '/listeSemestre',
    element: <Layout><ListeSemestre/> </Layout>
  },
  {
    path : '/listeMaquette',
    element : <Layout><ListeMaquette/></Layout>
  },

  {
    path : '/salles',
    element : <Layout><Lister_salle/></Layout>
  },
  {
    path : '/classes',
    element : <Layout><Lister_classe/></Layout>
  },


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
