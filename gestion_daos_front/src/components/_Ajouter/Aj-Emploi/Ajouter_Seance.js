import * as React from 'react';
import Modal from '@mui/joy/Modal';
import Typography from '@mui/material/Typography';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { Box, Divider, Stack, TextField, Grid, Button} from '@mui/material';
import { EMPLOI_URL } from '../../../Server_URL/Urls';
import { useNavigate } from 'react-router-dom';

function Ajouter_Seance () {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const initialFormData = {
        idSeance: 0,
        jourSeance:'',
        dureeSeance:0,
        debutSeance:0,
        finSeance: 0,
        numeroSeance: 0,
    };

    const [formData, setFormData] = React.useState(initialFormData);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${EMPLOI_URL}/seance`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la requête vers l\'API');
            }
            return response.json();
        })
        .then(data => {
            console.log('Nouvelle séance ajoutée avec succès', data);
            setFormData(initialFormData);
            setOpen(false);
            navigate('/listeSeance');
            window.location.reload();
        })
        .catch(err => {
            console.error("Une erreur s'est produite lors de l'ajout de la séance :", err);
        });
    };

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
                <Box sx={{ backgroundColor: 'white', p: 2, width: 800, borderRadius: '10px' }}>
                    <Typography variant="h5" align="center" fontWeight='bold' fontSize='2rem'>
                        Nouvelle Séance
                    </Typography>
                    <Typography variant='body1' align='center' fontSize='1.2rem'> Veuillez remplir les champs ci-dessous...</Typography>
                    <Divider />
                    <Stack spacing={2} direction="column" sx={{ width: '95%' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    id="jourSeance"
                                    label="Jour de la Seance"
                                    required
                                    fullWidth
                                    value={formData.jourSeance}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="dureeSeance"
                                    label="Duree de la Seance"
                                    required
                                    fullWidth
                                    value={formData.dureeSeance}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="debutSeance"
                                    label="Heure debut de la Seance"
                                    required
                                    fullWidth
                                    value={formData.debutSeance}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="finSeance"
                                    label="Heure de Fin de la Seance"
                                    required
                                    fullWidth
                                    value={formData.finSeance}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="numeroSeance"
                                    label="Numero de la Seance"
                                    required
                                    fullWidth
                                    value={formData.numeroSeance}
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
                                fontWeight: '600',
                                fontFamily: 'Poppins'
                            }}
                        >
                            Annuler
                        </Button>

                        <Button
                            variant="contained"
                            sx={{
                                background: 'rgb(9, 44, 38)',
                                '&:hover': { backgroundColor: 'rgb(17, 77, 67)' },
                                fontWeight: '600',
                                fontFamily: 'Poppins'
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

export default Ajouter_Seance;
