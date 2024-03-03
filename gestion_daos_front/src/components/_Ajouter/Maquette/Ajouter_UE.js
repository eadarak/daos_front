import * as React from 'react';
import Modal from '@mui/joy/Modal';
import Typography from '@mui/material/Typography';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { Box, DialogContent, DialogTitle, Divider, Stack, TextField, Grid, Button} from '@mui/material';

function Ajouter_UE () {
    const [open, setOpen] = React.useState(false);

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
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="codeUE"
                                    label="Code UE"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="creditUE"
                                    label="Nombre de Credit"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="coefficientUE"
                                    label="Coefficient"
                                    fullWidth
                                    required
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
                        <Button variant="contained"  sx={{ background: ' rgb(9, 44, 38)' , '&:hover': { backgroundColor: 'rgb(17, 77, 67)' }}} className='validButton' id='validButton'>Enregistrer</Button>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default Ajouter_UE;
