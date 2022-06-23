import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import { logUser, auth } from '../server/communication';
import theme from '../theme';

function Copyright(props) {
  return ( 
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
       {'Copyright © '}
      <Link color="inherit" href="/login"> KMail.com </Link>
      {' '}{new Date().getFullYear()}{'.'}
    </Typography>
  );
}

export default function Login() {
    const [error,setError] = useState('hidden');
    const navigate = useNavigate();
    
    useEffect(()=>{
      async function authenticate(){
        if(await auth()){
          navigate("/bandejaEntrada");
        }
      }
      authenticate()
    }, [navigate]);

    const inicioSesion = async(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        var logged = await logUser(data.get("email"), data.get("password"));
        if(logged){
          navigate("/bandejaEntrada");
        }else{
          setError('visible');
          setTimeout(()=>setError('hidden'),1200);
        }
    };

    const registrarse = (event) => {
      navigate('/registro');
    };

    return (
      <Container component="main" maxWidth="xs">
          <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              {/*Logo y titulo*/}
              <Avatar sx={{ m: 1, bgcolor:theme.palette.primary.main}}><LockOutlinedIcon /></Avatar>
              <Typography component="h1" variant="h5">Iniciar sesión</Typography>
              <div>
                  {/*Inicio de sesión*/}
                  <Box component="form" onSubmit={inicioSesion} noValidate sx={{ mt: 1 }}>
                    <TextField margin="normal"  fullWidth label="Correo Electrónico" name="email" autoFocus/>
                    <TextField margin="normal"  fullWidth label="Introduce tu contraseña" name="password" type="password" autoComplete="current-password"/>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 2}} > Iniciar sesión </Button>
                  </Box>
                  {/*Registro*/}
                  <Box component="form" onSubmit={registrarse}>
                    <Button type="submit" fullWidth variant="contained" sx={{mb: 2}} > Registrarse </Button>
                  </Box>
                  {/*Alerta de inicio de sesion*/}
                  <Alert variant="filled" severity="warning" style={{visibility:error}}>Usuario o contraseña incorrectos</Alert>  
              </div>
          </Box>
            {/*Pie de pagina*/}
            <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}