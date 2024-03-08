import React ,{useState} from 'react';
import '@coreui/coreui/dist/css/coreui.min.css';
import '../styles/general.css'
import Batiment from './_Emploi/Batiment';
import Deroulement from './_Emploi/Deroulement';
import Salle from './_Emploi/Salle';
import Seance from './_Emploi/Seance';
import { Grid } from '@mui/material';

function Card_Emploi(props) {
    const [modalOpen, setModalOpen] = useState(false);
      
    const toggleModal = () => {
          setModalOpen(!modalOpen);
    };
    return (
        <Grid container spacing={5}>
            <Grid item  md={5.5} >
                <Batiment/>
            </Grid>
            <Grid item  md={5.5} >
                <Salle/>
            </Grid>
            <Grid item  md={5.5} >
                <Deroulement />
            </Grid>
            <Grid item  md={5.5} >
                <Seance/>
            </Grid>
        </Grid>

    );
}

export default Card_Emploi;