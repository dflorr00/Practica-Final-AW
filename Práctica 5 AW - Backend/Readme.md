1 Primero instalar las dependecias con: npm install

2 Ejecutar el servidor con npm run start o si se prefiere run dev

3 Las rutas de la aplicacion son las siguientes:
    GET/users --> devuelve la lista de usuarios
    GET/:user/notes --> devuelve las notas de usuarios
    DELETE/:user/notes/:note --> elimina una nota (la nota se selecciona por número de id)
    POST/:user/notes --> crea una nueva nota en el usuario (enviar key:Titulo value:"")
    POST/login --> recibe el usuario y contraseña y realiza la autenticación (enviar key:usuario value:"" y key:clave value:"")
    PUT/:user/notes/:note --> edita una nota (la nota se selecciona por número de id)(enviar key:Titulo value:"" y key:Contenido value:"")