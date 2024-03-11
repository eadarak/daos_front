import React, { useState, useEffect } from 'react';
import { Button, Typography, Grid, Box, Modal, Stack, Divider, Radio } from '@mui/material';
import { MAQUETTE_URL } from '../../../../Server_URL/Urls';

function Ajouter_Module_Semestre({ semestre }) {
    const [open, setOpen] = useState(false);
    const [modules, setModules] = useState([]);
    const [selectedModule, setSelectedModule] = useState(null);

    useEffect(() => {
        fetch(`${MAQUETTE_URL}module`)
            .then(response => response.json())
            .then(data => {
                setModules(data);
            })
            .catch(error => console.error("Erreur lors de la récupération des modules:", error));
    }, []);

    const handleToggle = (module) => {
        setSelectedModule(module);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedModule !== null) {
            fetch(`${MAQUETTE_URL}semestre/${semestre.idSemestre}/modules/${selectedModule.idModule}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedModule)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur lors de l'ajout du module au Semestre");
                }
                return response.json();
            })
            .then(data => {
                console.log('Module ajouté avec succès à l\'EC:', data);
                setOpen(false);
            })
            .catch(error => {
                console.error("Une erreur s'est produite lors de l'ajout du module à l'EC:", error);
            });
            
        } else {
            console.error("Veuillez sélectionner un module.");
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
                        Ajouter Module au Semestre
                    </Typography>
                    <Divider />
                    <Stack spacing={2} direction="column" sx={{ width: '95%' }}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                {modules.map(module => (
                                    <Grid item xs={12} key={module.idModule}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Radio
                                                color="primary"
                                                checked={selectedModule && selectedModule.idModule === module.idModule}
                                                onChange={() => handleToggle(module)}
                                            />
                                            <Typography variant="body1">
                                                {`[ ${module.idModule} ] - ${module.libelleModule} - ${module.coursModule}`}                                           </Typography>
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

export default Ajouter_Module_Semestre;
