/* eslint-disable react/jsx-pascal-case */
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
import { MAQUETTE_URL, REPARTITION_URL } from '../../../Server_URL/Urls';
import Ajouter_Enseignement_Repartition from './_Ajouter/Ajouter_Enseignement_Repartition';

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

const HeadersSeance = [
      'Identifiant', 'Jour','Durée' , 'Heure de Début' ,'Heure de Fin','Numéro de Séance' 
];

function DetailsRepartition ({ repartition }) {
    const [enseignements, setEnseignements] = useState([]);
    const [enseignement, setEnseignement] = useState({});
    const [ShowEnseignementTable, setShowEnseignementTable] = useState(false);

    useEffect(() => {
        axios.get(`${REPARTITION_URL}/repartition/${repartition.idRepartition}/seances`)
          .then(res => {
            console.log("les données récupérées depuis la base de données : \n ",res.data);
            setEnseignements(res.data);
          })
          .catch(err => console.log(err));
    }, [repartition.idRepartition]);

    const toggleEnseignementTable = () => {
        setShowEnseignementTable(!ShowEnseignementTable);
    };

    useEffect(() => {
        axios.get(`${REPARTITION_URL}/repartition/${repartition.idRepartition}/enseignement`)
            .then(response => {
                setEnseignement(response.data);
            console.log("Enseignement data:", enseignement);    
            })
            .catch(error => console.error("Erreur lors de la récupération des enseignements:", error));
    }, []);

    return (
        <div>
            &nbsp;
            &nbsp;
            <Button 
                href="/listeRepartition" 
                style={{ color: "white", borderRadius: "5px", background: "rgb(9, 44, 38)" }}
            > ⬅
            </Button>            
            <h2 id='title'>{repartition.descriptionRepartition}
                <br/>
                <span id='separator'></span>
            </h2>
            <div id='BlockBtn'>
                <Ajouter_Enseignement_Repartition repartition={repartition}/>
            </div>
            <div id='Block2'>
                <Card id='MyCard1'>
                    <p><b>Description :</b> <br/>
                        {repartition.descriptionRepartition}         
                    </p>
                </Card>
                <Card id='MyCard2'>
                    <h6 sx={{textAlign:"center !important"}}> <b>Enseignement</b> </h6>
                    <p><b>Libellé  :</b> {enseignement.libelleEnseignement} </p>
                    <p><b>Objectif  :</b> {enseignement.objectifsEnseignement} </p>
                    <p><b>Description  :</b> {enseignement.descriptionEnseignement} </p>
                </Card>
            </div>
            <div id='Block3'>
                <h3 id='title'>
                    <span id='separator1'></span>
                    &nbsp;
                    <Button onClick={toggleEnseignementTable}>
                        {ShowEnseignementTable ? 'Cacher la liste des Seances' : 'Afficher la liste des Seances'}
                    </Button>
                </h3>
                <br/>
                {ShowEnseignementTable && ( 
                    <TableContainer component={Paper} style={{ width: "70rem", margin: "auto" }}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    {HeadersSeance.map((th, index) => (
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

export default DetailsRepartition;
