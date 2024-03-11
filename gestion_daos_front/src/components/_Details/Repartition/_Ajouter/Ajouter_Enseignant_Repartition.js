import React, { useState, useEffect } from 'react';
import { Button, Typography, Grid, Box, Modal, Stack, Divider, Radio } from '@mui/material';
import { REPARTITION_URL } from '../../../../Server_URL/Urls';

export default function Ajouter_Enseignant_Repartition( {repartition }) {
    const [open, setOpen] = useState(false);
    const [enseignant, setEnseignant] = useState([]);
    const [selectedEnseignants, setSelectedEnseignants] = useState(null);

    useEffect(() => {
        fetch(`${REPARTITION_URL}/enseignant`)
            .then(response => response.json())
            .then(data => {
                setEnseignant(data);
            })
            .catch(error => console.error("Erreur lors de la récupération des repartitions:", error));
    }, []);

    const handleToggle = (enseignant) => {
        setSelectedEnseignants(enseignant);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedEnseignants !== null) {
        //@PutMapping(path = "{id}/enseignants/{idEnseignant}")            
        fetch(`${REPARTITION_URL}/repartition/${repartition.idRepartition}/enseignants/${selectedEnseignants.idEns}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedEnseignants)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur lors de l'ajout de l'enseignant à la repartition");
                }
                return response.json();
            })
            .then(data => {
                console.log('Enseignant ajouté avec succès à la repartition:', data);
                setOpen(false);
            })
            .catch(error => {
                console.error("Une erreur s'est produite lors de l'ajout du enseignant à la repartition:", error);
            });
            
        } else {
            console.error("Veuillez sélectionner un enseignant.");
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
                Ajouter Un Enseignant
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
                                {enseignant.map(k => (
                                    <Grid item xs={12} key={k.idEns}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Radio
                                                color="primary"
                                                checked={selectedEnseignants && selectedEnseignants.idEns === k.idEns}
                                                onChange={() => handleToggle(k)}
                                            />
                                            <Typography variant="body1">
                                                {`${k.idEns} - ${k.prenomEns} - ${k.nomEns} `}
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
