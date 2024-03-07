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

const HeadersSeance = ['Identifiant', 'Jour', 'Duree', 'Heure Debut', 'Heure Fin', 'Numero Seance'];

function DetailsSalle ({ salle }) {
    const [seances, setSeance] = useState([]);
    const [showSeanceTable, setShowSeanceTable] = useState(false);

    useEffect(() => {
        axios.get(`${EMPLOI_URL}/salle/${salle.idSalle}/seances`)
          .then(res => {
            console.log("Les données récupérées depuis la base de données : \n ",res.data);
           setSeance(res.data);
          })
          .catch(err => console.log(err));
    }, []);

    const toggleSeanceTable = () => {
        setShowSeanceTable(!showSeanceTable);
    };
    return (
        <div>
            <h2 id='title'>{salle.libelleSalle}</h2>
            <div id='BlockBtn'>
            </div>
            
            <div id='Block2'>
                <Card id='MyCard1'>
                    <p><b>Description :</b> <br/>
                        {salle.descriptionSalle}
                    </p>
                </Card>
                <Card id='MyCard2'>
                    <p><b>Code :</b> {salle.codeSalle} </p>
                    <p><b>Capacité :</b> {salle.capaciteSalle} </p>
                </Card>
            </div>
            <div id='Block3'>
                <h3 id='title'>
                    <span id='separator1'></span>
                    &nbsp;
                    <Button onClick={toggleSeanceTable}>
                        {showSeanceTable ? 'Cacher la liste des Seances' : 'Afficher la liste des Seances'}
                    </Button>
                </h3>
                <br/>
                {showSeanceTable && (  
                <TableContainer component={Paper} style={{ width: "70rem", margin: "auto", marginBottom: "1.5rem" }}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {HeadersSeance.map((th, index) => (
                                    <StyledTableCell key={index}>{th}</StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {seances.length > 0 && seances.map(seance => (
                                <StyledTableRow key={seance.idSeance}>
                                    <StyledTableCell component="th" scope="row">
                                        {seance.idSeance}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{seance.libelleSeance}</StyledTableCell>
                                    <StyledTableCell align="left">{seance.jourSeamce}</StyledTableCell>
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

export default DetailsSalle;
