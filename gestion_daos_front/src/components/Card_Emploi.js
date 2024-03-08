import React ,{useState} from 'react';
import '@coreui/coreui/dist/css/coreui.min.css';
import '../styles/general.css'
import Batiment from './_Emploi/Batiment';
import Deroulement from './_Emploi/Deroulement';
import Salle from './_Emploi/Salle';
import Seance from './_Emploi/Seance';
import { Grid } from '@mui/material';
import Emploi from '../pages/Emploi';

function Card_Emploi(props) {
    const [modalOpen, setModalOpen] = useState(false);
      
    const toggleModal = () => {
          setModalOpen(!modalOpen);
    };
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Batiment/>
            </Grid>
            <Grid item xs={12} md={6}>
                <Salle/>
            </Grid>
            <Grid item xs={12} md={6}>
                <Deroulement />
            </Grid>
            <Grid item xs={12} md={6}>
                <Seance/>
            </Grid>
        </Grid>

    );
}

export default Card_Emploi;