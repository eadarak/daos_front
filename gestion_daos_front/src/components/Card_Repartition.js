import React ,{useState} from 'react';
import {CButton,CCard,CCardBody,CCardText,CCardTitle,CCol,CRow} from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function Card_Maquette(props) {
    const [modalOpen, setModalOpen] = useState(false);
      
    const toggleModal = () => {
          setModalOpen(!modalOpen);
    };
    return (
        <div>
            <CRow>
                <CCol sm={3} >
                    <CCard  id="card">
                    <CCardBody >
                    <CButton 
                        className="btn-icon btn-light btn-sm" 
                        onClick={toggleModal} 
                        style={{ position: 'absolute', top: '5px', right: '5px' }}
                    >
                        <MoreVertIcon />
                    </CButton>
                        <CCardTitle>→<b> &nbsp;Page UE</b></CCardTitle>
                        <CCardText>
                            Cette page vous redirige dans vers la liste des UE.
                        </CCardText>
                        <CButton href="#" id='mybtnStyle'>Voir liste UE </CButton>
                    </CCardBody>
                    </CCard>
                </CCol>
                <CCol sm={3} >
                    <CCard id="card">
                    <CCardBody>
                        <CButton 
                            className="btn-icon btn-light btn-sm" 
                            onClick={toggleModal} 
                            style={{ position: 'absolute', top: '5px', right: '5px' }}
                        >
                            <MoreVertIcon />
                        </CButton>
                        <CCardTitle>→<b> &nbsp;Page UE</b></CCardTitle>
                        <CCardText>
                            Cette page vous redirige dans vers la liste des UE.
                        </CCardText>
                        <CButton href="#" id='mybtnStyle'>Voir liste UE </CButton>
                    </CCardBody>
                    </CCard>
                </CCol>
                <CCol sm={3} >
                 

                    <CCard id="card">
                    <CCardBody>
                    <CButton 
                            className="btn-icon btn-light btn-sm" 
                            onClick={toggleModal} 
                            style={{ position: 'absolute', top: '5px', right: '5px' }}
                        >
                            <MoreVertIcon />
                        </CButton>    
                        <CCardTitle>→<b> &nbsp;Page UE</b></CCardTitle>
                        <CCardText>
                            Cette page vous redirige dans vers la liste des UE.
                        </CCardText>
                        <CButton href="#" id='mybtnStyle'>Voir liste UE </CButton>
                    </CCardBody>
                    </CCard>
                </CCol>
                <CCol sm={3} >

                    <CCard id="card">
                    <CCardBody>
                    <CButton 
                            className="btn-icon btn-light btn-sm" 
                            onClick={toggleModal} 
                            style={{ position: 'absolute', top: '5px', right: '5px' }}
                        >
                            <MoreVertIcon />
                        </CButton>
                        <CCardTitle>→<b> &nbsp;Page UE</b></CCardTitle>
                        <CCardText>
                            Cette page vous redirige dans vers la liste des UE.
                        </CCardText>
                        <CButton href="#" id='mybtnStyle'>Voir liste UE </CButton>
                    </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    );
}

export default Card_Maquette;