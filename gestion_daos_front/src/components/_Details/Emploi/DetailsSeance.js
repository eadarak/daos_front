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
import Ajouter_Salle_Seance from './_Ajouter/Ajouter_Salle_Seance';
import Ajouter_Deroulement_Seance from './_Ajouter/Ajouter_Deroulement_Seance';

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


function DetailsSeance ({ seance }) {
    const [salles, setSalles] = useState([]);
    const [deroulement, setDeroulement] = useState([]);

    const [showSallesTable, setShowSallesTable] = useState(false);

    useEffect(() => {
        axios.get(`${EMPLOI_URL}/seance/${seance.idSeance}/salles`)
          .then(res => {
            setSalles(res.data);
            console.log("Les données récupérées depuis la base de données : \n ", res.data);
          })
          .catch(err => console.log(err));

          axios.get(`${EMPLOI_URL}/seance/${seance.idSeance}/deroulement`)
          .then(res => {
            setDeroulement(res.data);
            console.log("Le déroulement récupéré depuis la base de données : \n ", res.data);
          })
          .catch(err => console.log(err));
    }, [seance.idSeance]);


    const toggleSallesTable = () => {
        setShowSallesTable(!showSallesTable);
    };

    return (
        <div>
            &nbsp;
            &nbsp;
            <Button
                    href="/listeSeance"
                    style={{ color: "white", borderRadius: "5px", background: "rgb(9, 44, 38)" }}
                > ⬅
            </Button>

            <h2 id='title'>
            {`La seance numéro : ${seance.numeroSeance}`} {` du ${seance.jourSeance}`}  
                  <br/>
                <span id='separator'></span>

                </h2>
            <div id='BlockBtn'>
                <Ajouter_Salle_Seance seance={seance} />
                <Ajouter_Deroulement_Seance seance={seance} />

            </div>
            
            <div id='Block2'>
                <Card id='MyCard1'>
                <h5 id='sous-titre'> Séance </h5>
                     <p><b>Heure de Début :</b> &nbsp;{` ${seance.debutSeance}H:00`}  </p>
                    <p><b>Heure de Fin :</b> &nbsp;{`${seance.finSeance}H:00`} </p>
                </Card>
                <Card id='MyCard2'>
                <h5 id='sous-titre'> Séance </h5>
                    <p><b>Jour :</b> {seance.jourSeance} </p>
                    <p><b>Durée :</b> {`${seance.dureeSeance} heures`} </p>
                   
                    <p><b>Numéro de la Séance :</b> {seance.numeroSeance} </p>
                </Card>
                <Card id='MyCard2'>
                    <h5 id='sous-titre'> Deroulement</h5>
                    {deroulement && (
                        <>
                            <p><b>Objectifs :</b> {deroulement.objectifsDeroulement} </p>
                            <p><b>Description :</b> {deroulement.descriptionDeroulement} </p>
                        </>
                     )}
                    {!deroulement && <p>Pas de déroulement pour cette séance.</p>}                    
                </Card>
            </div>
            <div id='Block3'>
                <h3 id='title'>
                    <span id='separator1'></span>
                    &nbsp;
                    <Button onClick={toggleSallesTable}>
                        {showSallesTable ? 'Cacher la liste des Salles' : 'Afficher la liste des Salles'}
                    </Button>
                </h3>
                <br/>
                {showSallesTable && (  
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
                            <StyledTableRow key={salles.idSalle}>
                                <StyledTableCell component="th" scope="row">
                                    {salles.idSalle}
                                </StyledTableCell>
                                <StyledTableCell align="left">{salles.libelleSalle}</StyledTableCell>
                                <StyledTableCell align="left">{salles.codeSalle}</StyledTableCell>
                                <StyledTableCell align="left">{salles.capaciteSalle}</StyledTableCell>
                            </StyledTableRow>
                        </TableBody>    
                    </Table>
                </TableContainer>
                )}
            </div>
        </div>
    );
}

export default DetailsSeance;
