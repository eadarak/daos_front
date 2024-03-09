import * as React from 'react';
import Modal from '@mui/joy/Modal';
import Typography from '@mui/material/Typography';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { Box, Divider, Stack, TextField, Grid, Button } from '@mui/material';
import { MAQUETTE_URL } from '../../../Server_URL/Urls';
import { useNavigate } from 'react-router-dom';

export default function Ajouter_Cycle() {
    const [open, setOpen] = React.useState(false);
    const [libelleCycle, setLibelleCycle] = React.useState('');
    const [descriptionCycle, setDescriptionCycle] = React.useState('');
    const [libelleError, setLibelleError] = React.useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { libelleCycle, descriptionCycle };
        if (libelleCycle !== 'Licence' && libelleCycle !== 'Master' && libelleCycle !== 'Doctorat') {
            setLibelleError(true);
            return;
        }

        fetch(`${MAQUETTE_URL}cycle`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la requête vers l\'API');
                }
                return response.json()
            })
            .then(
                data => {
                    console.log('Une nouvelle cycle a été ajoutée avec succès', data);
                    setLibelleCycle('');
                    setDescriptionCycle('');
                    setOpen(false);
                    navigate('/listes-cycle');
                    window.location.reload();
                })
            .catch(err => {
                console.error("Une erreur s'est produite lors de l'opération d'ajout :", err);
            })
    }

    const handleClose = () => {
        setOpen(false);
        setLibelleCycle('');
        setDescriptionCycle('');
        setLibelleError(false);
    };


    return (
        <React.Fragment>
            <LibraryAddIcon onClick={() => setOpen(true)} />
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={handleClose}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontFamily: 'Poppins',
                    backdropFilter: 'saturate(100%) blur(2px)',
                }}
                className='Modal'
            >
                <Box sx={{ backgroundColor: 'white', p: 2, width: 800, borderRadius: "10px" }}>
                    <Typography variant="h5" align="center" fontWeight='bold' fontSize='2rem' >
                        Cycle
                    </Typography>
                    <Typography variant='body1' align='center' fontSize='1.2rem'> Veuillez remplir les champs ci-dessous...</Typography>
                    <Divider />
                    <Stack spacing={2} direction="column" sx={{ width: '95%' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id="libelleCycle"
                                    label="Libelle de la cycle"
                                    variant="filled"
                                    fullWidth
                                    value={libelleCycle}
                                    onChange={(e) => {
                                        setLibelleCycle(e.target.value);
                                        setLibelleError(false);
                                    }}
                                    error={libelleError}
                                    helperText={libelleError ? 'Veuillez entrer une valeur valide (Licence, Master, Doctorat)' : ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="descriptionCycle"
                                    label="Description de la cycle"
                                    variant="filled"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={descriptionCycle}
                                    onChange={(e) => setDescriptionCycle(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </Stack>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-around' }}>
                        <Button
                            onClick={handleClose}
                            sx={{
                                background: '#7d7d7d',
                                color: 'white',
                                '&:hover': { backgroundColor: '#000', color: 'white' },
                                fontWeight: "600",
                                fontFamily: "Poppins"
                            }}>
                            Annuler
                        </Button>

                        <Button
                            variant="contained"
                            sx={{
                                background: ' rgb(9, 44, 38)',
                                '&:hover': { backgroundColor: 'rgb(17, 77, 67)' },
                                fontWeight: "600",
                                fontFamily: "Poppins"
                            }}
                            className='validButton'
                            id='validButton'
                            onClick={handleSubmit}
                        >
                            Enregistrer
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
}
