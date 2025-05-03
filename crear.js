const { MongoClient } = require('mongodb');
const inquirer = require('inquirer');

// Conexión a MongoDB (Actualiza con tu URI)
const mongoURI = 'mongodb+srv://dia21066:CMSOw7YTLnPTsdEp@cluster0.a4fng.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectToMongoDB = async () => {
  const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  console.log("Conectado a MongoDB");
  return client;
};

// Crear Usuario
const crearUsuario = async () => {
  const { nombre, correo, direccion, telefono } = await inquirer.prompt([
    { type: 'input', name: 'nombre', message: 'Ingrese el nombre del usuario:' },
    { type: 'input', name: 'correo', message: 'Ingrese el correo del usuario:' },
    { type: 'input', name: 'direccion', message: 'Ingrese la dirección del usuario:' },
    { type: 'input', name: 'telefono', message: 'Ingrese el teléfono del usuario:' },
  ]);

  const client = await connectToMongoDB();
  const db = client.db('Proyecto_2');
  const usuariosCollection = db.collection('Usuarios');

  const nuevoUsuario = { nombre, correo, direccion, telefono };
  await usuariosCollection.insertOne(nuevoUsuario);

  console.log('Usuario creado con éxito');
  await client.close();
};

// Crear Restaurante
const crearRestaurante = async () => {
  const { nombre, direccion, categoria } = await inquirer.prompt([
    { type: 'input', name: 'nombre', message: 'Ingrese el nombre del restaurante:' },
    { type: 'input', name: 'direccion', message: 'Ingrese la dirección del restaurante:' },
    { type: 'input', name: 'categoria', message: 'Ingrese la categoría del restaurante:' },
  ]);

  const client = await connectToMongoDB();
  const db = client.db('Proyecto_2');
  const restaurantesCollection = db.collection('Restaurantes');

  const nuevoRestaurante = { nombre, direccion, categoria };
  await restaurantesCollection.insertOne(nuevoRestaurante);

  console.log('Restaurante creado con éxito');
  await client.close();
};

// Crear Artículo de Menú
const crearArticuloDeMenu = async () => {
  const { nombre, descripcion, precio, restauranteid, categoria } = await inquirer.prompt([
    { type: 'input', name: 'nombre', message: 'Ingrese el nombre del artículo:' },
    { type: 'input', name: 'descripcion', message: 'Ingrese la descripción del artículo:' },
    { type: 'input', name: 'precio', message: 'Ingrese el precio del artículo:' },
    { type: 'input', name: 'restauranteid', message: 'Ingrese el ID del restaurante:' },
    { type: 'input', name: 'categoria', message: 'Ingrese la categoría del artículo:' },
  ]);

  const client = await connectToMongoDB();
  const db = client.db('Proyecto_2');
  const articulosCollection = db.collection('Articulos_Menu');

  const nuevoArticulo = {
    nombre,
    descripcion,
    precio: parseFloat(precio),
    restauranteid,
    categoria,
  };
  await articulosCollection.insertOne(nuevoArticulo);

  console.log('Artículo de menú creado con éxito');
  await client.close();
};

// Crear Orden
const crearOrden = async () => {
  const { restauranteid, usuarioid, articulos } = await inquirer.prompt([
    { type: 'input', name: 'restauranteid', message: 'Ingrese el ID del restaurante:' },
    { type: 'input', name: 'usuarioid', message: 'Ingrese el ID del usuario:' },
    { type: 'input', name: 'articulos', message: 'Ingrese los artículos (JSON):' },
  ]);

  const articulosArray = JSON.parse(articulos);
  const client = await connectToMongoDB();
  const db = client.db('Proyecto_2');
  const ordenesCollection = db.collection('Ordenes');

  const nuevaOrden = {
    restauranteid,
    usuarioid,
    datosMenu: articulosArray,
    total: articulosArray.reduce((sum, articulo) => sum + articulo.precio, 0),
    estado: 'Pendiente',
    fechaOrden: new Date(),
  };
  await ordenesCollection.insertOne(nuevaOrden);

  console.log('Orden creada con éxito');
  await client.close();
};

// Crear Reseña
const crearResena = async () => {
  const { usuarioid, restauranteid, ordenid, calificacion, comentario } = await inquirer.prompt([
    { type: 'input', name: 'usuarioid', message: 'Ingrese el ID del usuario:' },
    { type: 'input', name: 'restauranteid', message: 'Ingrese el ID del restaurante:' },
    { type: 'input', name: 'ordenid', message: 'Ingrese el ID de la orden:' },
    { type: 'input', name: 'calificacion', message: 'Ingrese la calificación (1-5):' },
    { type: 'input', name: 'comentario', message: 'Ingrese el comentario:' },
  ]);

  const client = await connectToMongoDB();
  const db = client.db('Proyecto_2');
  const resenasCollection = db.collection('Resenas');

  const nuevaResena = {
    usuarioid,
    restauranteid,
    ordenid,
    calificacion: parseFloat(calificacion),
    comentario,
    fechaResena: new Date(),
  };
  await resenasCollection.insertOne(nuevaResena);

  console.log('Reseña creada con éxito');
  await client.close();
};

//exportar funciones
module.exports = {
  crearUsuario,
  crearRestaurante,
  crearArticuloDeMenu,
  crearOrden,
  crearResena,
};
