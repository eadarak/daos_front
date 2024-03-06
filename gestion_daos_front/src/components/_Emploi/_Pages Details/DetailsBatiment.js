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
import { EMPLOI_URL} from '../../../Server_URL/Urls';
import Ajouter_Salle_Batiment from '../../_Details/Emploi/Ajouter_Salle_Batiment';

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

const HeaderSalle = ['Identifiant', 'Libelle','Code', 'Capacite', 'Description' ]

function DetailsBatiment ({ batiment }) {
    const [salle, setSalle] = useState([]);

    useEffect(() => {
        if (batiment && batiment.idBatiment) {
            axios.get(`${EMPLOI_URL}/batiment/${batiment.idBatiment}/salles`)
              .then(res => {
                console.log("les données récupérées depuis la db : \n ",res.data)
                setSalle(res.data)
              })
              .catch(err => console.log(err));
        }
    }, [batiment]);
    
    return (
        <div>
            <h2 id='title'>  {batiment.libelleBatiment} <br/>                
                <span id='separator'></span>
            </h2>
            <div id='BlockBtn'>
                {console.log(batiment)}
                {batiment && <Ajouter_Salle_Batiment batiment={batiment} />}
            </div>

            
            <div id='Block2'>
                <Card id='MyCard1'>
                    <p><b>Description :</b> <br/>
                        {batiment.descriptionBatiment}
                    </p>
                </Card>
                <Card id='MyCard2'>
                    <p><b>Code :</b> {batiment.codeBatiment} </p>
                    {/* Ajoutez ici d'autres détails du bâtiment */}
                </Card>
            </div>
            <div id='Block3'>
                <h3 id='title'>
                    <span id='separator1'></span>
                    &nbsp;Liste des Salles
                </h3>
                <br/>
              
  <TableContainer component={Paper} style={{ width: "70rem", margin: "auto" }}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                            {HeaderSalle.map((th, index) => (
                                <StyledTableCell key={index}>{th}</StyledTableCell>
                            ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {salle.length > 0 && salle.map(salle => (
                                <StyledTableRow key={salle.idSalle}>
                                    
                                    <StyledTableCell component="th" scope="row">
                                        {salle.idSalle}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{salle.libelleSalle}</StyledTableCell>
                                    <StyledTableCell align="center">{salle.codeSalle}</StyledTableCell>
                                    <StyledTableCell align="center">{salle.capaciteSalle}</StyledTableCell>
                                    <StyledTableCell align="center">{salle.descriptionSalle}</StyledTableCell>
                                    
                                </StyledTableRow>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default DetailsBatiment;


