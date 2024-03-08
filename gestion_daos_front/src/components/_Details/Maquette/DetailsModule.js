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
import Ajouter_Module_EC from './_Ajouter/Ajouter_Module_EC';
import Ajouter_Enseignement_Module from './_Ajouter/Ajouter_Enseignement_Module';

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

const HeadersEnseignement = ['Identifiant', 'Libelle', 'Objectifs'];

function DetailsModule({ module }) {
    const [enseignements, setEnseignements] = useState([]);
    const [ShowEnseignementTable, setShowEnseignementTable] = useState(false);

    useEffect(() => {
        axios.get(`${MAQUETTE_URL}module/${module.idModule}/enseignements`)
          .then(res => {
            console.log("les données récupérées depuis la base de données : \n ",res.data);
            setEnseignements(res.data);
          })
          .catch(err => console.log(err));
    }, []);

  

    const toggleModuleTable = () => {
        setShowEnseignementTable(!ShowEnseignementTable);
    };
    return (
        <div>
            <h2 id='title'>{module.libelleModule}</h2>
            <div id='BlockBtn'>
                <Ajouter_Enseignement_Module module={module}/>
            </div>
            <div id='Block2'>
                <Card id='MyCard1'>
                    <p><b>Description :</b> <br />
                        {module.descriptionModule}
                    </p>
                </Card>
                <Card id='MyCard2'>
                    <p><b>Libelle :</b> {module.libelleModule} </p>
                    <p><b>Cours :</b> {module.coursModule} </p>
                    <p><b>Duree :</b> {module.dureeModule} </p>
                    <p><b>Coefficient :</b> {module.coefficientModule} </p>
                </Card>
            </div>
            <div id='Block3'>
                <h3 id='title'>
                    <span id='separator1'></span>
                    &nbsp;
                    <Button onClick={toggleModuleTable}>
                        {ShowEnseignementTable ? 'Cacher la liste des Enseignements' : 'Afficher la liste des Enseignements'}
                    </Button>
                </h3>
                <br/>
                {ShowEnseignementTable && ( 
                <TableContainer component={Paper} style={{ width: "70rem", margin: "auto" }}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {HeadersEnseignement.map((th, index) => (
                                    <StyledTableCell key={index}>{th}</StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {enseignements.length > 0 && enseignements.map(enseignement => (
                                <StyledTableRow key={enseignement.idEnseignement}>
                                    <StyledTableCell component="th" scope="row">
                                        {enseignement.idEnseignement}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{enseignement.libelleEnseignement}</StyledTableCell>
                                    <StyledTableCell align="left">{enseignement.objectifsEnseignement}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                )}
            </div>
        </div>
    )
}

export default DetailsModule;
