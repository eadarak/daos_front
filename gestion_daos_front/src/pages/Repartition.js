/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import Card_Repartition from '../components/Card_Repartition';
import { Grid } from '@mui/material';
function Repartition(){

    return (
        <div>
            <h2> ▶ Page des Repartition </h2>
                <Grid container padding={2}>
                    <Grid item>
                        <Card_Repartition/>
                    </Grid>
                <br/>
                    <Grid item>
                        <Card_Repartition/>
                </Grid>  
            </Grid>  
        </div>
    );
}

export default Repartition;