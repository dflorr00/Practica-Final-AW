////////CAMBIADOR COLOR DE LINEA////////
var linea = document.getElementById("lineaCambiaColor");
setTimeout(function(){
    linea.innerHTML = "Ha cambiado!";
    linea.style.color = "red";
},5000);

////////CONTADOR DE CLICKS////////
var img = document.getElementById("img");
var textoCont = document.getElementById("areaContador");
var contador = 0;
img.onclick = function () {
    contador++;
    textoCont.innerHTML = contador;
}

////////CAMBIA EL NOMBRE DEL TITULO////////
var usuario = document.getElementById("usuario");
var inputNombre = document.getElementById("nombre");
inputNombre.onchange = function(){
    usuario.innerHTML = inputNombre.value;
}

////////CALCULA LA EDAD////////
var nacimiento = document.getElementById("fechaNacimiento");
var muestraEdad = document.getElementById("edad");
nacimiento.onchange = function(){
    var hoy = new Date();
    var nace = new Date(nacimiento.value);
    var edad = hoy.getTime() - nace.getTime();
    var rea = Math.floor(edad/ (1000*60*60*24*365));
    if(rea<0){rea = 0;}
    muestraEdad.value = rea;
}

////////DESABILITA EL CAMPO////////
muestraEdad.disabled = true;


////////CAMBIAR COLOR FONDO IZQUIERDA////////
var circuloHombre = document.getElementById("hombre");
var circuloMujer = document.getElementById("mujer");
var fondoIzquierda = document.getElementById("fondoIzquierda");
circuloHombre.onclick = function(){
    fondoIzquierda.style.backgroundColor = "blue"; 
}
circuloMujer.onclick = function(){
    fondoIzquierda.style.backgroundColor = "red"; 
}

////////OCULTAR IMAGEN////////
var cuadrado = document.getElementById("checkbox");
cuadrado.onclick = function(){
    if(cuadrado.checked){
        img.style.visibility = "hidden";
    }else{
        img.style.visibility = "visible";
    }
}    

////////CAMBIAR COLOR FONDO DERECHA////////
var fondoDerecha = document.getElementById("fondoDerecha");
var nuevoColorDe = document.getElementById("nuevoColorDe");
nuevoColorDe.onchange = function() {
    fondoDerecha.style.backgroundColor = nuevoColorDe.value;
} 

////////MUESTRA LA ALERTA DE FORMULARIO ENVIADO////////
var botonEnv = document.getElementById("botonEnv");
botonEnv.onclick = function(){alert("Formulario enviado");}