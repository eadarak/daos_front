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

const HeadersEC = ['Identifiant', 'Libelle', 'Code', 'CM', 'TD', 'TP', 'CM + TD/TP', 'TPE', 'VHT', 'coefficient' ]

function DetailsEC ({ ec }) {
    const [ecs, setEcs] = useState([]);

    useEffect(() => {
        axios.get(`${MAQUETTE_URL}ec/${ec.idEC}/ecs`)
          .then(res => {
            console.log("les donnes recuperees depuis la db : \n ",res.data)
            setEcs(res.data)
          })
          .catch(err => console.log(err));
      },[]);
    
    return (
        <div>
        <h2 id='title'>  {ec.libelleEC}</h2>
        <div id='BlockBtn'>
            <Ajouter_EC_UE ec={ec}/>   
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
                <p><b>Travaux Diriges :</b> {ec.td} </p>
                <p><b>Travaux Pratiques :</b> {ec.tp} </p>
                <p><b>Travail Personnel Etudiant :</b> {ec.tpe} </p>
                <p><b>Coefficient :</b> {ec.coefficientEC} </p>
                <p><b>date Creation :</b> {ec.dateCreationEC} </p>
            </Card>
        </div>
        <div id='Block3'>
            <h3 id='title'>
                <span id='separator1'></span>
                &nbsp;Liste des Seances
            </h3>
            <br/>
            <TableContainer component={Paper} style={{ width: "70rem", margin: "auto" }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                        {HeadersEC.map((th, index) => (
                            <StyledTableCell key={index}>{th}</StyledTableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ecs.length > 0 && ecs.map(ec => (
                            <StyledTableRow key={ec.id}>
                                <StyledTableCell component="th" scope="row">
                                    {ec.idEC}
                                </StyledTableCell>
                                <StyledTableCell align="center">{ec.libelleEC}</StyledTableCell>
                                <StyledTableCell align="center">{ec.codeEC}</StyledTableCell>
                                <StyledTableCell align="center">{ec.cm}</StyledTableCell>
                                <StyledTableCell align="center">{ec.td}</StyledTableCell>
                                <StyledTableCell align="center">{ec.tp}</StyledTableCell>
                                <StyledTableCell align="center">{ec.cm + ec.td + ec.tp}</StyledTableCell>
                                <StyledTableCell align="center">{ec.tpe}</StyledTableCell>
                                <StyledTableCell align="center">{ec.cm + ec.td + ec.tp + ec.tpe}</StyledTableCell>
                                <StyledTableCell align="center">{ec.coefficientEC}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </div>
  )
}

export default DetailsEC