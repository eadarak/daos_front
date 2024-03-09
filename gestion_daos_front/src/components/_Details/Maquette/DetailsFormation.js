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
import Ajouter_Classe_Formation from './_Ajouter/Ajouter_Classe_Formation';
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

const HeadersClasse = ['Identifiant', 'Libelle', 'Effectif' , 'Nombre de Groupe(s)', 'Date Creation', ''];

function DetailsFormation ({ formation }) {
    const [classes, setClasses] = useState([]);
    const [maquette , setMaquette] = useState({})
    const [ShowClasseTable, setShowClasseTable] = useState(false);

    useEffect(() => {
        axios.get(`${MAQUETTE_URL}formation/${formation.idFormation}/classes`)
          .then(res => {
            console.log("les données récupérées depuis la base de données : \n ",res.data);
            setClasses(res.data);
          })
          .catch(err => console.log(err));
    }, []);

  

    const toggleModuleTable = () => {
        setShowClasseTable(!ShowClasseTable);
    };

    return (
        <div>
              <br/> &nbsp;
        <Button 
            href="/listes-formation" 
            style={{ color: "white", borderRadius: "5px", background: "rgb(9, 44, 38)" }}
        > ⬅
        </Button>
            <h2 id='title'>{formation.libelleFormation}</h2>
            <div id='BlockBtn'>
                <Ajouter_Classe_Formation formation={formation}/>
            </div>
            
            <div id='Block2'>
                <Card id='MyCard1'>
                    <p><b>Description :</b> <br/>
                        {formation.descriptionFormation}
                    </p>
                </Card>
                <Card id='MyCard2'>
                  
                </Card>
            </div>
            <div id='Block3'>
                <h3 id='title'>
                    <span id='separator1'></span>
                    &nbsp;
                    <Button onClick={toggleModuleTable}>
                        {ShowClasseTable ? 'Cacher la liste des Classes' : 'Afficher la liste des Classes'}
                    </Button>
                </h3>
                <br/>
                {ShowClasseTable && ( 
                <TableContainer component={Paper} style={{ width: "70rem", margin: "auto" }}>
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
            </div>
        </div>
    );
}

export default DetailsFormation;
