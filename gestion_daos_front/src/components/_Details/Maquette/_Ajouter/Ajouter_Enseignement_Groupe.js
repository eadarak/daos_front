import React, { useState, useEffect } from 'react';
import { Button, Typography, Grid, Box, Modal, Stack, Divider, Radio } from '@mui/material';
import { MAQUETTE_URL } from '../../../../Server_URL/Urls';

export default function Ajouter_Enseignement_Groupe({ groupe }) {
    const [open, setOpen] = useState(false);
    const [enseignements, setEnseignements] = useState([]);
    const [selectedEnseignements, setSelectedEnseignements] = useState(null);

    useEffect(() => {
        fetch(`${MAQUETTE_URL}enseignement`)
            .then(response => response.json())
            .then(data => {
                setEnseignements(data);
            })
            .catch(error => console.error("Erreur lors de la récupération des enseignements:", error));
    }, []);

    const handleToggle = (enseignement) => {
        setSelectedEnseignements(enseignement);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedEnseignements !== null) {
            fetch(`${MAQUETTE_URL}groupe/${groupe.idGroupe}/enseignements/${selectedEnseignements.idEnseignement}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedEnseignements)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur lors de l'ajout du enseignement à l'Groupe");
                }
                return response.json();
            })
            .then(data => {
                console.log('Enseignement ajouté avec succès à l\'Groupe:', data);
                setOpen(false);
            })
            .catch(error => {
                console.error("Une erreur s'est produite lors de l'ajout du enseignement à l'Groupe:", error);
            });
            
        } else {
            console.error("Veuillez sélectionner un enseignement.");
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
                Ajouter Enseignement
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
                        Ajouter Enseignement
                    </Typography>
                    <Divider />
                    <Stack spacing={2} direction="column" sx={{ width: '95%' }}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                {enseignements.map(enseignement => (
                                    <Grid item xs={12} key={enseignement.idEnseignement}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Radio
                                                color="primary"
                                                checked={selectedEnseignements && selectedEnseignements.idEnseignement === enseignement.idEnseignement}
                                                onChange={() => handleToggle(enseignement)}
                                            />
                                            <Typography variant="body1">
                                                {`${enseignement.idEnseignement} - ${enseignement.libelleEnseignement} `}
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
