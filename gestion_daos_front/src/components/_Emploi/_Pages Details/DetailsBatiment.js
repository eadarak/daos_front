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

function DetailsBatiment() {
    const [data, setData] = useState([]);
    const [dataSalle, setDataSalle] = useState([]);
    const [batimentLibelle, setBatimentLibelle] = useState('');
    const [codeBatiment, setCodeBatiment] = useState();
    const [positionBatiment, setPositionBatiment] = useState('');
    const [descriptionBatiment, setDescriptionBatiment] = useState('');



    useEffect(() => {
        axios.get(`http://localhost:8084/emploi/batiment`)
            .then(res => {
                res.data.forEach((c,i) => {
                setBatimentLibelle(res.data[i].libelleBatiment); 
                setCodeBatiment(res.data[i].codeBatiment);
                setPositionBatiment(res.data[i].positionBatiment);
                setDescriptionBatiment(res.data[i].descriptionBatiment);
                setData(res.data);
                });
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8084/emploi/salle`)
            .then(response => {
                setDataSalle(response.data);
            })
            .catch(err => console.log(err));
    }, []);

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

    return (
        <div>
            <h2 id='title'>  {batimentLibelle} <br/>
                <span id='separator'></span>
            </h2>

            <div id='BlockBtn'>
                <Button id='mybtnStyle2'>Ajouter Salle</Button>
            </div>
            <div id='Block2'>
                <Card id='MyCard1'>
                    <p><b>Description :</b> <br/>
                        {descriptionBatiment}
                    </p>
                </Card>
                <Card id='MyCard2'>
                    <p><b>Code :</b> {codeBatiment} </p>
                    <p><b>Position :</b> {positionBatiment} </p>
                    {/* <p><b>Coefficient :</b> </p> */}
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
                                <StyledTableCell>Id</StyledTableCell>
                                <StyledTableCell align="center">Code Salle</StyledTableCell>
                                <StyledTableCell align="center">Libelle Salle</StyledTableCell>
                                <StyledTableCell align="center">Capacite Salle</StyledTableCell>
                                <StyledTableCell align="center">Description Salle</StyledTableCell>
                                <StyledTableCell align="center">Date de Creation</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataSalle.length > 0 && dataSalle.map(row => (
                                <StyledTableRow key={row.idSalle}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.idSalle}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.codeSalle}</StyledTableCell>
                                    <StyledTableCell align="center">{row.libelleSalle}</StyledTableCell>
                                    <StyledTableCell align="center">{row.capaciteSalle}</StyledTableCell>
                                    <StyledTableCell align="center">{row.descriptionSalle}</StyledTableCell>
                                    <StyledTableCell align="center">{row.dateCreationSalle}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default DetailsBatiment;
