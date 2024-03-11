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
import {  MAQUETTE_URL } from '../../../Server_URL/Urls';
import Ajouter_Module_Maquette from './_Ajouter/Ajouter_Module_Maquette';
import Ajouter_Formation_Maquette from './_Ajouter/Ajouter_Formation_Maquette ';

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

const HeadersModule = ['Identifiant', 'Libelle', 'Cours', 'Durée', 'Coefficient', 'Objectifs', 'Descriptions'];


function DetailsMaquette ({ maquette }) {
    const [formation, setFormation] = useState({});
    const [module, setModule] = useState({});


    const [ShowEnseignementTable, setShowEnseignementTable] = useState(false);


    const toggleEnseignementTable = () => {
        setShowEnseignementTable(!ShowEnseignementTable);
    };

    useEffect(() => {
        axios.get(`${MAQUETTE_URL}maquette/${maquette.idMaquette}/formation`)
            .then(response => {
                setFormation(response.data);
            console.log("Enseignement data:", formation);    
            })
            .catch(error => console.error("Erreur lors de la récupération des enseignements:", error));
    }, []);
    
    useEffect(() => {
        axios.get(`${MAQUETTE_URL}maquette/${maquette.idMaquette}/modules`)
            .then(response => {
                setModule(response.data);
            console.log("Enseignant.type:", module);    
            })
            .catch(error => console.error("Erreur lors de la récupération des enseignements:", error));
    }, []);

    return (
        <div>
            &nbsp;
            &nbsp;
            <Button 
                href="/listeMaquette" 
                style={{ color: "white", borderRadius: "5px", background: "rgb(9, 44, 38)" }}
            > ⬅
            </Button>            
            <h2 id='title'>{maquette.libelleMaquette}
                <br/>
                <span id='separator'></span>
            </h2>
            <div id='BlockBtn'>
                {/* <Ajouter_Enseignement_Repartition maquette={maquette}/> */}
                <Ajouter_Module_Maquette maquette={maquette}/>
                <Ajouter_Formation_Maquette maquette={maquette}/>
            </div>
            <div id='Block2'>
                <Card id='MyCard1'>
                    <h6 id ='sous-titre'> Formation </h6>
                    {formation && (
                        <>
                        <p> 
                            <b>Libelle :</b>  {formation.libelleFormation}                        
                            <p> 
                            <b>Description :</b> {formation.descriptionFormation}               
                        
                            <p> 
                                <b>Date de Creation :</b>   {formation.dateCreationFormation}                   
                            </p>
                            </p>
                        </p>
                        </>
                    )}
                    {!formation && <p>Pas de Formation à cette maquette</p>}
                </Card>

                {/* <Card id='MyCard1'>
                    <h6 id ='sous-titre'> Module </h6>
                    {module && (
                        <>
                        <p> 
                            <b>Libelle :</b>  {module.libelleModule}                        
                            <p> 
                            <b>Description :</b> {module.descriptionModule}               
                        
                            <p> 
                                <b>Date de Creation :</b>   {module.dateCreationModule}                   
                            </p>
                            </p>
                        </p>
                        </>
                    )}
                    {!module && <p>Pas de module à cette maquette</p>}
                </Card> */}
            </div>
            <div id='Block3'>
                <h3 id='title'>
                   
                    <Button onClick={toggleEnseignementTable}>
                    <span id='separator1'></span>
                    &nbsp;
                        {ShowEnseignementTable ? 'Cacher la liste des Modules' : 'Afficher la liste des Modules'}
                    </Button>
                </h3>
                <br/>
                {ShowEnseignementTable && ( 
                    <TableContainer component={Paper} style={{ width: "70rem", margin: "auto" }}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    {HeadersModule.map((th, index) => (
                                        <StyledTableCell key={index}>{th}</StyledTableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {module.length > 0 && module.map(module => (
                                    <StyledTableRow key={module.idModule}>
                                        <StyledTableCell component="th" scope="row">
                                            {module.idModule}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">{module.libelleModule}</StyledTableCell>
                                        <StyledTableCell align="left">{module.coursModule}</StyledTableCell>
                                        <StyledTableCell align="left">{module.dureeModule }</StyledTableCell>
                                        <StyledTableCell align="left">{module.coefficientModule}</StyledTableCell>
                                        <StyledTableCell align="left">{module.objectifsModule}</StyledTableCell>
                                        <StyledTableCell align="left">{module.descriptionModule}</StyledTableCell>

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

export default DetailsMaquette;
