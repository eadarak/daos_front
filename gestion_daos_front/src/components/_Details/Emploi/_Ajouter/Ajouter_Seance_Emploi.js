import React, { useState, useEffect } from 'react';
import { Button, Typography, Grid, Box, Modal, Stack, Divider, Radio } from '@mui/material';
import { EMPLOI_URL } from '../../../../Server_URL/Urls';

export default function Ajouter_Seance_Emploi({ emploi }) {
    const [open, setOpen] = useState(false);
    const [seances, setSeances] = useState([]);
    const [selectedSeance, setSelectedSeance] = useState(null);

    useEffect(() => {
        fetch(`${EMPLOI_URL}/seance`)
            .then(response => response.json())
            .then(data => {
                setSeances(data);
            })
            .catch(error => console.error("Erreur lors de la récupération des séances:", error));
    }, []);

    const handleToggle = (seance) => {
        setSelectedSeance(seance);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedSeance !== null) {
            fetch(`${EMPLOI_URL}emploi-du-temps/${emploi.idEmploi}/seance/${selectedSeance.idSeance}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedSeance)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Erreur lors de l'ajout de la séance à l'emploi.");
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Séance ajoutée avec succès à l\'emploi:', data);
                    setOpen(false);
                })
                .catch(error => {
                    console.error("Une erreur s'est produite lors de l'ajout de la séance à l'emploi:", error);
                });

        } else {
            console.error("Veuillez sélectionner une séance.");
        }
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
                Ajouter Séance
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
                        Ajouter Séance
                    </Typography>
                    <Divider />
                    <Stack spacing={2} direction="column" sx={{ width: '95%' }}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                {seances.map(seance => (
                                    <Grid item xs={12} key={seance.idSeance}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Radio
                                                color="primary"
                                                checked={selectedSeance && selectedSeance.idSeance === seance.idSeance}
                                                onChange={() => handleToggle(seance)}
                                            />
                                            <Typography variant="body1">
                                                {`${seance.idSeance} - ${seance.numeroSeance} - ${seance.jourSeance}`}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        background: 'rgb(9, 44, 38)',
                                        '&:hover': { backgroundColor: 'rgb(17, 77, 67)' },
                                        fontWeight: '600',
                                        fontFamily: 'Poppins',
                                    }}
                                >
                                    Enregistrer
                                </Button>
                            </Box>
                        </form>
                    </Stack>
                </Box>
            </Modal>
        </React.Fragment>
    );
}
