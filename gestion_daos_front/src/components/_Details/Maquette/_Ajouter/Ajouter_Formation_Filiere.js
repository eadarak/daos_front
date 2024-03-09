import React, { useState, useEffect } from 'react';
import { Button, Typography, Grid, Box, Modal, Stack, Divider, Radio } from '@mui/material';
import { MAQUETTE_URL } from '../../../../Server_URL/Urls';

export default function Ajouter_Formation_Filiere({ filiere }) {
    const [open, setOpen] = useState(false);
    const [formations, setFormations] = useState([]);
    const [selectedFormations, setSelectedFormations] = useState(null);

    useEffect(() => {
        fetch(`${MAQUETTE_URL}formation`)
            .then(response => response.json())
            .then(data => {
                setFormations(data);
            })
            .catch(error => console.error("Erreur lors de la récupération des formations:", error));
    }, []);

    const handleToggle = (formation) => {
        setSelectedFormations(formation);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedFormations !== null) {
            fetch(`${MAQUETTE_URL}filiere/${filiere.idFiliere}/formations/${selectedFormations.idFormation}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedFormations)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur lors de l'ajout du formation à l'Filiere");
                }
                return response.json();
            })
            .then(data => {
                console.log('Formation ajouté avec succès à l\'Filiere:', data);
                setOpen(false);
            })
            .catch(error => {
                console.error("Une erreur s'est produite lors de l'ajout du formation à l'Filiere:", error);
            });
            
        } else {
            console.error("Veuillez sélectionner un formation.");
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
                Ajouter Formation
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
                        Ajouter Formation
                    </Typography>
                    <Divider />
                    <Stack spacing={2} direction="column" sx={{ width: '95%' }}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                {formations.map(formation => (
                                    <Grid item xs={12} key={formation.idFormation}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Radio
                                                color="primary"
                                                checked={selectedFormations && selectedFormations.idFormation === formation.idFormation}
                                                onChange={() => handleToggle(formation)}
                                            />
                                            <Typography variant="body1">
                                                {`${formation.idFormation} - ${formation.libelleFormation} `}
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
