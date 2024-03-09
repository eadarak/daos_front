import React, { useState, useEffect } from 'react';
import { Button, Typography, Grid, Box, Modal, Stack, Divider, Radio } from '@mui/material';
import {  REPARTITION_URL } from '../../../../Server_URL/Urls';

export default function Ajouter_Enseignant_Repartition( {enseignant }) {
    const [open, setOpen] = useState(false);
    const [ens, setEns] = useState([]);
    const [selectedEnseignants, setSelectedEnseignants] = useState(null);

    useEffect(() => {
        fetch(`${REPARTITION_URL}/repartition/enseignant`)
            .then(response => response.json())
            .then(data => {
                setEns(data);
            })
            .catch(error => console.error("Erreur lors de la récupération des enseignants:", error));
    }, []);

    const handleToggle = (enseignant) => {
        setSelectedEnseignants(enseignant);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedEnseignants !== null) {
            //http://localhost:8084/repartition/{id}/enseignants/{idEnseignant}
            fetch(`${REPARTITION_URL}/repartition/${enseignant.idRepartition}//enseignants/${selectedEnseignants.idEns}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedEnseignants)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur lors de l'ajout du enseignement à l'Module");
                }
                return response.json();
            })
            .then(data => {
                console.log('Enseignement ajouté avec succès à l\'Module:', data);
                setOpen(false);
            })
            .catch(error => {
                console.error("Une erreur s'est produite lors de l'ajout du enseignement à l'Module:", error);
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
                Ajouter Enseignant
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
                        Ajouter un Enseignant à la Repartition 
                    </Typography>
                    <Divider />
                    <Stack spacing={2} direction="column" sx={{ width: '95%' }}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                {enseignant.map(enseignant => (
                                    <Grid item xs={12} key={enseignant.idEns}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Radio
                                                color="primary"
                                                checked={selectedEnseignants && selectedEnseignants.idEns === enseignant.idEns}
                                                onChange={() => handleToggle(enseignant)}
                                            />
                                            <Typography variant="body1">
                                                {`${enseignant.idEns} - ${enseignant.prenomEns} - ${enseignant.nomEns} `}
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
