import React ,{useState} from 'react';
import '@coreui/coreui/dist/css/coreui.min.css';
import '../styles/general.css'
import Batiment from './_Emploi/Batiment';
import Deroulement from './_Emploi/Deroulement';
import Salle from './_Emploi/Salle';
import Seance from './_Emploi/Seance';
import { Grid } from '@mui/material';
import EmploiDuTemps from './_Emploi/EmploiDuTemps';
import { Pages } from '@mui/icons-material';
import Pages_salle from './_Pages/Pages_salle';

export default function Card_Home(props) {
    const [modalOpen, setModalOpen] = useState(false);
      
    const toggleModal = () => {
          setModalOpen(!modalOpen);
    };
    return (
        <Grid container spacing={5}>
            <Grid item  md={5.5} >
              <Pages_salle/>
            </Grid>
           
        </Grid>

    );
}

