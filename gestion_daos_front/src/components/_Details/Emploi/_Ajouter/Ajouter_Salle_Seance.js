import React, { useState, useEffect } from 'react';
import { Button, Typography, Grid, Box, Modal, Stack, Divider, Radio } from '@mui/material';
import { EMPLOI_URL} from '../../../../Server_URL/Urls';

function Ajouter_Salle_Seance({ seance }) {
    const [open, setOpen] = useState(false);
    const [salles, setSalles] = useState([]);
    const [selectedSalle, setSelectedSalle] = useState(null);

    useEffect(() => {
        fetch(`${EMPLOI_URL}/salle`)
            .then(response => response.json())
            .then(data => {
                setSalles(data);
            })
            .catch(error => console.error("Erreur lors de la récupération des salles:", error));
    }, []);

    const handleToggle = (salle) => {
        setSelectedSalle(salle);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedSalle !== null) {
            fetch(`${EMPLOI_URL}/seance/${seance.idSeance}/salles/${selectedSalle.idSalle}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedSalle)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur lors de l'assignation de la Salle ${selectedSalle.idSalle} a la Seance `);
                }
                return response.json();
            })
            .then(data => {
                console.log('Salle ajouté avec succès à la Seance:', data);
                setOpen(false);
            })
            .catch(error => {
                console.error("Une erreur s'est produite lors de l'assignation de la salle:", error);
            });
            
        } else {
            console.error("Veuillez sélectionner une salle.");
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
                Assigner une Salle
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
                        Assignation d'une salle
                    </Typography>
                    <Divider />
                    <Stack spacing={2} direction="column" sx={{ width: '95%' }}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                {salles.map(salle => (
                                    <Grid item xs={12} key={salle.idSalle}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Radio
                                                color="primary"
                                                checked={selectedSalle && selectedSalle.idSalle === salle.idSalle}
                                                onChange={() => handleToggle(salle)}
                                            />
                                            <Typography variant="body1">
                                                {`${salle.idSalle} - ${salle.libelleSalle} - ${salle.codeSalle}`} 
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

export default Ajouter_Salle_Seance;
