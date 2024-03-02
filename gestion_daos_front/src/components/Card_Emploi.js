import React ,{useState} from 'react';
import '@coreui/coreui/dist/css/coreui.min.css';
import '../styles/general.css'
import Batiment from './_Emploi/Batiment';
import Deroulement from './_Emploi/Deroulement';
import Salle from './_Emploi/Salle';
import Seance from './_Emploi/Seance';

function Card_Emploi(props) {
    const [modalOpen, setModalOpen] = useState(false);
      
    const toggleModal = () => {
          setModalOpen(!modalOpen);
    };
    return (
        <div className='container'>
          <Batiment/>
           &nbsp;
           &nbsp;
           <Deroulement/>
           &nbsp;
           &nbsp;
           <Salle/>
           &nbsp;
           &nbsp;
           <Seance/>
          
           
        </div>

    );
}

export default Card_Emploi;