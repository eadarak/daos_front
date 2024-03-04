import * as React from 'react';
import Modal from '@mui/joy/Modal';
import Typography from '@mui/material/Typography';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { Box, DialogContent, DialogTitle, Divider, Stack, TextField, Grid, Button} from '@mui/material';
import { MAQUETTE_URL } from '../../../Server_URL/Urls';
import ListeUE from '../../_Listes/Maquette/ListeUE';

function Ajouter_UE () {
    const [open, setOpen] = React.useState(false);
    const initialUE = {
        idUE: 0,
        libelleUE: '',
        codeUE: '',
        creditUE: 0,
        coefficientUE: 0,
        descriptionUE: ''
    }

    const [data , setData] = React.useState(initialUE);

    const handleChange = (e) =>{
       setData({
        ...data,
        [e.target.id] : e.target.value
       })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${MAQUETTE_URL}ue`,{
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body : JSON.stringify(data)
        })
        .then(response =>{
            if(!response.ok){
                console.log('la reponse est different de ok')
            }
            return response.json()
        })
        .then( data => {
            console.log( 'un nouveau UE a ete ajoutee');
            console.log(data);

            //Reinitialisation du formulaire
            setData(initialUE);

            //rediriger vers la page des listes des UEs
            window.location.href = 'ListeUE'

        })
        .catch( err => {
            console.log('Une Erreur est survenu lors de l\'operation de POST' ,err);
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
                sx={{ display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center', 
                    fontFamily:'Poppins',  
                    backdropFilter: 'saturate(100%) blur(2px)',
                 }}
                className='Modal'
            >
                <Box sx={{ backgroundColor: 'white', p: 2, width: 800 }}>
                    <Typography variant="h5" align="center" fontWeight='bold' fontSize='2rem' >
                        Unité d'Enseignement
                    </Typography>
                    <Typography variant='body1' align='center' fontSize='1.2rem'> remplir le Contenu de l'unité d'enseignement...</Typography>
                    <Divider />
                    <Stack spacing={2} direction="column" sx={{ width: '95%' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    id="libelleUE"
                                    label="Libelle UE"
                                    value={data.libelleUE}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="codeUE"
                                    label="Code UE"
                                    value={data.codeUE}
                                    onChange={handleChange}

                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="creditUE"
                                    label="Nombre de Credit"
                                    value={data.creditUE}
                                    onChange={handleChange}

                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="coefficientUE"
                                    label="Coefficient"
                                    value={data.coefficientUE}
                                    onChange={handleChange}

                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="descriptionUE"
                                    label="description UE"
                                    value={data.descriptionUE}
                                    onChange={handleChange}
                                    variant="filled"
                                    fullWidth
                                    multiline
                                    rows={3}
                                />
                            </Grid>
                        </Grid>
                    </Stack>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-around' }}>
                        <Button onClick={() => setOpen(false)} sx={{
                            background: '#7d7d7d',
                            color:'white',
                            '&:hover': { backgroundColor: '#000',
                                        color:'white' }
                        }}>Annuler</Button>
                        <Button 
                            variant="contained"  
                            sx={{ background: ' rgb(9, 44, 38)' , '&:hover': { backgroundColor: 'rgb(17, 77, 67)' }}} 
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

export default Ajouter_UE;
