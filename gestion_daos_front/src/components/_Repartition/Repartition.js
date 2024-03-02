import React, { useState } from 'react';
import { Card, CardContent, CardActions, Button, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

import '../../styles/general.css'

function Repartition() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [newRepartition, setNewRepartition] = useState('');

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAddUE = () => {
        setNewRepartition('');
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
                    <Typography variant="h6">→<b> &nbsp;Repartition</b></Typography>
                    <Typography variant="body1">
                        Cette page vous redirige vers la liste des
                        Repartitions.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button href="/listeRepartition" id='mybtnStyle'>Voir liste des Repartitions</Button>
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

export default Repartition;
