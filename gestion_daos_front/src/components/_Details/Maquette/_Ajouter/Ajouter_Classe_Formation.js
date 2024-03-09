import React, { useState, useEffect } from 'react';
import { Button, Typography, Grid, Box, Modal, Stack, Divider, Radio } from '@mui/material';
import { MAQUETTE_URL } from '../../../../Server_URL/Urls';

export default function Ajouter_Classe_Formation({ formation }) {
    const [open, setOpen] = useState(false);
    const [classes, setClasses] = useState([]);
    const [selectedClasses, setSelectedClasses] = useState(null);

    useEffect(() => {
        fetch(`${MAQUETTE_URL}classe`)
            .then(response => response.json())
            .then(data => {
                setClasses(data);
            })
            .catch(error => console.error("Erreur lors de la récupération des classes:", error));
    }, []);

    const handleToggle = (classe) => {
        setSelectedClasses(classe);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedClasses !== null) {
            fetch(`${MAQUETTE_URL}formation/${formation.idFormation}/classes/${selectedClasses.idClasse}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedClasses)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur lors de l'ajout du classe à l'Formation");
                }
                return response.json();
            })
            .then(data => {
                console.log('Classe ajouté avec succès à l\'Formation:', data);
                setOpen(false);
            })
            .catch(error => {
                console.error("Une erreur s'est produite lors de l'ajout du classe à l'Formation:", error);
            });
            
        } else {
            console.error("Veuillez sélectionner un classe.");
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
                Ajouter Classe
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
                        Ajouter Classe
                    </Typography>
                    <Divider />
                    <Stack spacing={2} direction="column" sx={{ width: '95%' }}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                {classes.map(classe => (
                                    <Grid item xs={12} key={classe.idClasse}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Radio
                                                color="primary"
                                                checked={selectedClasses && selectedClasses.idClasse === classe.idClasse}
                                                onChange={() => handleToggle(classe)}
                                            />
                                            <Typography variant="body1">
                                                {`${classe.idClasse} - ${classe.libelleClasse} `}
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
