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
import Ajouter_EC_UE from './_Ajouter/Ajouter_EC_UE';
import Ajouter_Module_Semestre from './_Ajouter/Ajouter_Module_Semestre';
import Ajouter_Classe_Semestre from './_Ajouter/Ajouter_Classe_Semestre';

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

const HeadersClasse = ['Identifiant', 'Libelle', 'Effectif' , 'Nombre de Groupe(s)', 'Date Creation', ''];
const HeadersModule = ['Identifiant', 'Libelle', 'Cours', 'Durée', 'Coefficient'];

function DetailsSemestre ({ semestre }) {
    const [classes, setClasses] = useState([]);
    const [modules, setModules] = useState([]);
    const [ShowEcsTable, setShowEcsTable] = useState(false);
    const [ShowModuleTable, setShowModuleTable] = useState(false);

    useEffect(() => {
        axios.get(`${MAQUETTE_URL}semestre/${semestre.idSemestre}/classes`)
          .then(res => {
            console.log("les données récupérées depuis la base de données : \n ",res.data);
            setClasses(res.data);
          })
          .catch(err => console.log(err));

        axios.get(`${MAQUETTE_URL}semestre/${semestre.idSemestre}/modules`)
          .then(res => {
            console.log("les données récupérées depuis la base de données : \n ",res.data);
            setModules(res.data);
          })
          .catch(err => console.log(err));
    }, []);

    const toggleEcsTable = () => {
        setShowEcsTable(!ShowEcsTable);
    };

    const toggleModuleTable = () => {
        setShowModuleTable(!ShowModuleTable);
    };

    return (
        <div>
    
     &nbsp;
      <Button 
        href="/listeSemestre" 
        style={{ color: "white", borderRadius: "5px", background: "rgb(9, 44, 38)" }}
      > ⬅
      </Button>            
            <h2 id='title'>{semestre.libelleSemestre}
            <br/><span id='separator'></span></h2>
            <div id='BlockBtn'>
                <Ajouter_Classe_Semestre semestre={semestre}/>
                <Ajouter_Module_Semestre semestre={semestre}/>
            </div>
            
            <div id='Block2'>
                <Card id='MyCard1'>
                    <br/>
                    <h5 id='sous-titre'>Info Semestre </h5>
                    
                    <p><b>Description :</b> <br/>
                        {semestre.descriptionSemestre}
                    </p>
                    <p><b>Date de Creation :</b> <br/>
                        {semestre.dateCreationSemestre}
                    </p>
                </Card>
                {/* <Card id='MyCard2'>
                    <p><b>Code :</b> {ue.codeUE} </p>
                    <p><b>Credit :</b> {ue.creditUE} </p>
                    <p><b>Coefficient :</b> {ue.coefficientUE} </p>
                    <p><b>Date de Création :</b> {ue.dateCreationUE} </p>
                </Card> */}
            </div>
            <div id='Block3'>
                <h3 id='title'>
                    <span id='separator1'></span>
                    &nbsp;
                    <Button onClick={toggleEcsTable}>
                        {ShowEcsTable ? 'Cacher la liste des Classes' : 'Afficher la liste des Classes'}
                    </Button>
                </h3>
                <br/>
                {ShowEcsTable && (  
                <TableContainer component={Paper} style={{ width: "70rem", margin: "auto", marginBottom: "1.5rem" }}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {HeadersClasse.map((th, index) => (
                                    <StyledTableCell key={index}>{th}</StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {classes.length > 0 && classes.map(classe => (
                                <StyledTableRow key={classe.idClasse}>
                                    <StyledTableCell component="th" scope="row">
                                        {classe.idClasse}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{classe.libelleClasse}</StyledTableCell>
                                    <StyledTableCell align="left">{classe.effectifClasse}</StyledTableCell>
                                    <StyledTableCell align="left">{classe.nbreGroupeClasse}</StyledTableCell>
                                    <StyledTableCell align="left">{classe.dateCreationClasse}</StyledTableCell>
                                    <StyledTableCell align="left"> <Button href='/listes-classe' variant='outlined'>Voir Liste </Button> </StyledTableCell>



                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                )}

                <h3 id='title'>
                    <span id='separator1'></span>
                    &nbsp;
                    <Button onClick={toggleModuleTable}>
                        {ShowModuleTable ? 'Cacher la liste des Modules' : 'Afficher la liste des Modules'}
                    </Button>
                </h3>
                <br/>
                {ShowModuleTable && ( 
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
                            {modules.length > 0 && modules.map(module => (
                                <StyledTableRow key={module.idModule}>
                                    <StyledTableCell component="th" scope="row">
                                        {module.idModule}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{module.libelleModule}</StyledTableCell>
                                    <StyledTableCell align="left">{module.coursModule}</StyledTableCell>
                                    <StyledTableCell align="left">{module.dureeModule}</StyledTableCell>
                                    <StyledTableCell align="left">{module.coefficientModule}</StyledTableCell>
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

export default DetailsSemestre;