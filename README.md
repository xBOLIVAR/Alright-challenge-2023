# Manejo de Documentos
Las tecnologías que se usaron son Angular con Node.js y Express.js, además como base de datos se utilizó Firebase.

# Front End
Para iniciar el proyecto se requiere tener Angular CLI v16. 
Se clona el repositorio y se realizar los siguintes comandos

instalar las dependencias:
- npm install 
correr el proyecto:
- ng serve

# Back End
En el backend se utilizó Node.js y Express.js con TypeScript.
El enlace de los servicios (Backend):
https://github.com/xBOLIVAR/serviciosDocumentos.git

para correr los servicios seguir los siguientes pasos
- npm install
- npx tsc
- npx nodemon dist/app.js

en cuanto a la base de datos se uso Realtime Database firebase, el cual tiene la siguintes colecciones:
-users
  -id del usuario
    -email
    -name
    -password (encrypted)
    -revisor
    -reviewDocument
      -id del usuario propitario del documento
        -id del documento
          -titulo
-documents
 -id del usuario
  -id del documento
    -title
    -image
    -state

# Los endPoints que se usaron
-app.get("/documents/:uid", getUserDocumentsHandler): se utiliza para obtener los documentos del usuario
-app.get("/users/reviewers", getReviewers): se utiliza para saber qué usuarios son revisores
-app.get("/users/:uid/reviewers", getMyReviews): se utiliza para saber qué usuarios son revisores
-app.post("/documents/:uid", saveDocumentHandler): se utiliza para guardar los documentos que el usuario subió
-app.post("/login", loginHandler): iniciar sesión con correo y contraseña
-app.post("/register", registerHandler): registrar usuario con correo y contraseña
-app.post("/users/:uid/reviewDocuments", setReviewDocuments): se le agrega a los revisores una propiedad, en donde muestra los documentos que les toca revisar
-app.patch('/documents/:uid/:idDocument', setStateDocument): se cambia el estado del documento a "En revisión"
-app.delete("/documents/:uid/:idDocument", deleteDocumentHandler): se elimina el documento 

# Desarrollo
-Se desarrolla la interfaz de usuario con Angular y se crea un entorno para conectarnos con los servicios, en este caso es con http://localhost:3000.
-Luego, se conectan los servicios con la base de datos Realtime de Firebase.
