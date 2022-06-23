const axios = require('axios');

//Devuelve usuarios de la app
export const getUsers = async() => {
    let users = [];
    await axios
      .get(`/users`)
      .then((response) => {
        users = response.data;
      })
      .catch((error) => {
        console.log(error);
        users = null;
      });
    return users;
};

//Devuelve las notas del usuario
export const getUserNotes = async (userName) => {
    let notas = [];
    await axios
      .get(`/${userName}/notes`)
      .then((response) => {
        notas = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return notas;
};

//Login del usuario con nombre y contrasenia
export const logearse = async (user, password) => {
    let logged;
    await axios
      .post("/login", {
        usuario: user,
        clave: password,
      })
      .then((response) => {
        logged = response.data;
      })
      .catch((error) => {
        console.log(error);
        logged = null;
      });
    return logged;
};


//Crea una nota vacia en el usuario
export const crearNota = async (userName, titular) => {
    let sent = false;
    await axios
      .post(`/${userName}/notes`, {
        Titulo: titular
      })
      .then((response) => {
        sent = true;
      })
      .catch((error) => {
        console.log(error);
        sent = false;
      });
    return sent;
};

//Editar nota
export const editarNota = async (userName,idNota, titular, relleno) => {
    let edited;
    await axios
      .put(`${userName}/notes/${idNota}`,{
          Titulo: titular,
          Contenido:relleno
      })
      .then((response) => {
        edited = true;
      })
      .catch((error) => {
        console.log(error.config);
        edited = false;
      });
    return edited;
  };

//Eliminar nota
export const eliminar = async(userName,idNota)=>{
    await axios .delete(`${userName}/notes/${idNota}`)
};