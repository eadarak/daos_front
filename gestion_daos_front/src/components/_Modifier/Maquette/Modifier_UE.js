import * as React from 'react';
import Modal from '@mui/joy/Modal';
import Typography from '@mui/material/Typography';
import { Box, Divider, Stack, TextField, Grid, Button} from '@mui/material';
import { MAQUETTE_URL } from '../../../Server_URL/Urls';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

function Modifier_UE ({ ue, open, onClose }) {
    const navigate = useNavigate();
    const initialUE = {
        libelleUE: '',
        codeUE: '',
        creditUE: '',
        coefficientUE: '',
        descriptionUE: ''
    }

    const [data, setData] = React.useState(ue);
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
    const handleChangeUE = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const { id, value } = e.target;
        setData({...data, [id]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${MAQUETTE_URL}ue/${ue.idUE}`, {
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
            console.log('UE modifiée avec succès', data);
            setData(initialUE);
            onClose();
            navigate('/listeUE', { replace: true });
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
                        Unité d'Enseignement
                    </Typography>
                    <Typography variant='body1' align='center' fontSize='1.2rem'> Veuillez remplir les champs ci-dessous...</Typography>
                    <Divider />
                    <Stack spacing={2} direction="column" sx={{ width: '95%' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    id="libelleUE"
                                    label="Libelle UE"
                                    required
                                    fullWidth
                                    value={data.libelleUE}
                                    onChange={handleChangeUE}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="codeUE"
                                    label="Code UE"
                                    fullWidth
                                    required
                                    value={data.codeUE}
                                    onChange={handleChangeUE}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="creditUE"
                                    label="Nombre de Credit"
                                    fullWidth
                                    required
                                    value={data.creditUE}
                                    onChange={handleChangeUE}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="coefficientUE"
                                    label="Coefficient"
                                    fullWidth
                                    required
                                    value={data.coefficientUE}
                                    onChange={handleChangeUE}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="descriptionUE"
                                    label="description UE"
                                    variant="filled"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={data.descriptionUE}
                                    onChange={handleChangeUE}
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

export default Modifier_UE;
