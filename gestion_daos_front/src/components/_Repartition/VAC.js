import React, { useState } from 'react';
import { Card, CardContent, CardActions, Button, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

import '../../styles/general.css'

function VAC() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [newVAC, setNewVAC] = useState('');

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAddUE = () => {
        setNewVAC('');
        handleClose();
    };

    return (
        <div>
           <Card id="card" style={{ display: 'flex', flexDirection: 'column', height: '12rem' }}>
                <CardContent style={{ flex: '1 0 auto', position: 'relative' }} id="content-card">
                    <IconButton
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                        style={{ position: 'absolute', top: '5px', right: '5px' }}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Typography variant="h5">→<b> &nbsp;VACATAIRE</b></Typography>
                    <Typography variant="body1" sx={{fontSize: "1.4rem !important", fontFamily:"Poppins"}}>
                        Cette page vous redirige vers la liste des 
                        Enseignants Vacataire.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button href="/listeVAC" id='mybtnStyle'>Voir liste VAC</Button>
                </CardActions>
            </Card>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                style={{ marginTop: '3px', marginRight: '15px' }}
            >
                <MenuItem>
                    <LibraryAddIcon />
                </MenuItem>
            </Menu>
        </div>
    );
}

export default VAC;
