import React, { useState } from 'react';
import '@coreui/coreui/dist/css/coreui.min.css';
import '../styles/general.css';
import UE from './_Maquette/UE';
import EC from './_Maquette/EC';
import Grid from '@mui/material/Grid';
import Module from './_Maquette/Module';
import Classe from './_Maquette/Classe';
import Groupe from './_Maquette/Groupe';
import Enseignement from './_Maquette/Enseignement';
import Cycle from './_Maquette/Cycle';
import Niveau from './_Maquette/Niveau';
import Formation from './_Maquette/Formation';
import Filiere from './_Maquette/Filiere';
import Semestre from './_Maquette/Semestre';
import Maquette from './_Maquette/Maquette';

function Card_Maquette(props) {
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={3.9} ml={1}>
                <Classe />
            </Grid>
            <Grid item xs={12} md={4}>
                <Cycle />
            </Grid>
            <Grid item xs={12} md={4}>
                <Groupe />
            </Grid>

            <Grid item xs={12} md={3.9} ml={1}>
                <Enseignement />
            </Grid>


            <Grid item xs={12} md={3.9} ml={1}>
                <UE />
            </Grid>

            <Grid item xs={12} md={3.9} ml={1}>
                <EC />
            </Grid>
            
            <Grid item xs={12} md={3.9} ml={1}>
                <Module />
            </Grid>

            <Grid item xs={12} md={3.9} ml={1}>
                <Formation/>
            </Grid>

            <Grid item xs={12} md={3.9} ml={1}>
                <Niveau />
            </Grid>

            <Grid item xs={12} md={3.9} ml={1}>
                <Filiere/>
            </Grid>

            <Grid item xs={12} md={3.9} ml={1}>
                <Semestre/>
            </Grid>

            <Grid item xs={12} md={3.9} ml={1}>
                <Maquette/>
            </Grid>
            
        </Grid>
    );
}

export default Card_Maquette;
