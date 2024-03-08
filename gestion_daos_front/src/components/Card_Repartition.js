import React ,{useState} from 'react';
import '@coreui/coreui/dist/css/coreui.min.css';
import PER from './_Repartition/PER';
import VAC from './_Repartition/VAC';
import '../styles/general.css'
import AllEnseignant from './_Repartition/AllEnseignant';
import Repartition from './_Repartition/Repartition';
import { Grid } from '@mui/material';

function Card_Maquette(props) {
    return (

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <PER/> 
          </Grid>
          <Grid item xs={12} md={6}>
            <VAC/>
          </Grid>
          <Grid item xs={12} md={6}>
            <AllEnseignant/> 
          </Grid>
          <Grid item xs={12} md={6}>
            <Repartition/> 
          </Grid>
      </Grid>

    );
}

export default Card_Maquette;