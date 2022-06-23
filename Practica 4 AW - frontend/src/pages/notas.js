import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { useState} from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Popup from 'reactjs-popup';

export default function Notas(){

    const [notas, setNota] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [ultimo, setUltimo] = useState(0);
    
    function crearNota(){
        setUltimo(ultimo+1);
        if(notas.length === 0)setNota([{nombre:titulo,contenido:'',indice:ultimo}]);
        else setNota([...notas, {nombre:titulo,contenido:'',indice:ultimo}]);
    };

    function eliminar(eleccion){
        console.log(setNota(notas.filter(notas=> notas.indice !== eleccion)));
    };

    function editaTitulo(palabra, eleccion){
        for(var i = 0; i < notas.length; i++){
            if(notas.at(i).indice === eleccion){
                notas.at(i).nombre = palabra;
                console.log(notas.at(i));
                setUltimo(ultimo+1);
                setUltimo(ultimo-1)
            }
        }
    }

    function editaContenido(palabra,eleccion){
        for(var i = 0; i < notas.length; i++){
            if(notas.at(i).indice === eleccion){
                notas.at(i).contenido = palabra;
                console.log(notas.at(i));
                setUltimo(ultimo+1);
                setUltimo(ultimo-1);
            }
        }
    };

    return (
        <div>
            <div className='Arriba' align="center">
                <Card><CardContent>
                    <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
                        <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Añade un titulo..." onChange={event=>setTitulo(event.target.value)}/>
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <Button variant="contained" onClick={crearNota}>Crear</Button>
                    </Paper>
                </CardContent></Card>    
            </div>

            <div className='Abajo'>
                <CardContent>
                <Grid container spacing={2}>
                    {notas.map((nota)=>(
                        <Grid item xs={3} key={nota.indice}>
                            <Card sx={{wordBreak:'break-all'}}><CardContent>
                                <Typography variant='h4'>{nota.nombre}</Typography>
                                <Typography variant='h6'>{nota.contenido}</Typography>
                                <IconButton aria-label="delete" onClick={()=>eliminar(nota.indice)}><DeleteIcon/></IconButton>
                                <Popup trigger={<IconButton aria-label="edit"><EditIcon/></IconButton>} position="bottom left">
                                    <Card sx={{backgroundColor:'white'}}><CardContent>
                                        <TextField label="Titulo" variant="standard" defaultValue={nota.nombre} onChange={event=>editaTitulo(event.target.value, nota.indice)}/><br></br>
                                        <TextField sx={{width:"100%"}} label="Contenido" defaultValue={nota.contenido} variant="standard" multiline rows={4} onChange={event=>editaContenido(event.target.value, nota.indice)}/>    
                                    </CardContent></Card>
                                </Popup>
                            </CardContent></Card>
                        </Grid>
                    ))}
                </Grid>
                </CardContent>
                {console.log(notas)}
            </div>
        </div>);
}