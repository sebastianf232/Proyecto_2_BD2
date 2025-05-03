const { MongoClient } = require('mongodb');
const inquirer = require('inquirer');

// conexión a MongoDB
const mongoURI = 'mongodb+srv://dia21066:CMSOw7YTLnPTsdEp@cluster0.a4fng.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// conectarse a MongoDB
const connectToMongoDB = async () => {
  const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  console.log("Conectado a MongoDB");
  return client;
};

// Menú interactivo
const menu = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: '¿Qué operación deseas realizar?',
      choices: [
        'Crear Usuario',
        'Consultar Usuario',
        'Actualizar Usuario',
        'Eliminar Usuario',
        'Crear Restaurante',
        'Consultar Restaurante',
        'Actualizar Restaurante',
        'Eliminar Restaurante',
        'Salir'
      ],
    },
  ]);

  switch(action) {
    case 'Crear Usuario':
      await crearUsuario();
      break;
    case 'Consultar Usuario':
      await consultarUsuario();
      break;
    case 'Actualizar Usuario':
      await actualizarUsuario();
      break;
    case 'Eliminar Usuario':
      await eliminarUsuario();
      break;
    case 'Crear Restaurante':
      await crearRestaurante();
      break;
    case 'Consultar Restaurante':
      await consultarRestaurante();
      break;
    case 'Actualizar Restaurante':
      await actualizarRestaurante();
      break;
    case 'Eliminar Restaurante':
      await eliminarRestaurante();
      break;
    case 'Salir':
      console.log("¡Hasta luego!");
      process.exit();
      break;
  }

  // Después de realizar una operación, volver a mostrar el menú
  menu();
};

// Función para Crear un Usuario
const crearUsuario = async () => {
  const { nombre, correo, direccion, telefono } = await inquirer.prompt([
    { type: 'input', name: 'nombre', message: 'Ingrese el nombre del usuario:' },
    { type: 'input', name: 'correo', message: 'Ingrese el correo del usuario:' },
    { type: 'input', name: 'direccion', message: 'Ingrese la dirección del usuario:' },
    { type: 'input', name: 'telefono', message: 'Ingrese el teléfono del usuario:' },
  ]);

  const client = await connectToMongoDB();
  const db = client.db('Proyecto_2');  // Aquí especificamos la base de datos
  const usuariosCollection = db.collection('Usuarios');  // Accedemos a la colección 'Usuarios'

  const nuevoUsuario = { nombre, correo, direccion, telefono };
  await usuariosCollection.insertOne(nuevoUsuario);

  console.log('Usuario creado con éxito');
  await client.close();
};

// Función para Consultar un Usuario
const consultarUsuario = async () => {
  const { nombre } = await inquirer.prompt([
    { type: 'input', name: 'nombre', message: 'Ingrese el nombre del usuario a consultar:' },
  ]);

  const client = await connectToMongoDB();
  const db = client.db('Proyecto_2');  // Aquí especificamos la base de datos
  const usuariosCollection = db.collection('Usuarios');  // Accedemos a la colección 'Usuarios'

  const usuario = await usuariosCollection.findOne({ nombre });
  if (usuario) {
    console.log(usuario);
  } else {
    console.log('Usuario no encontrado');
  }
  await client.close();
};

// Función para Actualizar un Usuario
const actualizarUsuario = async () => {
  const { nombre, nuevoCorreo, nuevaDireccion, nuevoTelefono } = await inquirer.prompt([
    { type: 'input', name: 'nombre', message: 'Ingrese el nombre del usuario a actualizar:' },
    { type: 'input', name: 'nuevoCorreo', message: 'Nuevo correo del usuario:' },
    { type: 'input', name: 'nuevaDireccion', message: 'Nueva dirección del usuario:' },
    { type: 'input', name: 'nuevoTelefono', message: 'Nuevo teléfono del usuario:' },
  ]);

  const client = await connectToMongoDB();
  const db = client.db('Proyecto_2');  // Aquí especificamos la base de datos
  const usuariosCollection = db.collection('Usuarios');  // Accedemos a la colección 'Usuarios'

  const result = await usuariosCollection.updateOne(
    { nombre },
    { $set: { correo: nuevoCorreo, direccion: nuevaDireccion, telefono: nuevoTelefono } }
  );

  if (result.modifiedCount > 0) {
    console.log('Usuario actualizado con éxito');
  } else {
    console.log('No se encontró el usuario o no hubo cambios');
  }
  await client.close();
};

// Función para Eliminar un Usuario
const eliminarUsuario = async () => {
  const { nombre } = await inquirer.prompt([
    { type: 'input', name: 'nombre', message: 'Ingrese el nombre del usuario a eliminar:' },
  ]);

  const client = await connectToMongoDB();
  const db = client.db('Proyecto_2');  // Aquí especificamos la base de datos
  const usuariosCollection = db.collection('Usuarios');  // Accedemos a la colección 'Usuarios'

  const result = await usuariosCollection.deleteOne({ nombre });

  if (result.deletedCount > 0) {
    console.log('Usuario eliminado con éxito');
  } else {
    console.log('No se encontró el usuario');
  }
  await client.close();
};

// Función para Crear un Restaurante
const crearRestaurante = async () => {
  const { nombre, direccion, categoria } = await inquirer.prompt([
    { type: 'input', name: 'nombre', message: 'Ingrese el nombre del restaurante:' },
    { type: 'input', name: 'direccion', message: 'Ingrese la dirección del restaurante:' },
    { type: 'input', name: 'categoria', message: 'Ingrese la categoría del restaurante:' },
  ]);

  const client = await connectToMongoDB();
  const db = client.db('Proyecto_2');  // Aquí especificamos la base de datos
  const restaurantesCollection = db.collection('Restaurantes');  // Accedemos a la colección 'Restaurantes'

  const nuevoRestaurante = { nombre, direccion, categoria };
  await restaurantesCollection.insertOne(nuevoRestaurante);

  console.log('Restaurante creado con éxito');
  await client.close();
};

// Función para Consultar un Restaurante
const consultarRestaurante = async () => {
  const { nombre } = await inquirer.prompt([
    { type: 'input', name: 'nombre', message: 'Ingrese el nombre del restaurante a consultar:' },
  ]);

  const client = await connectToMongoDB();
  const db = client.db('Proyecto_2');  // Aquí especificamos la base de datos
  const restaurantesCollection = db.collection('Restaurantes');  // Accedemos a la colección 'Restaurantes'

  const restaurante = await restaurantesCollection.findOne({ nombre });
  if (restaurante) {
    console.log(restaurante);
  } else {
    console.log('Restaurante no encontrado');
  }
  await client.close();
};

// Función para Actualizar un Restaurante
const actualizarRestaurante = async () => {
  const { nombre, nuevaDireccion, nuevaCategoria } = await inquirer.prompt([
    { type: 'input', name: 'nombre', message: 'Ingrese el nombre del restaurante a actualizar:' },
    { type: 'input', name: 'nuevaDireccion', message: 'Nueva dirección del restaurante:' },
    { type: 'input', name: 'nuevaCategoria', message: 'Nueva categoría del restaurante:' },
  ]);

  const client = await connectToMongoDB();
  const db = client.db('Proyecto_2');  // Aquí especificamos la base de datos
  const restaurantesCollection = db.collection('Restaurantes');  // Accedemos a la colección 'Restaurantes'

  const result = await restaurantesCollection.updateOne(
    { nombre },
    { $set: { direccion: nuevaDireccion, categoria: nuevaCategoria } }
  );

  if (result.modifiedCount > 0) {
    console.log('Restaurante actualizado con éxito');
  } else {
    console.log('No se encontró el restaurante o no hubo cambios');
  }
  await client.close();
};

// Función para Eliminar un Restaurante
const eliminarRestaurante = async () => {
  const { nombre } = await inquirer.prompt([
    { type: 'input', name: 'nombre', message: 'Ingrese el nombre del restaurante a eliminar:' },
  ]);

  const client = await connectToMongoDB();
  const db = client.db('Proyecto_2');  // Aquí especificamos la base de datos
  const restaurantesCollection = db.collection('Restaurantes');  // Accedemos a la colección 'Restaurantes'

  const result = await restaurantesCollection.deleteOne({ nombre });

  if (result.deletedCount > 0) {
    console.log('Restaurante eliminado con éxito');
  } else {
    console.log('No se encontró el restaurante');
  }
  await client.close();
};

// Llamada al menú
menu();
