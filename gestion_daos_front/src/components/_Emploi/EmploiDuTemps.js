/* eslint-disable react/jsx-pascal-case */
import React, { useState } from 'react';
import { Card, CardContent, CardActions, Button, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../../styles/general.css';
import Ajouter_EmploiDuTemps from '../_Ajouter/Aj-Emploi/Ajouter_EmploiDuTemps';

function EmploiDuTemps() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [newEmploi, setNewEmploi] = useState('');

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAddEmploi = () => {
        setNewEmploi('');
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
                    <Typography variant="h5">→<b> &nbsp;Emploi</b></Typography>
                    <Typography variant="body1" sx={{fontSize: "1.4rem !important", fontFamily:"Poppins"}}> 
                        Cette page vous redirige vers la liste des Emplois.
                    </Typography>
                </CardContent>             
                <CardActions>
                    <Button href="/listes-emploi-du-temps" id='mybtnStyle'>Voir liste des EmploiDuTempss</Button>
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
                   <Ajouter_EmploiDuTemps open={Boolean(anchorEl)} onClose={handleClose}/>
                </MenuItem>
            </Menu>
        </div>
    );
}

export default EmploiDuTemps;