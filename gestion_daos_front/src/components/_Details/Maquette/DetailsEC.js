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

const HeadersModule = ['Identifiant', 'Libelle', 'Cours', 'Durée', 'Coefficient'];

function DetailsEC ({ ec }) {
    const [module, setModule] = useState([]);

    useEffect(() => {
        axios.get(`${MAQUETTE_URL}ec/${ec.idEC}/modules`)
          .then(res => {
            console.log("les données récupérées depuis la DB : \n ",res.data)
            setModule(res.data)
          })
          .catch(err => console.log(err));
      },[ec.idEC]);
    
    return (
        <div>
            <h2 id='title'>{ec.libelleEC}</h2>
            <div id='BlockBtn'>
                <Ajouter_Module_EC ec={ec} />
            </div>
            <div id='Block2'>
                <Card id='MyCard1'>
                    <p><b>Description :</b> <br/>
                        {ec.descriptionEC}
                    </p>
                </Card>
                <Card id='MyCard2'>
                    <p><b>Code :</b> {ec.codeEC} </p>
                    <p><b>Cours Magistral :</b> {ec.cm} </p>
                    <p><b>Travaux Dirigés :</b> {ec.td} </p>
                    <p><b>Travaux Pratiques :</b> {ec.tp} </p>
                    <p><b>Travail Personnel Etudiant :</b> {ec.tpe} </p>
                    <p><b>Coefficient :</b> {ec.coefficientEC} </p>
                    <p><b>Date de Création :</b> {ec.dateCreationEC} </p>
                </Card>
            </div>
            <div id='Block3'>
                <h3 id='title'>
                    <span id='separator1'></span>
                    &nbsp;Liste des Modules
                </h3>
                <br/>
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
                            {module.length > 0 && module.map(mod => (
                                <StyledTableRow key={mod.idModule}>
                                    <StyledTableCell component="th" scope="row">
                                        {mod.idModule}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{mod.libelleModule}</StyledTableCell>
                                    <StyledTableCell align="left">{mod.coursModule}</StyledTableCell>
                                    <StyledTableCell align="left">{mod.dureeModule}</StyledTableCell>
                                    <StyledTableCell align="left">{mod.coefficientModule}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default DetailsEC;
