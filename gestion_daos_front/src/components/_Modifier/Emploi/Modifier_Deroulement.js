import * as React from 'react';
import Modal from '@mui/joy/Modal';
import Typography from '@mui/material/Typography';
import { Box, Divider, Stack, TextField, Grid, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { EMPLOI_URL } from '../../../Server_URL/Urls';


function Modifier_Deroulement ({ der, open, onClose }) {
    const navigate = useNavigate();
    const modelDeroulement = {
        idDeroulement : 0,
        objectifsDeroulement: '',
        descriptionDeroulement : '',

    };

    const [data, setData] = React.useState(der);

    const handleChangeDeroulement = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const { id, value } = e.target;
        setData({...data, [id]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${EMPLOI_URL}/deroulement/${der.idDeroulement}`, {
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
            console.log('Deroulement modifié avec succès', data);
            setData(modelDeroulement);
            onClose();
            navigate('/listeDeroulement', { replace: true });
            window.location.reload();
        })
        .catch(err => {
            console.error("Une erreur s'est produite lors de la modification du deroulement :", err);
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
                        Modifier un Deroulement
                    </Typography>
                    <Typography variant='body1' align='center' fontSize='1.2rem'> Veuillez remplir les champs ci-dessous...</Typography>
                    <Divider />
                    <Stack spacing={2} direction="column" sx={{ width: '95%' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    id="objectifsDeroulement"
                                    label="Objectifs Deroulement"
                                    required
                                    fullWidth
                                    value={data.objectifsDeroulement}
                                    onChange={handleChangeDeroulement}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="descriptionDeroulement"
                                    label="Description Deroulement"
                                    fullWidth
                                    required
                                    value={data.descriptionDeroulement}
                                    onChange={handleChangeDeroulement}
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

export default Modifier_Deroulement;
