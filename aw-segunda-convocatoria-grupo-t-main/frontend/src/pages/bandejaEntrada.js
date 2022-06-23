import * as React from 'react';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Popup from 'reactjs-popup';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { styled } from '@mui/material/styles';
import { getReceivedMessages, getSentMessages, sendMessage, logout } from '../server/communication';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCommentSharpIcon from '@mui/icons-material/AddCommentSharp';
import SendIcon from '@mui/icons-material/Send';
import GroupsList from '../components/grouplist';
import Alert from '@mui/material/Alert';
import Cookies from "universal-cookie";
import FormatMessage from '../components/messageFormat';

const cookies = new Cookies();


export default function BandejaEntrada(props) {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [tipoMensajes, setTipoMensajes] = useState('recibidos');
  const [pageTitle, setPageTitle] = useState("Mensajes recibidos");
  const [mensajes, setMensajes] = useState({ "enviados": [], "recibidos": [] });
  const [botonEnviar, setBotonEnviar] = useState('hidden');
  const drawerWidth = 240;
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => { setOpen(true); };
  const handleDrawerClose = () => { setOpen(false); };
  const [username, setUsername] = useState(cookies.get('user'));
  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open', })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );



  useEffect(() => {
    const fetchData = async () => {
      await cargarMensajes();
    }
    fetchData();
  }, []);


  const cargarMensajes = async () => {
    var recibidos = await getReceivedMessages(username);
    var enviados = await getSentMessages(username);
    //Ordenar de mas nuevo a mas antiguo
    recibidos.sort(function (a, b) {
      return new Date(b.send_date) - new Date(a.send_date);
    });
    enviados.sort(function (a, b) {
      return new Date(b.send_date) - new Date(a.send_date);
    });
    setMensajes({ enviados: enviados, recibidos: recibidos });;
  }

  const crearMensaje = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await sendMessage(data.get("asunto"), data.get("cuerpo"), username, data.get("destinatario"));
    setBotonEnviar('visible');
    setTimeout(() => setBotonEnviar('hidden'), 2000);
  };

  function logoutFunction() {
    logout();
    navigate("/login");
  }

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} >
        <Toolbar>
          <IconButton onClick={handleDrawerOpen} sx={{ marginRight: 5, ...(open && { display: 'none' }), }}><MenuIcon sx={{ color: "#FFFFFF" }} /></IconButton>
          <Typography variant="h6" noWrap component="div">{pageTitle}</Typography>
        </Toolbar>
      </AppBar>
      {/*Menu desplegable */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}> <ChevronRightIcon /> </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          <ListItem button key={"Mensajes Recibidos"} selected={selectedIndex === 0} onClick={function (event) { setTipoMensajes("recibidos"); setPageTitle("Mensajes recibidos"); cargarMensajes();handleListItemClick(event, 0) }}>
            <ListItemIcon> <InboxIcon sx={{ color: "#BF0202" }} /></ListItemIcon>
            <ListItemText primary={"Mensajes Recibidos"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItem>
          <ListItem button key={"Mensajes Enviados"} selected={selectedIndex === 1} onClick={function (event) { setTipoMensajes("enviados"); setPageTitle("Mensajes enviados"); cargarMensajes();handleListItemClick(event, 1) }}>
            <ListItemIcon> <MailIcon sx={{ color: "#BF0202" }} /></ListItemIcon>
            <ListItemText primary={"Mensajes Enviados"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={() => navigate("/perfil")}>
            <ListItemIcon><AccountCircle sx={{ color: "#BF0202" }} button /></ListItemIcon>
            <ListItemText primary='Perfil' sx={{ opacity: open ? 1 : 0 }} />
          </ListItem>
          <ListItem button onClick={logoutFunction}>
            <ListItemIcon><LogoutIcon sx={{ color: "#BF0202" }} /></ListItemIcon>
            <ListItemText primary='Cerrar Sesión' sx={{ opacity: open ? 1 : 0 }} />
          </ListItem>
        </List>
        
        <Divider />
        <GroupsList canOpen={open} />
      </Drawer>
      {/*Parte de los mensajes */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Grid container spacing={2}>
          {/*Creador de mensajes */}
          <Grid item sx={{ position: "fixed", bottom: 10, right: 10 }}>
            <Popup trigger={<IconButton><AddCommentSharpIcon fontSize="large" sx={{ color: "black" }} /></IconButton>} position="top right">
              <Card><CardContent><Box component="form" onSubmit={crearMensaje}>
                <TextField label="Destinatario" name="destinatario" color='error' variant="standard" /><br />
                <TextField label="Asunto" name="asunto" color='error' variant="standard" /><br />
                <TextField label="Contenido" name="cuerpo" color='error' variant="standard" multiline rows={4} /><br />
                <IconButton type="submit" sx={{ mt: 2 }} ><SendIcon /></IconButton>
                <Alert variant="filled" severity="success" style={{ visibility: botonEnviar }}>Mensaje enviado</Alert>
              </Box></CardContent></Card>
            </Popup>
          </Grid>
          {/*Mensajes */}
          <List sx={{ minWidth: "100%" }}>
            {
              mensajes[tipoMensajes].map((mensaje) => (
                <FormatMessage issue={mensaje.issue} sender={mensaje.sender.username} body={mensaje.body} receiver={mensaje.receiver.username} send_date={mensaje.send_date} />
              ))
            }
          </List>
        </Grid>
      </Box>
    </Box >
  );
}