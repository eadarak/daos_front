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
;

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

const HeadersRepartition = ['Identifiant', 'Description'];

function DetailsEnseignement ({ enseignement }) {
    const [repartitions, setRepartitions] = useState([]);
    const [ShowRepartitionTable, setShowRepartitionTable] = useState(false);

    useEffect(() => {
        axios.get(`${MAQUETTE_URL}enseignement/${enseignement.idEnseignement}/repartitions`)
          .then(res => {
            console.log("les données récupérées depuis la base de données : \n ",res.data);
            setRepartitions(res.data);
          })
          .catch(err => console.log(err));
    }, []);

  

    const toggleModuleTable = () => {
        setShowRepartitionTable(!ShowRepartitionTable);
    };

    return (
        <div>
      &nbsp;
      &nbsp;
      <Button 
        href="/listes-enseignement" 
        style={{ color: "white", borderRadius: "5px", background: "rgb(9, 44, 38)" }}
      > ⬅
      </Button>
            
            <h2 id='title'>{enseignement.libelleEnseignement}
            <br/>
            <span id='separator'></span>
            </h2>
            <div id='BlockBtn'>
                
            </div>
            
            <div id='Block2'>
                <Card id='MyCard1'>
                <p><b>Identifiant :</b> &nbsp;
                        {enseignement.idEnseignement}
                    </p>
                    <p><b>Description :</b> <br/>
                        {enseignement.descriptionEnseignement}
                    </p>
                </Card>
                <Card id='MyCard2'>
                    <p><b>Objectifs :</b> {enseignement.objectifsEnseignement} </p>
                    <p><b>Date Creation :</b> {enseignement.dateCreationEnseignement} </p>
                </Card>
            </div>
            <div id='Block3'>
                <h3 id='title'>
                    <span id='separator1'></span>
                    &nbsp;
                    <Button onClick={toggleModuleTable}>
                        {ShowRepartitionTable ? 'Cacher la liste des Repartitions' : 'Afficher la liste des Repartitions'}
                    </Button>
                </h3>
                <br/>
                {ShowRepartitionTable && ( 
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
                            {repartitions.length > 0 && repartitions.map(repartition => (
                                <StyledTableRow key={repartition.idRepartition}>
                                    <StyledTableCell component="th" scope="row">
                                        {repartition.idRepartition}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{repartition.descriptionRepartition}</StyledTableCell>
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

export default DetailsEnseignement;
