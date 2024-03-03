import React, { useState } from 'react';
import { Card, CardContent, CardActions, Button, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ListeUE from '../_Listes/Maquette/ListeUE';

import '../../styles/general.css'
import Ajouter_UE from '../_Ajouter/Maquette/Ajouter_UE';

function UE() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [newUE, setNewUE] = useState('');

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAddUE = () => {
        setNewUE('');
        handleClose();
    };

    return (
        <div>
            <Card id="card">
                <CardContent style={{ position: 'relative' }} id="content-card">
                    <IconButton
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                        style={{ position: 'absolute', top: '5px', right: '5px' }}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Typography variant="h6">→<b> &nbsp;UE</b></Typography>
                    <Typography variant="body1">
                        Cette page vous redirige vers la liste des UE.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button href="ListeUE" id='mybtnStyle'>Voir liste UE</Button>
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
                    <Ajouter_UE open={Boolean(anchorEl)} onClose={handleClose} />
                </MenuItem>
            </Menu>
        </div>
    );
}

export default UE;
