import React, { useState, useEffect } from 'react';
import { Button, Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import '../../../styles/general.css';
import { MAQUETTE_URL } from '../../../Server_URL/Urls';
import Ajouter_Formation_Niveau from './_Ajouter/Ajouter_Formation_Niveau';
;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "rgb(9, 44, 38)",
        color: theme.palette.common.white,
        fontWeight: 600
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const HeadersFormation = ['Identifiant', 'Libelle','Date de Creation'];

function DetailsNiveau ({ niveau }) {
    const [formations, setFormations] = useState([]);
    const [cycle, setCycle] = useState({})
    const [ShowFormationTable, setShowFormationTable] = useState(false);

    useEffect(() => {
        axios.get(`${MAQUETTE_URL}niveau/${niveau.idNiveau}/formations`)
          .then(res => {
            console.log("les données récupérées depuis la base de données : \n ",res.data);
            setFormations(res.data);
          })
          .catch(err => console.log(err));

          axios.get(`${MAQUETTE_URL}niveau/${niveau.idNiveau}/cycle`)
          .then(res => {
            console.log("les données récupérées depuis la base de données : \n ",res.data);
            setCycle(res.data);
          })
          .catch(err => console.log(err));
    }, [niveau.idNiveau]);

  

    const toggleModuleTable = () => {
        setShowFormationTable(!ShowFormationTable);
    };

    return (
        <div>
             &nbsp;
            <Button 
                href="/listes-niveau" 
                style={{ color: "white", borderRadius: "5px", background: "rgb(9, 44, 38)" }}
            > ⬅
            </Button>
            <h2 id='title'>{niveau.descriptionNiveau}
            <br></br>
            <span id='separator'></span>
            </h2>
            
            <div id='BlockBtn'>
                <Ajouter_Formation_Niveau niveau={niveau}/>
            </div>
            
            <div id='Block2'>
                <Card id='MyCard1'>
                <p><b>Identifiant : </b>  &nbsp;
                        {niveau.idNiveau}
                    </p>
                    <p><b>Description : </b> 
                        {niveau.descriptionNiveau}
                    </p>
                    <p><b>Libelle : </b>  
                        {niveau.libelleNiveau}
                    </p>
                    <p><b>Date de Creation : </b>  
                        {niveau.dateCreationNiveau}
                    </p>
                </Card>
                {/* <Card id='MyCard2'>
                    <p><b>Cycle : </b>{cycle.libelleCycle}</p>
                    <p><b>Description : </b>{cycle.descriptionCycle}</p>
                    <p><b>Date Creation : </b>{cycle.dateCreationCycle}</p>

                </Card> */}
            </div>
            <div id='Block3'>
                <h3 id='title'>
                    <span id='separator1'></span>
                    &nbsp;
                    <Button onClick={toggleModuleTable}>
                        {ShowFormationTable ? 'Cacher la liste des Formations' : 'Afficher la liste des Formations'}
                    </Button>
                </h3>
                <br/>
                {ShowFormationTable && ( 
                <TableContainer component={Paper} style={{ width: "70rem", margin: "auto" }}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {HeadersFormation.map((th, index) => (
                                    <StyledTableCell key={index}>{th}</StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {formations.length > 0 && formations.map(formation => (
                                <StyledTableRow key={formation.idFormation}>
                                    <StyledTableCell component="th" scope="row">
                                        {formation.idFormation}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{formation.libelleFormation}</StyledTableCell>
                                    <StyledTableCell align="left">{formation.dateCreationFormation}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                )}
            </div>
        </div>
    );
}

export default DetailsNiveau;
