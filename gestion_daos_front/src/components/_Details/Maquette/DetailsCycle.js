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
import Ajouter_Niveau_Cycle from './_Ajouter/Ajouter_Niveau_Cycle';

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

const HeadersNiveau = ['Identifiant', 'Libelle'];

function DetailsCycle ({ cycle }) {
    const [niveau, setNiveau] = useState([]);
    const [ShowNiveauTable, setShowNiveauTable] = useState(false);

    useEffect(() => {
        axios.get(`${MAQUETTE_URL}cycle/${cycle.idCycle}/niveau`)
          .then(res => {
            console.log("les données récupérées depuis la base de données : \n ",res.data);
            setNiveau(res.data);
          })
          .catch(err => console.log(err));
    }, []);

  

    const toggleModuleTable = () => {
        setShowNiveauTable(!ShowNiveauTable);
    };

    return (
        <div>
        &nbsp;
        <Button 
            href="/listes-cycle" 
            style={{ color: "white", borderRadius: "5px", background: "rgb(9, 44, 38)" }}
        > ⬅
        </Button>
            <h2 id='title'>{cycle.libelleCycle}</h2>
            <div id='BlockBtn'>
              <Ajouter_Niveau_Cycle cycle={cycle}/>
            </div>
            
            <div id='Block2'>
                <Card id='MyCard1'>
                    <p><b>Description :</b> <br/>
                        {cycle.descriptionCycle}
                    </p>
                </Card>
                
            </div>
            <div id='Block3'>
                <h3 id='title'>
                    <span id='separator1'></span>
                    &nbsp;
                    <Button onClick={toggleModuleTable}>
                        {ShowNiveauTable ? 'Cacher la liste des Niveau' : 'Afficher la liste des Niveau'}
                    </Button>
                </h3>
                <br/>
                {ShowNiveauTable && ( 
                <TableContainer component={Paper} style={{ width: "70rem", margin: "auto" }}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {HeadersNiveau.map((th, index) => (
                                    <StyledTableCell key={index}>{th}</StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {niveau.length > 0 && niveau.map(niveau => (
                                <StyledTableRow key={niveau.idNiveau}>
                                    <StyledTableCell component="th" scope="row">
                                        {niveau.idNiveau}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{niveau.libelleNiveau}</StyledTableCell>
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

export default DetailsCycle;
