import React, { useState } from 'react';
import { Card, CardContent, CardActions, Button, Typography, IconButton, Menu, MenuItem, TextField } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

/* Importation CSS */
import '../styles/general.css'
import '../styles/card.style.css'
import Ajouter_UE from './_Ajouter/Maquette/Ajouter_UE';

function CustomCard({ title }) { // Ajout du prop "title"
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Card id="card">
                <CardContent style={{ position: 'relative' }} id="content-card">
                    <IconButton id="card-icon-button"
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                        style={{ 
                            position: 'absolute',
                            top: '5px',
                            right: '5px',

                        }} 
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Typography className='texte' variant="h6">→<b style={{
                         fontFamily: 'Poppins'
                    }}> &nbsp;{title}</b></Typography> {/* Utilisation du prop "title" */}
                    <Typography variant="body1">
                        Cette page vous redirige vers la liste des {title}. {/* Utilisation du prop "title" */}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button href="#" id='mybtnStyle'>Voir liste {title}</Button> {/* Utilisation du prop "title" */}
                </CardActions>
            </Card>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                style={{
                    marginTop:'3px',
                    marginRight:'15px'
                }}
            >
                <MenuItem onClick={handleClose} >
                    <LibraryAddIcon/>
                </MenuItem>
            </Menu>
        </>
    );
}

export default CustomCard;
