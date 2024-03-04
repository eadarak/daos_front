import { Button, Card } from '@mui/material';
import React, { Component } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import '../../../styles/general.css'


class DetailsBatiment extends Component {
    
    render() {
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
            // hide last border
            '&:last-child td, &:last-child th': {
              border: 0,
            },
          }));
          
          function createData(name, calories, fat, carbs, protein) {
            return { name, calories, fat, carbs, protein };
          }
          
          const rows = [
            createData(1, 159, 6.0, 24, 4.0),
            createData(2, 237, 9.0, 37, 4.3),
            createData(3, 262, 16.0, 24, 6.0),
            createData(4, 305, 3.7, 67, 4.3),
            createData(5, 356, 16.0, 49, 3.9),
          ];
        return (
            <div>
                <h2 id='title'> Batiment InfoLAB
                <br/>
                <span id='separator'></span> 
                </h2>
                
                <div id='BlockBtn'>
                    <Button id='mybtnStyle2' >Ajouter Salle </Button>
                    {/* <Button id='mybtnStyle2' >Ajouter Module </Button>  */}
                </div>
                <div id='Block2'>
                     <Card id='MyCard1' >
                        <p><b>Description :</b> <br/>
                        Lorem ipsum dolor sit amet consectetur. Sed in facilisis est egestas. Ac commodo porttitor diam quis morbi tortor scelerisque pulvinar molestie. Scelerisque augue a urna aenean arcu. Pretium pellentesque diam tincidunt semper egestas est est.
                        </p>
                       

                    </Card>
                    <Card id='MyCard2' >
                        <p><b>Code :</b></p>
                        <p><b>Credit :</b> </p>
                        <p><b>Coefficient :</b></p>

                    </Card>
                </div>
                <div id='Block3'>
                    <h3 id='title'>
                    <span id='separator1'></span>
                         &nbsp;Liste des Ecs
                    </h3>
                    <br/>
                        <TableContainer 
                            component={Paper} 
                            
                            style={{
                                width:"70rem",
                                margin:"auto" 
                                }}>
                <Table 
                
                
                aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell>Id</StyledTableCell>
                    <StyledTableCell align="right">Libelle Salle</StyledTableCell>
                    <StyledTableCell align="right">Code Salle</StyledTableCell>
                    <StyledTableCell align="right">Capacite Salle</StyledTableCell>
                    <StyledTableCell align="right">Description Salle</StyledTableCell>
                    <StyledTableCell align="right">Date de Creation</StyledTableCell>

                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                        {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.calories}</StyledTableCell>
                    <StyledTableCell align="right">{row.fat}</StyledTableCell>
                    <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                    <StyledTableCell align="right">{row.protein}</StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
    </div>
               
            </div>
        );
    }
}

export default DetailsBatiment;