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
import Ajouter_Module_UE from './_Ajouter/Ajouter_Module_UE';

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

const HeadersEC = ['UE','Credits','Intitule', 'CM', 'TD', 'TP', 'CM + TD/TP', 'TPE', 'VHT', 'coefficient' ];
const HeadersModule = ['Identifiant', 'Libelle', 'Cours', 'Durée', 'Coefficient'];

function DetailsUE ({ ue }) {
    const [ecs, setEcs] = useState([]);
    const [modules, setModules] = useState([]);
    const [ShowEcsTable, setShowEcsTable] = useState(false);
    const [ShowModuleTable, setShowModuleTable] = useState(false);

    useEffect(() => {
        axios.get(`${MAQUETTE_URL}ue/${ue.idUE}/ecs`)
          .then(res => {
            console.log("les données récupérées depuis la base de données : \n ",res.data);
            setEcs(res.data);
          })
          .catch(err => console.log(err));

        axios.get(`${MAQUETTE_URL}ue/${ue.idUE}/modules`)
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
      &nbsp;
      <Button 
        href="/listeUE" 
        style={{ color: "white", borderRadius: "5px", background: "rgb(9, 44, 38)" }}
      > ⬅
      </Button>            
            <h2 id='title'>{ue.libelleUE}
                <br/> <span id='separator'></span>
            </h2>
            <div id='BlockBtn'>
                <Ajouter_EC_UE ue={ue}/>
                <Ajouter_Module_UE ue={ue}/>
            </div>
            
            <div id='Block2'>
                <Card id='MyCard1'>
                    <p><b>Description :</b> <br/>
                        {ue.descriptionUE}
                    </p>
                </Card>
                <Card id='MyCard2'>
                    <p><b>Code :</b> {ue.codeUE} </p>
                    <p><b>Credit :</b> {ue.creditUE} </p>
                    <p><b>Coefficient :</b> {ue.coefficientUE} </p>
                    <p><b>Date de Création :</b> {ue.dateCreationUE} </p>
                </Card>
            </div>
            <div id='Block3'>
                <h3 id='title'>
                    <span id='separator1'></span>
                    &nbsp;
                    <Button onClick={toggleEcsTable}>
                        {ShowEcsTable ? 'Cacher la liste des ECs' : 'Afficher la liste des ECs'}
                    </Button>
                </h3>
                <br/>
                {ShowEcsTable && (  
                <TableContainer component={Paper} style={{ width: "70rem", margin: "auto", marginBottom: "1.5rem" }}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {HeadersEC.map((th, index) => (
                                    <StyledTableCell key={index}>{th}</StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        {/* <TableBody>
                        <StyledTableRow> */}
                        {/* {ecs.length > 0 && ecs.map(ec => (
                                <StyledTableRow key={ec.idEC}>
                                    <StyledTableCell component="th" rowSpan={ecs.length}>
                                        {`${ue.codeUE} - ${ue.libelleUE}`}
                                    </StyledTableCell>
                                    </StyledTableRow>
                           
                                    {/* <StyledTableCell component="th" scope="row">
                                        {ec.idEC}
                                    </StyledTableCell> *
                                    <StyledTableCell align="left">{ec.libelleEC}</StyledTableCell>
                                    <StyledTableCell align="left">{ec.codeEC}</StyledTableCell>
                                    <StyledTableCell align="left">{ec.cm}</StyledTableCell>
                                    <StyledTableCell align="left">{ec.td}</StyledTableCell>
                                    <StyledTableCell align="left">{ec.tp}</StyledTableCell>
                                    <StyledTableCell align="left">{ec.cm + ec.td + ec.tp}</StyledTableCell>
                                    <StyledTableCell align="left">{ec.tpe}</StyledTableCell>
                                    <StyledTableCell align="left">{ec.cm + ec.td + ec.tp + ec.tpe}</StyledTableCell>
                                    <StyledTableCell align="left">{ec.coefficientEC}</StyledTableCell>
                                </StyledTableRow>
                            ))}

                        </TableBody> */}
                        <TableBody>
                            {/* Première ligne pour l'UE */}
                            <StyledTableRow>
                                <StyledTableCell component="th" rowSpan={ecs.length + 1}>
                                    {`${ue.codeUE} - ${ue.libelleUE}`}
                                </StyledTableCell>
                                <StyledTableCell component="th" rowSpan={ecs.length + 1}>
                                    {ue.creditUE}
                                </StyledTableCell>
                            </StyledTableRow>
                            

                            {/* Lignes pour les éléments constitutifs */}
                            {ecs.map(ec => (
                                <StyledTableRow key={ec.idEC}>
                                   <StyledTableCell align="left">{`${ec.codeEC} - ${ec.libelleEC}`}</StyledTableCell>
                                    <StyledTableCell align="left">{ec.cm}</StyledTableCell>
                                    <StyledTableCell align="left">{ec.td}</StyledTableCell>
                                    <StyledTableCell align="left">{ec.tp}</StyledTableCell>
                                    <StyledTableCell align="left">{ec.cm + ec.td + ec.tp}</StyledTableCell>
                                    <StyledTableCell align="left">{ec.tpe}</StyledTableCell>
                                    <StyledTableCell align="left">{ec.cm + ec.td + ec.tp + ec.tpe}</StyledTableCell>
                                    <StyledTableCell align="left">{ec.coefficientEC}</StyledTableCell>
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

export default DetailsUE;