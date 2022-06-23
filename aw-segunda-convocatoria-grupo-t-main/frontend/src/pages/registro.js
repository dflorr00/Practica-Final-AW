import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { registerUser } from '../server/communication';

export default function Registro() {
    const [error, setError] = useState('hidden');
    const [agree, setAgree] = useState(false);
    const [premiumUser, setPremiumUser] = useState(false);
    const navigate = useNavigate();
    const [contraseñasNoIguales, setcontraseñasNoIguales] = useState('hidden');

    const registrarse = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        console.log(data.get("password") === data.get("password2"));
        if (data.get('password') === data.get('passwordrepeat')) {
            setcontraseñasNoIguales('hidden');
            const type = premiumUser ? 'premium' : 'standard';

            var registered = registerUser(data.get('username'), data.get('name'), data.get('surname'), data.get('email'), data.get('password'), type);
            if (registered) {
                navigate('/login');
            } else {
                setError('visible');
                setTimeout(() => setError('hidden'), 1200);
                console.log(error);
            }
        } else {
            setcontraseñasNoIguales('visible');
            setTimeout(() => setcontraseñasNoIguales('hidden'), 1200);
        }
    };

    const volverInicio = (event) => {
        navigate('/login');
    };

    const toggleAgree = (event) => {
        setAgree(!agree);
    };
    const togglePremium = (event) => {
        setPremiumUser(!premiumUser);
    };


    return (
        <CardContent align="center" >
            <Card align="left" sx={{ width: "50%" }}>
                <CardContent>
                    {/*Logo y titulo*/}
                    <Avatar sx={{ m: 1, bgcolor: 'BF0202' }}><LockOutlinedIcon /></Avatar>
                    <Typography component="h1" variant="h5">Registrarse</Typography>
                    {/*Formulario de registro*/}
                    <Box component="form" onSubmit={registrarse}>
                        <Grid container spacing={0} >
                            <Grid item xs={6} ><TextField margin="normal" required fullWidth label="Nombre" name="name" /></Grid>
                            <Grid item xs={6}><TextField margin="normal" required fullWidth label="Apellidos" name="surname" /></Grid>
                            <Grid item xs={12}><TextField margin="normal" required fullWidth label="Nombre de usuario" name="username" /></Grid>
                            <Grid item xs={12}><TextField margin="normal" required fullWidth label="Correo Electrónico" name="email" /></Grid>
                            <Grid item xs={6}><TextField margin="normal" required fullWidth label="Contraseña" name="password" type="password" /></Grid>
                            <Grid item xs={6}><TextField margin="normal" required fullWidth label="Repite la Contraseña" name="passwordrepeat" type="password" /></Grid>
                            <Grid item xs={18}>
                                <FormControlLabel control={<Checkbox onChange={togglePremium} />} label="Usuario premium" />
                            </Grid>
                            <Grid item xs={18} sx={{ padding: "0px" }}>
                                <FormControlLabel control={<Checkbox onChange={toggleAgree} />} label="He leido y acepto la declaracion de privacidad" />
                            </Grid>

                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }} disabled={!agree}> Registrarse </Button>
                    </Box>
                    <Box component="form" onSubmit={volverInicio}><Button type="submit" fullWidth variant="outlined" sx={{ mb: 2 }}  > Volver al inicio de sesión</Button></Box>
                    {/*Alerta contraseñas El nombre, los apellidos, el nombre de usuario, la contraseña y el email*/}
                    <Alert variant="filled" severity="warning" style={{ visibility: error }}>Fallo en el registro. Inténtalo de nuevo.</Alert>
                    <Alert variant="filled" severity="warning" style={{ visibility: contraseñasNoIguales }}>Las contraseñas deben coincidir</Alert>

                </CardContent>
            </Card>
        </CardContent>
    );
}