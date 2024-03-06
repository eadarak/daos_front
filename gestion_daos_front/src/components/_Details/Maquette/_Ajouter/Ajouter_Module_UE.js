import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, TextField, Grid, Box, Modal, Stack, Divider } from '@mui/material';
import { MAQUETTE_URL } from '../../../../Server_URL/Urls';
import DetailsUE from '../DetailsUE';

function Ajouter_Module_UE({ ue }) {
    const [open, setOpen] = React.useState(false);

    const initialModule = {
        libelleModule: '',
        coursModule: '',
        dureeModule: 0,
        coefficientModule: 0,
        objectifsModule: '',
        descriptionModule: ''
    };

    const [data, setFormData] = React.useState(initialModule);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...data, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${MAQUETTE_URL}ue/${ue.idUE}/modules`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erreur lors de l'ajout du module");
                }
                return response.json();
            })
            .then((data) => {
                console.log('Un nouveau module a été ajouté avec succès', data);
                setFormData(initialModule);
                setOpen(false);
                window.location.reload();
            })
            .catch((err) => {
                console.error("Une erreur s'est produite lors de l'ajout du module", err.message);
            });
    };

    return (
        <React.Fragment>
            <Button
                sx={{
                    backgroundColor: '#00AF91',
                    borderRadius: '4px',
                    fontWeight: 600,
                    fontFamily: 'Poppins',
                    color: 'rgb(0, 0, 0)',
                    textTransform: 'capitalize',
                    letterSpacing: '0.5px',
                    padding: '10px',
                    '&:hover': {
                        color: 'rgb(255, 255, 255)',
                        backgroundColor: 'rgb(9, 44, 38)',
                    },
                }}
                onClick={() => setOpen(true)}
            >
                Ajouter Module
            </Button>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontFamily: 'Poppins',
                    backdropFilter: 'saturate(100%) blur(2px)',
                }}
            >
                <Box sx={{ backgroundColor: 'white', p: 2, width: 800, borderRadius: '10px' }}>
                    <Typography variant="h5" align="center" fontWeight="bold" fontSize="2rem">
                        Ajouter Module
                    </Typography>
                    <Typography variant="body1" align="center" fontSize="1.2rem">
                        Veuillez remplir les champs ci-dessous...
                    </Typography>
                    <Divider />
                    <Stack spacing={2} direction="column" sx={{ width: '95%' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    id="libelleModule"
                                    label="Libellé Module"
                                    fullWidth
                                    required
                                    value={data.libelleModule}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="coursModule"
                                    label="Cours Module"
                                    fullWidth
                                    required
                                    value={data.coursModule}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="dureeModule"
                                    label="Durée Module"
                                    fullWidth
                                    required
                                    value={data.dureeModule}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="coefficientModule"
                                    label="Coefficient Module"
                                    fullWidth
                                    required
                                    value={data.coefficientModule}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="objectifsModule"
                                    label="Objectifs Module"
                                    variant="filled"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={data.objectifsModule}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="descriptionModule"
                                    label="Description Module"
                                    variant="filled"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={data.descriptionModule}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                    </Stack>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-around' }}>
                        <Button
                            onClick={() => setOpen(false)}
                            sx={{
                                background: '#7d7d7d',
                                color: 'white',
                                '&:hover': { backgroundColor: '#000', color: 'white' },
                                fontWeight: '600',
                                fontFamily: 'Poppins',
                            }}
                        >
                            Annuler
                        </Button>

                        <Button
                            variant="contained"
                            sx={{
                                background: 'rgb(9, 44, 38)',
                                '&:hover': { backgroundColor: 'rgb(17, 77, 67)' },
                                fontWeight: '600',
                                fontFamily: 'Poppins',
                            }}
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

export default Ajouter_Module_UE;
