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
import {  REPARTITION_URL } from '../../../Server_URL/Urls';
import Ajouter_Enseignement_Repartition from './_Ajouter/Ajouter_Enseignement_Repartition';
import Ajouter_Enseignant_Repartition from './_Ajouter/Ajouter_Enseignant_Repartition';
import Ajouter_Seance_Repartition from './_Ajouter/Ajouter_Seance_Repartition';

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
    const [enseignement, setEnseignement] = useState({});
    const [enseignant, setEnseignant] = useState({});
    const [seance, setSeance] = useState({});


    const [ShowEnseignementTable, setShowEnseignementTable] = useState(false);

    useEffect(() => {
        axios.get(`${REPARTITION_URL}/repartition/${repartition.idRepartition}/seances`)
          .then(res => {
            console.log("les données récupérées depuis la base de données : \n ",res.data);
            setSeance(res.data);
          })
          .catch(err => console.log(err));
    }, []);

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
    
    useEffect(() => {
        axios.get(`${REPARTITION_URL}/repartition/${repartition.idRepartition}/enseignant`)
            .then(response => {
                setEnseignant(response.data);
            console.log("Enseignant.type:", enseignant.typEns);    
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
                <Ajouter_Enseignant_Repartition repartition={repartition}/>
                <Ajouter_Seance_Repartition repartition={repartition}/>
            </div>
            <div id='Block2'>
                <Card id='MyCard1'>
                    <h6 id ='sous-titre'> Enseignement </h6>
                    {enseignement && (
                        <>
                        <p> 
                            <b>Libelle :</b>  {enseignement.libelleEnseignement}                        
                            <p> 
                            <b>Objectif :</b> {enseignement.objectifsEnseignement}               
                        
                            <p> 
                                <b>Description :</b>   {enseignement.descriptionEnseignement}                   
                            </p>
                            </p>
                        </p>
                        </>
                    )}
                    {!enseignement && <p>Pas d'enseignement à cette repartition</p>}
                </Card>
                <Card id='MyCard2'>
                <h6 id ='sous-titre'> Enseignant </h6>
                    {enseignant && (
                        <>
                            <p> 
                                <b>Prenom :</b> {enseignant.prenomEns}   
                            </p>
                                                
                            <p> 
                                <b>Nom :</b> {enseignant.nomEns}                                               
                            </p> 
                            <p>
                                <b>Grade :</b> {enseignant.gradeEns}                      
                            </p>
                        </>
                    )}
                    {!enseignant && <p>Pas d'enseignant à cette repartition</p>}
                </Card>
            </div>
            <div id='Block3'>
                <h3 id='title'>
                   
                    <Button onClick={toggleEnseignementTable}>
                    <span id='separator1'></span>
                    &nbsp;
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
                                {seance.length > 0 && seance.map(seance => (
                                    <StyledTableRow key={seance.idSeance}>
                                        <StyledTableCell component="th" scope="row">
                                            {seance.idSeance}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">{seance.jourSeance}</StyledTableCell>
                                        <StyledTableCell align="left">{seance.dureeSeance}</StyledTableCell>
                                        <StyledTableCell align="left">{seance.debutSeance}</StyledTableCell>
                                        <StyledTableCell align="left">{seance.finSeance}</StyledTableCell>
                                        <StyledTableCell align="left">{seance.numeroSeance}</StyledTableCell>

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
