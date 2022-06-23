import './style.css';
import React, { useEffect, useState } from 'react';


function App() {

  //Cambio de color del texto
  const [linea, setLinea] = useState(<li><a >El color de esta línea debe cambiar a rojo después de 5 segundos, y debe cambiar el texto a: "Ha cambiado!"</a></li>);
  useEffect(() => {setTimeout(function(){setLinea(<li style={{color:"red" }}>"Ha cambiado!"</li>)},5000)});

  //Contador de clicks
  const [cuenta, setCuenta] = useState(0);

  //Cambia el nombre del titulo
  const [nomTitulo, setNomTitulo] = useState(<a>Daniel Flórez Recio</a>);

  //Calcula la edad
  const [edad,setEdad] = useState();
  function calculaEdad(nacimiento){
    var hoy = new Date().getTime();
    var nace = new Date(nacimiento).getTime();
    var edad = hoy - nace;
    var rea = Math.floor(edad/ (1000*60*60*24*365));
    if(rea<0){rea = 0;}
    setEdad(rea);
  }

  //Cambia color fondo izquierda
  const [fondoIz,setFondoIz] = useState();

  //Oculta imagen
  const [img,setImg] = useState('visible');

  function muestraImg(){
    if(img==='hidden')setImg('visible');
    else setImg('hidden');
  }

  //Cambia color fondo derecha
  const [fondoDe,setFondoDe] = useState();

  return (
    <div className='Cuerpo'>
        <div className='cabecera'>
            <img src='https://sso.unileon.es/themes/unileon-metronic/img/main-title.png' onClick={()=>setCuenta(cuenta+1)} style={{visibility:img}}></img>
            <h1>Ejercicio 1 de "{nomTitulo}"</h1>
        </div>

        <div className='Abajo'>
            <div class='izquierda' style={{backgroundColor: fondoIz}}>
                <h2>Instrucciones ejercicio 1:</h2>
                <h4>Debes replicar este ejercicio en tres ficheros:</h4>
                <ul>
                  <li>Fichero index.html con el codigo HTML, necesario para replicar este mismo contenido</li>
                  <li>Fichero style.css con el código CSS necesario para dar estilo al ejercicio</li>
                  <li>Fichero myscript.js con el código JS necesario para permitir al usuario interactuar con la web</li>
                </ul>
                <h4>Además, debes cumplir los siguientes puntos:</h4>
                <ul>
                  <li>Utiliza GitHub Classroom para depositar el código fuente</li>
                  <li>Modificar el encabezado del ejercicio con tu nombre</li>
                  {linea}   
                  <li>Contador de clicks en la imagen: {cuenta}</li>
                </ul>
            </div>
            <div class='derecha' style={{backgroundColor: fondoDe}}>
                <h2>Formulario</h2>
                <table>
                    <tr>
                      <td>Nombre:</td>
                      <td><input type='text' onChange={event=>setNomTitulo(event.target.value)}></input> -{'>'}Cambia el nombre del título</td>
                    </tr>
                    <tr>
                      <td>Fecha de nacimiento:</td>
                      <td><input type='date' onChange={event=>calculaEdad(event.target.value)}></input> -{'>'}Calcular la edad en el siguiente campo</td>
                  </tr>
                  <tr>
                    <td>Edad:</td>
                    <td><input type='text' value={edad} disabled='true'></input> -{'>'}Campo deshabilitado(no permite modificarlo)</td>
                  </tr>
                  <tr>
                    <td>Sexo:</td>
                    <td><input type='radio' name='genero' value='hombre' onClick={()=>setFondoIz('blue')}></input>Hombre<br></br>
                    <input type='radio' name='genero' value='mujer' onClick={()=>setFondoIz('red')}></input>
                    Mujer -{'>'}Cambia el color de fondo azul/rojo del cuadro de la izquierda</td>
                  </tr>
                  <tr>
                      <td>Conoce HTML5:</td>
                      <td><input type='checkbox' onClick={muestraImg}></input> -{'>'}Oculta la imagen si está marcado</td>
                  </tr>
                  <tr>
                      <td>Color favorito:</td>
                      <td><input type='color' onClick={event=>setFondoDe(event.target.value)}></input> -{'>'}Cambia el color de fondo del cuadrado de la derecha</td>
                  </tr>
                  <tr>
                      <td>Foto:</td>
                      <td><input type="file"></input></td>
                  </tr>
                  <tr>
                      <td><input type="submit" onClick={event=>alert('Formulario enviado')}></input></td>
                      <td>-{'>'}Muestra una alerta con el texto:"Formulario enviado"</td>
                  </tr> 
                </table>
            </div>   
          </div>
    </div>
  );
}

export default App;
