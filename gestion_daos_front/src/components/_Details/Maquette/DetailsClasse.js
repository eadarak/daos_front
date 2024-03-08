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
import Ajouter_Groupe_Classe from './_Ajouter/Ajouter_Groupe_Classe';
import Ajouter_Enseignement_Classe from './_Ajouter/Ajouter_Enseignement_Classe';
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

const HeadersGroupe = ['Identifiant', 'Libelle', 'Numero', 'Effectif'];
const HeadersEnseignement = ['Identifiant', 'Libelle', 'Objectifs'];

function DetailsClasse ({ classe }) {
    const [groupes, setGroupes] = useState([]);
    const [enseignements, setEnseignements] = useState([]);
    const [showGroupesTable, setShowGroupesTable] = useState(false);
    const [ShowEnseignementTable, setShowEnseignementTable] = useState(false);

    useEffect(() => {
        axios.get(`${MAQUETTE_URL}classe/${classe.idClasse}/groupes`)
          .then(res => {
            console.log("les données récupérées depuis la base de données : \n ",res.data);
            setGroupes(res.data);
          })
          .catch(err => console.log(err));

        axios.get(`${MAQUETTE_URL}classe/${classe.idClasse}/enseignements`)
          .then(res => {
            console.log("les données récupérées depuis la base de données : \n ",res.data);
            setEnseignements(res.data);
          })
          .catch(err => console.log(err));
    }, []);

    const toggleGroupesTable = () => {
        setShowGroupesTable(!showGroupesTable);
    };

    const toggleEnseignementTable = () => {
        setShowEnseignementTable(!ShowEnseignementTable);
    };

    return (
        <div>
            <h2 id='title'>{classe.libelleClasse}</h2>
            <div id='BlockBtn'>
                <Ajouter_Groupe_Classe classe={classe}/>
                <Ajouter_Enseignement_Classe classe={classe}/>
            </div>
            
            <div id='Block2'>
                <Card id='MyCard1'>
                    <p><b>Description :</b> <br/>
                        {classe.descriptionClasse}
                    </p>
                </Card>
                <Card id='MyCard2'>
                    <p><b>Effectif :</b> {classe.effectifClasse} </p>
                    <p><b>Nombre de Groupe :</b> {classe.nbreGroupeClasse} </p>
                </Card>
            </div>
            <div id='Block3'>
                <h3 id='title'>
                    <span id='separator1'></span>
                    &nbsp;
                    <Button onClick={toggleGroupesTable}>
                        {showGroupesTable ? 'Cacher la liste des Groupes' : 'Afficher la liste des Groupes'}
                    </Button>
                </h3>
                <br/>
                {showGroupesTable && (  
                <TableContainer component={Paper} style={{ width: "70rem", margin: "auto", marginBottom: "1.5rem" }}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {HeadersGroupe.map((th, index) => (
                                    <StyledTableCell key={index}>{th}</StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {groupes.length > 0 && groupes.map(groupe => (
                                <StyledTableRow key={groupe.idGroupe}>
                                    <StyledTableCell component="th" scope="row">
                                        {groupe.idGroupe}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{groupe.libelleGroupe}</StyledTableCell>
                                    <StyledTableCell align="left">{groupe.numeroGroupe}</StyledTableCell>
                                    <StyledTableCell align="left">{groupe.effectifGroupe}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                )}

                <h3 id='title'>
                    <span id='separator1'></span>
                    &nbsp;
                    <Button onClick={toggleEnseignementTable}>
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
    );
}

export default DetailsClasse;
