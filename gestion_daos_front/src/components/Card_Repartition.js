import React ,{useState} from 'react';
import '@coreui/coreui/dist/css/coreui.min.css';
import PER from './_Repartition/PER';
import VAC from './_Repartition/VAC';
import '../styles/general.css'
import AllEnseignant from './_Repartition/AllEnseignant';
import Repartition from './_Repartition/Repartition';

function Card_Maquette(props) {
    const [modalOpen, setModalOpen] = useState(false);
      
    const toggleModal = () => {
          setModalOpen(!modalOpen);
    };
    return (
        <div className='container'>
           <PER/> 
           &nbsp;
           &nbsp;
           <VAC/>
           &nbsp;
           &nbsp;
           <AllEnseignant/>
           &nbsp;
           &nbsp;
           <Repartition/>
        </div>

    );
}

export default Card_Maquette;