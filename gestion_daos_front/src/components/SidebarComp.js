import React from 'react';
import { NavLink } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import '../styles/sidebarStyles.css'; // Importez le fichier de style
import RepartitionIcon from '@mui/icons-material/Repartition';
import BookIcon from '@mui/icons-material/Book';
import InputIcon from '@mui/icons-material/Input';
 import HomeIcon from '@mui/icons-material/Home';
import logo from '../assets/img/logo.png';
//import MyAvatar from '../assets/img/MyAvatar.svg';
//import { ToggleButton } from '@mui/material';
import PasswordIcon from '@mui/icons-material/Password';
import LinkIcon from '@mui/icons-material/Link';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const CustomAppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function SidebarComp({ sidebarOpen, handleDrawerOpen, handleDrawerClose }) {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <CustomAppBar position="fixed" open={sidebarOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(sidebarOpen && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h4" 
            noWrap component="div" 
            fontFamily={"Poppins"} 
            fontWeight={"500"}
          >
            <img src={logo} width={50} height={50} alt="Logo"/>
            &nbsp; Gestion des Enseignements        
          </Typography>

          {/* <ToggleButton  style={{  left: '50rem' }}>
          <img src={MyAvatar} alt='MyAvatar' width={50} height={50} color='white'
            
          />
          </ToggleButton> */}
        </Toolbar>
        
      </CustomAppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={sidebarOpen}
      >
        <DrawerHeader >
        
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List className='sidebar-container'> {/* Utilisez la classe spécifique ici */}
            <ListItem disablePadding>
              <NavLink to="/" className="sidebar-link">
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon/>
                  </ListItemIcon>
                  <ListItemText className='sidebar-link-item'>Home</ListItemText>
                </ListItemButton>
              </NavLink>
            </ListItem> 
           
            <ListItem disablePadding>
              <NavLink  to="/repartition" className="sidebar-link">
              <ListItemButton>
                <ListItemIcon>
                  <RepartitionIcon/>
                </ListItemIcon>
                <ListItemText className='sidebar-link-item'>Repartition</ListItemText>
              </ListItemButton>
              </NavLink>
            </ListItem>
            {/* <p>𓂃𓂃𓂃𓂃𓂃𓂃𓂃𓂃𓂃𓂃𓂃𓂃𓂃𓂃𓂃</p> */}
            <ListItem disablePadding>
              <NavLink to="/maquette" className="sidebar-link">
              <ListItemButton>
                <ListItemIcon>
                  <BookIcon/>
                </ListItemIcon>
                <ListItemText className='sidebar-link-item'>Maquette</ListItemText>
              </ListItemButton>
              </NavLink>
            </ListItem>
            {/* <p>𓂃𓂃𓂃𓂃𓂃𓂃𓂃𓂃𓂃𓂃𓂃𓂃𓂃𓂃𓂃</p> */}
            <ListItem disablePadding>
             <NavLink to="/emploi" className="sidebar-link">
             <ListItemButton>
                <ListItemIcon>
                  <InputIcon/>
                </ListItemIcon>
                <ListItemText className='sidebar-link-item'>Emploi</ListItemText>
              </ListItemButton>
             </NavLink>
            </ListItem>
            {/* <p>𓂃𓂃𓂃𓂃𓂃𓂃𓂃𓂃𓂃𓂃𓂃𓂃𓂃𓂃𓂃</p> */}
            <br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/>
            <ListItem disablePadding>
             <NavLink to="/authentification" className="sidebar-link">
             <ListItemButton>
                <ListItemIcon>
                  <PasswordIcon/>
                </ListItemIcon>
                <ListItemText>Authentification</ListItemText>
              </ListItemButton>
             </NavLink>
            </ListItem>
            <ListItem disablePadding>
             <NavLink to="#" className="sidebar-link">
             <ListItemButton>
                <ListItemIcon>
                  <PlagiarismIcon/>
                </ListItemIcon>
                <ListItemText>Documentation</ListItemText>
              </ListItemButton>
             </NavLink>
            </ListItem>
            <ListItem disablePadding>
             <NavLink to="#" className="sidebar-link">
             <ListItemButton>
                <ListItemIcon>
                  <LinkIcon/>
                </ListItemIcon>
                <ListItemText>Liens Utiles</ListItemText>
              </ListItemButton>
             </NavLink>
            </ListItem>
        </List>
        <br/>
        <ListItemText style={{  marginLeft: '18px' }}>
              &copy;  CMC & Eadarak
            </ListItemText>
        
        <Divider />
      </Drawer>
    </Box>
  );
}
