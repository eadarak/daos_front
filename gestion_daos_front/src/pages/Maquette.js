/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import Card_Maquette from '../components/Card_Maquette';
import { Grid } from '@mui/material';

function Maquette() {

    return (
        <div>
            <h2> ▶ Page des Maquettes </h2>
             <Grid container>
              <Grid item>
                <Card_Maquette/>  
              </Grid>

             </Grid>
        </div>
    );
}

export default Maquette;