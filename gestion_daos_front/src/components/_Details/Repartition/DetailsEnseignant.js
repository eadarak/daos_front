import React, { useState, useEffect } from 'react';
import { Card } from '@mui/material';
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
import { REPARTITION_URL } from '../../../Server_URL/Urls';
import Ajouter_Rep_Ens from './_Ajouter/Ajouter_Rep_Ens';

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

const HeadersRepartition = [ 
                    'Identifiant', 
                    'Description Repartition',
                    'Seance',
                    'Date de Creation', 
                    'Enseignant',
                    'Enseignement' 
                ]

function DetailsEnseignant ({ ens }) {
    const [repartition, setrepartition] = useState([]);

    useEffect(() => {
        axios.get(`${REPARTITION_URL}/repartition/${ens.idRepartition}/enseignant`)
          .then(res => {
            console.log("les donnes recuperees depuis la db : \n ",res.data)
            setrepartition(res.data)
          })
          .catch(err => console.log(err));
      },[]);
    
    return (
        <div>
        <h2 id='title'>  {ens.prenomEns[0]}.{ens.nomEns} <br/>                
            <span id='separator'></span>
        </h2>
        <div id='BlockBtn'>
            <Ajouter_Rep_Ens ens={ens}/>   
        </div>
        
        <div id='Block2'>
            <Card id='MyCard1'>
                <p><b>Prenom :</b> {ens.prenomEns} </p>
                <p><b>Nom :</b> {ens.nomEns} </p>
               
            </Card>
            <Card id='MyCard2'>
                <p><b>Grade :</b> {ens.gradeEns} </p>
                <p><b>Matricule_Per :</b> {ens.matriculePer} </p>
                <p><b>date Creation :</b> {ens.dateCreationEns} </p>
            </Card>
        </div>
        <div id='Block3'>
            <h3 id='title'>
                <span id='separator1'></span>
                &nbsp;Liste des Repartitions
            </h3>
            <br/>
            <TableContainer component={Paper} style={{ width: "70rem", margin: "auto" }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                        {HeadersRepartition.map((th, index) => (
                            <StyledTableCell key={index}>{th}</StyledTableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {repartition.length > 0 && repartition.map(ec => (
                            <StyledTableRow key={repartition.id}>
                                <StyledTableCell component="th" scope="row">
                                    {repartition.idRepartition}
                                </StyledTableCell>
                                <StyledTableCell align="center">{repartition.descriptionRepartition}</StyledTableCell>
                                <StyledTableCell align="center">{repartition.seance}</StyledTableCell>
                                <StyledTableCell align="center">{repartition.dateCreationRepartition}</StyledTableCell>
                                <StyledTableCell align="center">{repartition.enseignant}</StyledTableCell>
                                <StyledTableCell align="center">{repartition.enseignement}</StyledTableCell>
                                {/* <StyledTableCell align="center">{repartition.coefficientEC}</StyledTableCell> */}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </div>
  )
}

export default DetailsEnseignant;