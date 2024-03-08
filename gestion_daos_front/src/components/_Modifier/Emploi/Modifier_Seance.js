import * as React from 'react';
import Modal from '@mui/joy/Modal';
import Typography from '@mui/material/Typography';
import { Box, Divider, Stack, TextField, Grid, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { EMPLOI_URL } from '../../../Server_URL/Urls';

function Modifier_Seance ({ seance, open, onClose }) {
    const navigate = useNavigate();
    const initialSeance = {
        jourSeance: '',
        dureeSeance: 0,
        debutSeance: 0,
        finSeance: 0,
        numeroSeance: 0
    }

    const [data, setData] = React.useState(seance);

    const handleChangeSeance = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const { id, value } = e.target;
        setData({...data, [id]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${EMPLOI_URL}/seance/${seance.idSeance}`, {
            method : 'PUT',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify(data)
        })
        .then(response => {
            if(!response.ok){
                throw new Error('Erreur lors de la requête vers l\'API');
            }
            return response.json()
        })
        .then(data => {
            console.log('Séance modifiée avec succès', data);
            setData(initialSeance);
            onClose();
            navigate('/listeSeance', { replace: true });
            window.location.reload();
        })
        .catch(err => {
            console.error("Une erreur s'est produite lors de la modification de la séance :", err);
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
                    fontFamily:'Poppins',  
                    backdropFilter: 'saturate(100%) blur(2px)',
                }}
                className='Modal'
            >
                <Box sx={{ backgroundColor: 'white', p: 2, width: 800 , borderRadius:"10px"}}>
                    <Typography variant="h5" align="center" fontWeight='bold' fontSize='2rem' >
                        Modifier une Séance
                    </Typography>
                    <Typography variant='body1' align='center' fontSize='1.2rem'> Veuillez remplir les champs ci-dessous...</Typography>
                    <Divider />
                    <Stack spacing={2} direction="column" sx={{ width: '95%' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    id="jourSeance"
                                    label="Jour de la Séance"
                                    required
                                    fullWidth
                                    value={data.jourSeance}
                                    onChange={handleChangeSeance}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="dureeSeance"
                                    label="Durée de la Séance"
                                    fullWidth
                                    required
                                    value={data.dureeSeance}
                                    onChange={handleChangeSeance}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="debutSeance"
                                    label="Heure de début de la Séance"
                                    fullWidth
                                    required
                                    value={data.debutSeance}
                                    onChange={handleChangeSeance}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="finSeance"
                                    label="Heure de fin de la Séance"
                                    fullWidth
                                    required
                                    value={data.finSeance}
                                    onChange={handleChangeSeance}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="numeroSeance"
                                    label="Numéro de la Séance"
                                    fullWidth
                                    required
                                    value={data.numeroSeance}
                                    onChange={handleChangeSeance}
                                />
                            </Grid>
                        </Grid>
                    </Stack>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-around' }}>
                        <Button 
                            onClick={onClose} 
                            sx={{
                                background: '#7d7d7d',
                                color:'white', 
                                '&:hover': { backgroundColor: '#000',color:'white' },
                                fontWeight:"600",
                                fontFamily:"Poppins"
                            }}
                        >
                            Annuler
                        </Button>

                        <Button
                            variant="contained"  
                            sx={{ 
                                background: ' rgb(9, 44, 38)',
                                '&:hover': { backgroundColor: 'rgb(17, 77, 67)' },
                                fontWeight:"600",
                                fontFamily:"Poppins"
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

export default Modifier_Seance;
