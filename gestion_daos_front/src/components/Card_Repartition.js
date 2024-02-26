import React ,{useState} from 'react';
import {CButton,CCard,CCardBody,CCardText,CCardTitle,CCol,CRow} from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UE from './Maquette/UE';

function Card_Maquette(props) {
    const [modalOpen, setModalOpen] = useState(false);
      
    const toggleModal = () => {
          setModalOpen(!modalOpen);
    };
    return (
        <UE/>

    );
}

export default Card_Maquette;