import * as React from 'react';
import Modal from '@mui/joy/Modal';
import Typography from '@mui/material/Typography';
import { Box, Divider, Stack, TextField, Grid, Button} from '@mui/material';
import {  REPARTITION_URL } from '../../../Server_URL/Urls';
import { useNavigate } from 'react-router-dom';

function Modifier_PER ({ per, open, onClose }) {
    const navigate = useNavigate();
    const modelPER = {
        idEns : 0,
        nomEns: '',
        prenomEns : '',
        matriculePer : '',
        gradeEns : ''
       
    };

    const [data, setData] = React.useState(per);
/*
    const handleOpen = (e) => {
        e.stopPropagation();
        setOpen(true);
    }

    const handleClose = (e) => {
        e.stopPropagation();
        setOpen(false);
    }    
*/
    const handleChangePER = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const { id, value } = e.target;
        setData({...data, [id]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${REPARTITION_URL}/per/${per.idEns}`, {
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
            console.log('PER modifiée avec succès', data);
            setData(modelPER);
            onClose();
            navigate('/listePER', { replace: true });
            window.location.reload();
        })
        .catch(err => {
            console.error("Une erreur s'est produite lors de la modification de l'UE :", err);
        });
    }
    /*
         <IconButton aria-label="edit">
             <EditIcon color='success' onClick={handleOpen}  />
             </IconButton>
     */

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
                        Modifier Enseignant PER
                    </Typography>
                    <Typography variant='body1' align='center' fontSize='1.2rem'> Veuillez remplir les champs ci-dessous...</Typography>
                    <Divider />
                    <Stack spacing={2} direction="column" sx={{ width: '95%' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    id="nomEns"
                                    label="Nom Ens"
                                    required
                                    fullWidth
                                    value={data.nomEns}
                                    onChange={handleChangePER}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="prenomEns"
                                    label="Prenom Ens "
                                    fullWidth
                                    required
                                    value={data.prenomEns}
                                    onChange={handleChangePER}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="matriculePer"
                                    label="Matricule Per"
                                    fullWidth
                                    required
                                    value={data.matriculePer}
                                    onChange={handleChangePER}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="gradeEns"
                                    label="Grade Ens"
                                    fullWidth
                                    required
                                    value={data.gradeEns}
                                    onChange={handleChangePER}
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

export default Modifier_PER;
