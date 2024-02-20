// Home.js
import React from 'react';
// import Card from '../components/Card_Maquette';
// import { Grid } from '@mui/material';
import MyCard from '../components/MyCard'

//importer les css
import "../styles/general.css"



function Home() {
  return (
      <div className="homeContent">
        <MyCard/>
          {/* <Grid container padding={2}>
            <Grid item>
              <Card/>
            </Grid>
            <br/>
            <Grid item>
              <Card/>
            </Grid>  
          </Grid>      */}
      </div>
  );
}

export default Home;
