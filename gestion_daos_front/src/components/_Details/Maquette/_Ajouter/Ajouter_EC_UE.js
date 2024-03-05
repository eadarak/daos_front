import React from 'react'
import Modal from '@mui/joy/Modal';
import Typography from '@mui/material/Typography';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { Box, Divider, Stack, TextField, Grid, Button} from '@mui/material';
import { MAQUETTE_URL } from '../../../../Server_URL/Urls';
import {useNavigate } from 'react-router-dom';
import '../../../../styles/general.css';
import { ContactPageSharp } from '@mui/icons-material';
import DetailsUE from '../DetailsUE';


function Ajouter_EC_UE ({ue}) {
    const [open, setOpen] = React.useState(false);

    const initialEC = {
        idEC : 0,
        libelleEC: '',
        codeEC : '',
        cm : 0,
        td : 0,
        tp : 0,
        tpe : 0,
        coefficientEC : 0,
        descriptionEC : ''
    };

    const [data, setFormData] = React.useState(initialEC);

    const handleChange = (e) =>{
        const { id, value } = e.target;
        setFormData({...data, [id] : value })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`${MAQUETTE_URL}ue/${ue.idUE}/ecs`);
        fetch(`${MAQUETTE_URL}ue/${ue.idUE}/ecs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la requête vers l\'API');
            }
            return response.json();
        })
        .then(data => {
            console.log('Une nouvelle EC a été ajoutée avec succès', data);
            setFormData(initialEC);
            setOpen(false);
            redirectToUeDetails(ue);
        })
        .catch(err => { // Corrected the syntax of catch
            console.error('Une erreur s\'est produite lors de l\'ajout du EC', err.message);
        });
    };
    
    const  redirectToUeDetails = (ue) => {
       <DetailsUE ue={ue}/>
    }

    return (
        <React.Fragment>
             <Button 
                sx={{
                    backgroundColor: '#00AF91',
                    borderRadius: '4px',
                    fontWeight: 600,
                    fontFamily: "Poppins", // Changed 'font-weight' to 'fontWeight' and 'font-family' to 'fontFamily'
                    color: 'rgb(0, 0, 0)',
                    textTransform: 'capitalize', // Changed 'text-transform' to 'textTransform'
                    letterSpacing: '0.5px',
                    padding: '10px',
                    '&:hover': { // Pseudo-class defined separately
                        color: 'rgb(255, 255, 255)',
                        backgroundColor: 'rgb(9, 44, 38)'
                    }
                }} 
                onClick={() => setOpen(true)} 
            >
                Ajouter EC
            </Button>

            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
                sx={{ display: 'flex',
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
                                    id="libelleEC"
                                    label="Libelle EC"
                                    required
                                    fullWidth
                                    value={data.libelleEC}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="codeEC"
                                    label="Code EC"
                                    fullWidth
                                    required
                                    value={data.codeEC}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="cm"
                                    label="Cours Magistral"
                                    fullWidth
                                    required
                                    value={data.cm}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="td"
                                    label="Travaux diriges"
                                    fullWidth
                                    required
                                    value={data.td}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="tp"
                                    label="Travaux pratiques"
                                    fullWidth
                                    required
                                    value={data.tp}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="tpe"
                                    label="Travaux Personnels l'Etudiant"
                                    fullWidth
                                    required
                                    value={data.tpe}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="coefficientEC"
                                    label="Coefficient"
                                    fullWidth
                                    required
                                    value={data.coefficientEC}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="descriptionEC"
                                    label="description EC"
                                    variant="filled"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={data.descriptionEC}
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
                            color:'white', 
                            '&:hover': { backgroundColor: '#000',color:'white' },
                            fontWeight:"600",
                            fontFamily:"Poppins"
                        }}>
                            Annuler
                        </Button>

                        <Button
                            variant="contained"  
                            sx={{ background: ' rgb(9, 44, 38)' , 
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

export default Ajouter_EC_UE;
