/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { Grid } from '@mui/material';
import Card_Emploi from '../components/Card_Emploi';



function Emploi() {
    return (
        <div>
            <h2> ▶ Page des Emplois du Temps </h2>
                <Grid container padding={2}>
                    <Grid item>
                        <Card_Emploi/>
                    </Grid>
                    
            </Grid>  
        </div>
    );

}

export default Emploi;