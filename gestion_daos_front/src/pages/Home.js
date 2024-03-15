// Home.js
import React from 'react';
// import Card from '../components/Card_Maquette';
// import { Grid } from '@mui/material';

//importer les css
import "../styles/general.css"
import Card_Home from '../components/Card_Home';



function Home() {
  return (
      <div className="homeContent">
        <h2>
            🗣 Assalamou Aleykoum
        </h2>
        <div>
          <Card_Home/>
        </div>
      </div>
  );
}

export default Home;
