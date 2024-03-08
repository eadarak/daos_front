/* eslint-disable react/jsx-pascal-case */
import React, { useState } from 'react';
import { Card, CardContent, CardActions, Button, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../../styles/general.css';
import Ajouter_Classe from '../_Ajouter/Aj-Maquette/Ajouter_Classe';

function Classe() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
                    <Typography variant="h6">→<b> &nbsp;Classe</b></Typography>
                    <Typography variant="body1">
                        Cette page vous redirige vers la liste des Classe.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button href="/listes-classe" id='mybtnStyle'>Voir liste Classe</Button>
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
                    <Ajouter_Classe open={Boolean(anchorEl)} onClose={handleClose} />
                </MenuItem>
            </Menu>
        </div>
    );
}

export default Classe;
