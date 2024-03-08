import * as React from 'react';
import Modal from '@mui/joy/Modal';
import Typography from '@mui/material/Typography';
import { Box, Divider, Stack, TextField, Grid, Button } from '@mui/material';
import { MAQUETTE_URL } from '../../../Server_URL/Urls'; // Assurez-vous d'importer le bon URL pour les modules
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

function Modifier_Module({ module, open, onClose }) {
    const navigate = useNavigate();
    const initialModule = {
        libelleModule: '',
        codeModule: '',
        coursModule: '',
        dureeModule: 0,
        coefficientModule: 0,
        objectifsModule: '',
        descriptionModule: ''
    }

    const [data, setData] = React.useState(module);

    const handleChangeModule = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const { id, value } = e.target;
        setData({ ...data, [id]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${MAQUETTE_URL}module/${module.idModule}`, {
            method: 'PUT',
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
                console.log('Module modifié avec succès', data);
                setData(initialModule);
                onClose();
                navigate('/listes-module', { replace: true });
                window.location.reload();
            })
            .catch(err => {
                console.error("Une erreur s'est produite lors de la modification du module :", err);
            });
    }

    return (
        <React.Fragment>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={onClose}
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
                        Module
                    </Typography>
                    <Typography variant='body1' align='center' fontSize='1.2rem'> Veuillez remplir les champs ci-dessous...</Typography>
                    <Divider />
                    <Stack spacing={2} direction="column" sx={{ width: '95%' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    id="libelleModule"
                                    label="Libelle Module"
                                    required
                                    fullWidth
                                    value={data.libelleModule}
                                    onChange={handleChangeModule}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="codeModule"
                                    label="Code Module"
                                    fullWidth
                                    required
                                    value={data.codeModule}
                                    onChange={handleChangeModule}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="coursModule"
                                    label="Cours Module"
                                    fullWidth
                                    required
                                    value={data.coursModule}
                                    onChange={handleChangeModule}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="dureeModule"
                                    label="Durée Module"
                                    fullWidth
                                    required
                                    value={data.dureeModule}
                                    onChange={handleChangeModule}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="coefficientModule"
                                    label="Coefficient"
                                    fullWidth
                                    required
                                    value={data.coefficientModule}
                                    onChange={handleChangeModule}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="objectifsModule"
                                    label="Odjectifs du Module"
                                    variant="filled"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={data.objectifsModule}
                                    onChange={handleChangeModule}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="descriptionModule"
                                    label="description Module"
                                    variant="filled"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={data.descriptionModule}
                                    onChange={handleChangeModule}
                                />
                            </Grid>
                        </Grid>
                    </Stack>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-around' }}>
                        <Button
                            onClick={onClose}
                            sx={{
                                background: '#7d7d7d',
                                color: 'white', '&:hover': { backgroundColor: '#000', color: 'white' },
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

export default Modifier_Module;
