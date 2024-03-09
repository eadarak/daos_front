import * as React from 'react';
import Modal from '@mui/joy/Modal';
import Typography from '@mui/material/Typography';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { Box, Divider, Stack, TextField, Grid, Button } from '@mui/material';
import { EMPLOI_URL } from '../../../Server_URL/Urls';
import { useNavigate } from 'react-router-dom';

function Ajouter_EmploiDuTemps() {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate()

    const modelEmploi = {
        idEmploi: 0,
        dureeEmploi: '0',
        dateDebutEmploi: '',
        dateFinEmploi: '',
        descriptionEmploi: ''
    };

    const [data, setFormData] = React.useState(modelEmploi);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...data, [id]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${EMPLOI_URL}/emploi-du-temps`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la requête vers l\'API');
                }
                return response.json()
            })
            .then(data => {
                console.log('Un nouveau emploi a été ajouté avec succès', data);
                setFormData(modelEmploi);
                setOpen(false);
                navigate('/listes-emploi-du-temps');
                window.location.reload();
            })
            .catch(err => {
                console.error("Une erreur s'est produite lors de l'operation d'ajout :", err);
            })
    }

    return (
        <React.Fragment>
            <LibraryAddIcon onClick={() => setOpen(true)} />
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
                        Nouveau Emploi du Temps
                    </Typography>
                    <Typography variant='body1' align='center' fontSize='1.2rem'> Veuillez remplir les champs ci-dessous...</Typography>
                    <Divider />
                    <Stack spacing={2} direction="column" sx={{ width: '95%' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    id="dureeEmploi"
                                    label="Duree Emploi"
                                    fullWidth
                                    required
                                    value={data.dureeEmploi}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="dateDebutEmploi"
                                    label="Date de début"
                                    type="date"
                                    fullWidth
                                    required
                                    value={data.dateDebutEmploi}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="dateFinEmploi"
                                    label="Date de fin"
                                    type="date"
                                    fullWidth
                                    required
                                    value={data.dateFinEmploi}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="descriptionEmploi"
                                    label="Description Emploi"
                                    variant="filled"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={data.descriptionEmploi}
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
                            }}
                        >
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

export default Ajouter_EmploiDuTemps;
