import * as React from 'react';
import Modal from '@mui/joy/Modal';
import Typography from '@mui/material/Typography';
import { Box, Divider, Stack, TextField, Grid, Button} from '@mui/material';
import { MAQUETTE_URL } from '../../../Server_URL/Urls';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

function Modifier_Niveau ({ niveau, open, onClose }) {
    const navigate = useNavigate();

    const initialNiveau = {
        libelleNiveau: '',
        descriptionNiveau: ''
    };


    const [data, setData] = React.useState(niveau);

    const handleChange = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const { id, value } = e.target;
        setData({...data, [id]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${MAQUETTE_URL}niveau/${niveau.idNiveau}`, {
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
            console.log('EC modifiée avec succès', data);
            setData(initialNiveau);
            onClose();
            navigate('/listes-niveau', { replace: true });
            window.location.reload();
        })
        .catch(err => {
            console.error("Une erreur s'est produite lors de la modification de l'EC :", err);
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
                        Niveau
                    </Typography>
                    <Typography variant='body1' align='center' fontSize='1.2rem'> Veuillez remplir les champs ci-dessous...</Typography>
                    <Divider />
                    <Stack spacing={2} direction="column" sx={{ width: '95%' }}>
                    <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    id="libelleNiveau"
                                    label="Libelle de l'niveau"
                                    required
                                    fullWidth
                                    value={data.libelleNiveau}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="descriptionNiveau"
                                    label="description de l'niveau"
                                    variant="filled"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={data.descriptionNiveau}
                                    onChange={handleChange}
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

export default Modifier_Niveau;
