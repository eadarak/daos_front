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
import { EMPLOI_URL } from '../../../Server_URL/Urls';
import Ajouter_Salle_Batiment from './_Ajouter/Ajouter_Salle_Batiment';




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

const HeadersSalle = ['Identifiant', 'Libelle', 'Code', 'Capacite'];

function DetailsBatiment ({ batiment }) {
    const [salles, setSalle] = useState([]);
    const [showSalleTable, setShowSalleTable] = useState(false);

    useEffect(() => {
        axios.get(`${EMPLOI_URL}/batiment/${batiment.idBatiment}/salles`)
          .then(res => {
            console.log("Les données récupérées depuis la base de données : \n ",res.data);
           setSalle(res.data);
          })
          .catch(err => console.log(err));
    }, []);

    const toggleSalleTable = () => {
        setShowSalleTable(!showSalleTable);
    };
    return (
        <div>
            <h2 id='title'>{batiment.libelleBatiment}</h2>
            <div id='BlockBtn'>
                <Ajouter_Salle_Batiment batiment={batiment} />
            </div>
            
            <div id='Block2'>
                <Card id='MyCard1'>
                    <p><b>Description :</b> <br/>
                        {batiment.descriptionBatiment}
                    </p>
                </Card>
                <Card id='MyCard2'>
                    <p><b>Code :</b> {batiment.codeBatiment} </p>
                    <p><b>Position :</b> {batiment.positionBatiment} </p>
                </Card>
            </div>
            <div id='Block3'>
                <h3 id='title'>
                    <span id='separator1'></span>
                    &nbsp;
                    <Button onClick={toggleSalleTable}>
                        {showSalleTable ? 'Cacher la liste des Salle' : 'Afficher la liste des Salles'}
                    </Button>
                </h3>
                <br/>
                {showSalleTable && (  
                <TableContainer component={Paper} style={{ width: "70rem", margin: "auto", marginBottom: "1.5rem" }}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {HeadersSalle.map((th, index) => (
                                    <StyledTableCell key={index}>{th}</StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {salles.length > 0 && salles.map(salle => (
                                <StyledTableRow key={salle.idSalle}>
                                    <StyledTableCell component="th" scope="row">
                                        {salle.idSalle}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{salle.libelleSalle}</StyledTableCell>
                                    <StyledTableCell align="left">{salle.codeSalle}</StyledTableCell>
                                    <StyledTableCell align="left">{salle.capaciteSalle}</StyledTableCell>
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

export default DetailsBatiment;
