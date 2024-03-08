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
import DetailsClasse from '../DetailsClasse';


function Ajouter_Groupe_Classe ({classe}) {
    const [open, setOpen] = React.useState(false);

    const initialGroupe = {
        idGroupe : 0,
        libelleGroupe: '',
        numeroGroupe : 0,
        effectifGroupe : 0,
        descriptionGroupe: ''
    };

    const [data, setFormData] = React.useState(initialGroupe);

    const handleChange = (e) =>{
        const { id, value } = e.target;
        setFormData({...data, [id] : value })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`${MAQUETTE_URL}classe/${classe.idClasse}/groupes`);
        fetch(`${MAQUETTE_URL}classe/${classe.idClasse}/groupes`, {
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
            console.log('Un nouveau groupe a été ajouté avec succès', data);
            setFormData(initialGroupe);
            setOpen(false);
            redirectToUeDetails(classe);
        })
        .catch(err => { // Corrected the syntax of catch
            console.error('Une erreur s\'est produite lors de l\'ajout du groupe', err.message);
        });
    };
    
    const  redirectToUeDetails = (classe) => {
       <DetailsClasse classe={classe}/>
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
                    '&:hover': { 
                        color: 'rgb(255, 255, 255)',
                        backgroundColor: 'rgb(9, 44, 38)'
                    }
                }} 
                onClick={() => setOpen(true)} 
            >
                Ajouter Groupe
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
                        Groupe 
                    </Typography>
                    <Typography variant='body1' align='center' fontSize='1.2rem'> Veuillez remplir les champs ci-dessous...</Typography>
                    <Divider />
                    <Stack spacing={2} direction="column" sx={{ width: '95%' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    id="libelleGroupe"
                                    label="Libelle du groupe"
                                    required
                                    fullWidth
                                    value={data.libelleGroupe}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="numeroGroupe"
                                    label="Numero du groupe"
                                    fullWidth
                                    required
                                    value={data.numeroGroupe}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="effectifGroupe"
                                    label="Effectif Groupe"
                                    fullWidth
                                    required
                                    value={data.effectifGroupe}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="descriptionGroupe"
                                    label="description du groupe"
                                    variant="filled"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={data.descriptionGroupe}
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

export default Ajouter_Groupe_Classe;
