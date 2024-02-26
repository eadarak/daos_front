import React , {useState}from 'react';
import {CButton,CCard,CCardBody,CCardText,CCardTitle,CCol,CRow} from '@coreui/react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '@coreui/coreui/dist/css/coreui.min.css';
import '../styles/general.css'
import UE from './Maquette/UE';
function Card_Maquette(props) {
   
    const [modalOpen, setModalOpen] = useState(false);
      
    const toggleModal = () => {
          setModalOpen(!modalOpen);
    };
    
   
 
    return (
        <div>
           <UE/>
        </div>
    );
}

export default Card_Maquette;