import React , {useState}from 'react';
import '@coreui/coreui/dist/css/coreui.min.css';
import '../styles/general.css'
import UE from './_Maquette/UE';
import Semestre from './_Maquette/Semestre';
import Niveau from './_Maquette/Niveau';
import EC from './_Maquette/EC';
function Card_Maquette(props) {
   
    const [modalOpen, setModalOpen] = useState(false);
      
    const toggleModal = () => {
          setModalOpen(!modalOpen);
    };
    
   
 
    return (
        <div>
           <UE/>
           <EC/>
        </div>
    );
}

export default Card_Maquette;