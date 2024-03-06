import React, { useState } from 'react';
import Modal from '@mui/joy/Modal';
import Typography from '@mui/material/Typography';
import { Box, Divider, Stack, TextField, Grid, Button } from '@mui/material';
import { EMPLOI_URL } from '../../../Server_URL/Urls';
import DetailsBatiment from '../../_Emploi/_Pages Details/DetailsBatiment';

function Ajouter_Salle_Batiment({ batiment }) {
    const [open, setOpen] = useState(false);

    const modelBatiment = {
        idSalle: 0,
        libelleSalle: '',
        codeSalle: '',
        capaciteSalle: 0,
        descriptionSalle: ''
    };

    const [data, setFormData] = useState(modelBatiment);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...data, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!batiment) {
            console.error('Erreur: batiment non défini');
            return;
        }
        console.log(`${EMPLOI_URL}/batiment/${batiment.idBatiment}/salles`);
        fetch(`${EMPLOI_URL}/batiment/${batiment.idBatiment}/salles`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la requête vers l\'API');
                }
                return response.json();
            })
            .then(data => {
                console.log('Une nouvelle salle a été ajoutée avec succès', data);
                setFormData(modelBatiment);
                setOpen(false);
                redirectToBatDetails(batiment);
            })
            .catch(err => {
                console.error('Une erreur s\'est produite lors de l\'ajout de la salle', err.message);
            });
    };

    const redirectToBatDetails = (batiment) => {
        return <DetailsBatiment batiment={batiment} />;
    };

    return (
        <React.Fragment>
            <Button
                sx={{
                    backgroundColor: '#00AF91',
                    borderRadius: '4px',
                    fontWeight: 600,
                    fontFamily: "Poppins",
                    color: 'rgb(0, 0, 0)',
                    textTransform: 'capitalize',
                    letterSpacing: '0.5px',
                    padding: '10px',
                    '&:hover': {
                        color: 'rgb(255, 255, 255)',
                        backgroundColor: 'rgb(9, 44, 38)'
                    }
                }}
                onClick={() => setOpen(true)}
            >
                Ajouter Salle
            </Button>

            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
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
                        Ajouter Salle
                    </Typography>
                    <Typography variant='body1' align='center' fontSize='1.2rem'> Veuillez remplir les champs ci-dessous...</Typography>
                    <Divider />
                    <Stack spacing={2} direction="column" sx={{ width: '95%' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    id="libelleSalle"
                                    label="Libelle Salle"
                                    required
                                    fullWidth
                                    value={data.libelleSalle}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="codeSalle"
                                    label="Code Salle"
                                    fullWidth
                                    required
                                    value={data.codeSalle}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    id="capaciteSalle"
                                    label="Capacite Salle"
                                    fullWidth
                                    required
                                    value={data.capaciteSalle}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="descriptionSalle"
                                    label="Description Salle"
                                    variant="filled"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={data.descriptionSalle}
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

export default Ajouter_Salle_Batiment;
