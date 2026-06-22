// mencionando el modulo de express para nuestro proyecto
const express = require('express');
//creando nuentro objeto central que se utilizara en nuestro proyecto(rutas, funciones, etc )
const app = express();
//indicamos que nuenesta api tiene un middleware usa datos en formato json
app.use(express.json()) 

// simulando una base de datos de estudiantes
const estudiantes = [
    { id: 1, nombre: "Ana García", edad: 18, correo: "ana.garcia@email.com" },
    { id: 2, nombre: "Carlos López", edad: 17, correo: "carlos.lopez@email.com" },
    { id: 3, nombre: "María Pérez", edad: 18, correo: "maria.p@email.com" }
]
// servidor = localhost que por defecto es el puerto 3000
app.listen(3000, () => {
  console.log('hola estas utilizando express en http://localhost:3000');  
});

//creando una ruta para nuestra aplicacion
//crando una ruta principal (peticion http, get, post, put, delete,patch), 
// y un parametro de respuesta = req(necesitamos datos del usuario).
// y peticion = res (que le vamos a responder al usuario)

app.get('/', (req, res) => {
  //codigo de la funcion
  res.send('hola mundo, Bienvenidos a mi API ')
});

//ruta para obtener la lista de estudiantes
app.get('/estudiantes', (req, res) => {
  res.status(200).json(estudiantes)
  });

//ruta para buscar un estudiante por su id
app.get('/estudiantes/:estudianteId', (req, res) => {
  const id = Number(req.params.estudianteId);
  const encontrar_estudiante = estudiantes.find(estudiante => estudiante.id === id);
  
  if (encontrar_estudiante) {
    res.status(200).json(encontrar_estudiante);
  } else {
    res.status(404).json({ mensaje: 'Estudiante no encontrado' });
  }
});

// ruta para agregar un nuevo estudiante
app.post('/estudiantes', (req, res) => {
  const {nombre,edad,correo} = req.body;   
  const  nuevoEstudiante ={
    id : estudiantes.length + 1, 
    nombre,
    edad,
    correo  

}
  estudiantes.push(nuevoEstudiante);
  res.status(201).json({
    message: 'Regsitrado correctamente',
    estudiante: nuevoEstudiante
  }); 
});


// ruta para actualizar un estudiante (correo) 
app.patch('/estudiantes/:id', (req, res) => {
  const id = Number(req.params.id);
  const encontrar_estudiante = estudiantes.find(estudiante => estudiante.id === id);    
    if (!encontrar_estudiante) {
    
    return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
  }
  const { nuevo_correo } = req.body;
  encontrar_estudiante.correo = nuevo_correo;
  res.status(200).json({
    message: 'Correo actualizado correctamente',
    estudiante: encontrar_estudiante
    
  })
});

// ruta para eliminar un estudiante
app.delete('/estudiantes/:id', (req, res) => {
  const id = Number(req.params.id);
  const eliminar_estudiante = estudiantes.find(estudiante => estudiante.id === id);
  if (!eliminar_estudiante) {
    return res.status(404).json({ mensaje: 'Estudiante no encontrado' }); 
  }
  const index = estudiantes.indexOf(eliminar_estudiante);
  estudiantes.splice(index, 1);
  res.status(200).json({ mensaje: 'Estudiante eliminado correctamente' });
  });
  

