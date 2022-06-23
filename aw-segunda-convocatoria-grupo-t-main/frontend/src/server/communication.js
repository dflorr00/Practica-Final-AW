const axios = require("axios");

//Obtener info usuario
export const getUserInfo = async (user) => {
  let userInfo;
  await axios
    .get(`/api/users/${user}`)
    .then((response) => {
      userInfo = response.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
      userInfo = null;
    });
  return userInfo;
};

//Cerrar sesion
export const logout = async () => {
  await axios.get("/api/logout");
  window.localStorage.removeItem('TOKEN');
}

//Autenticar
export const auth = async () => {
  let authenticated = false;
  await axios.get("/api/users/auth").then((res) => {
    authenticated = true;
  }).catch((error) => {
    authenticated = false;
  });
  return authenticated;
}

//Logear usuario
export const logUser = async (user, password) => {
  let logged;

  await axios
    .post("/api/login", {
      user: user,
      password: password,
    })
    .then((response) => {
      logged = response.data;
      window.localStorage.setItem('TOKEN',JSON.stringify(logged));
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
      logged = null;
    });
  return logged;
};

//Registrar usuario
export const registerUser = async (username, name, surname, email, password, type) => {
  let registered;
  await axios
    .post("/api/register", {
      username: username,
      password: password,
      name: name,
      surname: surname,
      email: email,
      type: type
    })
    .then((response) => {
      registered = true;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
      registered = false;
    });
  return registered;
};

//Enviar mensaje
export const sendMessage = async (issue, body, sender, receiver) => {
  let sent = false;
  await axios
    .post("/api/messages", {
      sender: sender,
      receiver: receiver,
      issue: issue,
      body: body,
    })
    .then((response) => {
      sent = true;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
      sent = false;
    });
  return sent;
};

//Obtener mensajes enviados
export const getSentMessages = async (user) => {
  let sentMessages = [];
  await axios
    .get(`/api/${user}/messages`)
    .then((response) => {
      sentMessages = response.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  return sentMessages;
};

//Obtener mensajes recibidos
export const getReceivedMessages = async (user) => {
  let receivedMessages = [];
  await axios
    .get(`/api/messages/${user}`, {
      headers: { Accept: 'application/json' },
    })
    .then((response) => {
      receivedMessages = response.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  return receivedMessages;
};

//Editar usuario
export const editUser = async (lastUsername, formData) => {
  let edited;
  console.log(formData);
  await axios
    .put(`/api/users/${lastUsername}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      edited = true;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
      edited = false;
    });
  return edited;
};

//Obtener grupos del usuario
export const getUserGroups = async (user) => {
  let groups = [];
  await axios
    .get(`/api/groups/${user}`)
    .then((response) => {
      groups = response.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  return groups;
};

//Crear grupo
export const createGroup = async (name, owner) => {

  let created;
  await axios
    .post(`/api/groups`, {
      name: name,
      firstmember: owner,
    })
    .then((response) => {
      created = true;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
      created = false;
    });
  return created;
}

//Obtener grupos del usuario
export const getGroupUsers = async (group) => {
  let users = [];
  await axios
    .get(`/api/groups/${group}/users`)
    .then((response) => {
      users = response.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  return users;
}

//Unir usuario al grupo
export const joinUserGroup = async (group, user) => {
  let joined;
  await axios
    .post(`/api/groups/join`, {
      name: group,
      newMember: user,
    })
    .then((response) => {
      joined = true;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
      joined = false;
    });
  return joined;
}

//Eliminar a usuario del grupo
export const leaveUserGroup = async (group, user) => {
  let left;
  await axios
    .put(`/api/groups/leave`, {
      group: group,
      member: user
    })
    .then((response) => {
      left = true;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
      left = false;
    });
  return left;
}

//Eliminar grupo
export const deleteGroup = async (group) => {
  var data = {}
  await axios
    .delete(`/api/groups/${group}`)
    .then((response) => {
      data["status"] = response.status;
      data["message"] = response.message;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
      data["status"] = error.status;
      data["message"] = error.message;
    });

  return data;
}