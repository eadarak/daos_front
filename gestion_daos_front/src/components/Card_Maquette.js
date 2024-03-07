import React, { useState } from 'react';
import '@coreui/coreui/dist/css/coreui.min.css';
import '../styles/general.css';
import UE from './_Maquette/UE';
import EC from './_Maquette/EC';
import Grid from '@mui/material/Grid';

function Card_Maquette(props) {
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <UE />
            </Grid>
            <Grid item xs={12} md={6}>
                <EC />
            </Grid>
        </Grid>
    );
}

export default Card_Maquette;
