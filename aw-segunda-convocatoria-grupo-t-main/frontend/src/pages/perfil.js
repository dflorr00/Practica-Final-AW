import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { editUser, getUserInfo } from '../server/communication';
import imagen from "../images/perfil.jpg";
import axios from 'axios';
import theme from '../theme';
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function Perfil(props) {
    const [username, setUsername] = useState(cookies.get('user'));
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUserData() {
            var userInfo = await getUserInfo(username);
            setName(userInfo.name);
            setSurname(userInfo.surname);
            setEmail(userInfo.email);
            if (!userInfo.image) {
                setImage(imagen);
            } else {
                if (userInfo.image.data) {
                    var imageURL = 'data:' + userInfo.image.ext + ';base64,' + userInfo.image.data;
                    setImage(imageURL);
                }

            }
        }
        fetchUserData();


    }, [username]);

    const editUserEvent = async (event) => {
        event.preventDefault();
        let data = new FormData(event.currentTarget);
        await axios({
            url: image,
            method: 'GET',
            responseType: 'blob'
        })
            .then((res) => {
                return new Blob([res.data], { type: res.data.type });
            })
            .then((blob) => {
                data.append("image", blob);
            });
        await editUser(username, data);
    };

    const changeImage = (event) => {
        if (event.target.files[0].type.startsWith('image/')) {
            var imageURL = window.URL.createObjectURL(event.target.files[0]);
            setImage(imageURL);
        }
    };

    const volverBandeja = (event) => {
        navigate("/bandejaEntrada");
    };



    return (
        <CardContent align="center">
            <Card align="left" sx={{ width: "50%", padding: "0px 30px" }}><CardContent>
                {/*Logo y titulo*/}
                <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.main }}><LockOutlinedIcon /></Avatar>
                <Typography component="h1" variant="h5">Informacion del perfil</Typography>
                <Box component="form" onSubmit={(event) => editUserEvent(event)} sx={{ mt: 6 }}>
                    <Grid container spacing={2}>
                        {/*Foto y parte de la izquierda*/}
                        <Grid item xs={6} container>
                            <Grid item xs={12}>
                                <Grid item><img src={image} style={{ borderRadius: 'auto', minWidth: '20vw', maxWidth: '20vw', minHeight: '20vw', maxHeight: '20vw' }} alt="User Profile"></img></Grid>
                                <Grid item xs={12}><label htmlFor="icon-button-file">
                                    <Input sx={{ display: "none" }} accept="image/*" id="icon-button-file" onChange={changeImage} type="file" />
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera sx={{ m: 1, color: theme.palette.primary.main }} />
                                    </IconButton>
                                </label></Grid>
                            </Grid>
                        </Grid>
                        {/*Formulario y parte de la derecha*/}
                        <Grid item xs={6} container>
                            <Grid item xs={12} sm={6}><TextField margin="normal" fullWidth sx={{ mr: 2 }} label="Nombre" name="name" value={name} onChange={(event) => setName(event.target.value)} /></Grid>
                            <Grid item xs={12} sm={6}><TextField margin="normal" fullWidth label="Apellidos" name="surname" value={surname} onChange={(event) => setSurname(event.target.value)} /></Grid>
                            <Grid item xs={12}><TextField margin="normal" fullWidth label="Nombre de usuario" name="username" value={username} disabled /></Grid>
                            <Grid item xs={12}><TextField margin="normal" fullWidth label="Correo Electrónico" name="email" value={email} onChange={(event) => setEmail(event.target.value)} /></Grid>
                            <Grid item xs={12}><TextField margin="normal" fullWidth label="Contraseña" name="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></Grid>
                            <Grid item xs={12}><Button type="submit" fullWidth variant="contained" sx={{ mt: 4 }} >Editar el perfil</Button></Grid>
                            <Grid item xs={12}><Button fullWidth variant="outlined" onClick={volverBandeja} sx={{ mt: 3 }} >Volver a la bandeja de entrada</Button></Grid>
                        </Grid>
                    </Grid>
                </Box>
            </CardContent></Card>
        </CardContent>
    );
}