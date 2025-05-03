const { MongoClient } = require('mongodb');
const inquirer = require('inquirer');

//conexión mongo
const mongoURI = 'mongodb+srv://dia21066:CMSOw7YTLnPTsdEp@cluster0.a4fng.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectToMongoDB = async () => {
  const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  console.log("Conectado a MongoDB");
  return client;
};

//consultar usuario
const consultarUsuarios = async () => {
  const { filtro, proyeccion, skip, limit, orden } = await inquirer.prompt([
    { type: 'input', name: 'filtro', message: 'Ingrese el filtro de búsqueda (JSON):' },
    { type: 'input', name: 'proyeccion', message: 'Ingrese las proyecciones (campos a seleccionar en JSON):' },
    { type: 'input', name: 'skip', message: 'Ingrese el número de registros a omitir:' },
    { type: 'input', name: 'limit', message: 'Ingrese el número de registros a limitar:' },
    { type: 'input', name: 'orden', message: 'Ingrese el campo para ordenar los registros (ejemplo: nombre):' },
  ]);

  const client = await connectToMongoDB();
  const db = client.db('Proyecto_2');
  const usuariosCollection = db.collection('Usuarios');

  const filtroJson = JSON.parse(filtro);
  const proyeccionJson = JSON.parse(proyeccion);
  const skipNumber = parseInt(skip);
  const limitNumber = parseInt(limit);
  const ordenJson = { [orden]: 1 };

  const usuarios = await usuariosCollection.find(filtroJson)
    .project(proyeccionJson)
    .skip(skipNumber)
    .limit(limitNumber)
    .sort(ordenJson)
    .toArray();

  console.log('Usuarios encontrados:', usuarios);
  await client.close();
};

//consultar restaurante
const consultarRestaurantes = async () => {
  const { filtro, proyeccion, skip, limit, orden } = await inquirer.prompt([
    { type: 'input', name: 'filtro', message: 'Ingrese el filtro de búsqueda (JSON):' },
    { type: 'input', name: 'proyeccion', message: 'Ingrese las proyecciones (campos a seleccionar en JSON):' },
    { type: 'input', name: 'skip', message: 'Ingrese el número de registros a omitir:' },
    { type: 'input', name: 'limit', message: 'Ingrese el número de registros a limitar:' },
    { type: 'input', name: 'orden', message: 'Ingrese el campo para ordenar los registros (ejemplo: nombre):' },
  ]);

  const client = await connectToMongoDB();
  const db = client.db('Proyecto_2');
  const restaurantesCollection = db.collection('Restaurantes');

  const filtroJson = JSON.parse(filtro);
  const proyeccionJson = JSON.parse(proyeccion);
  const skipNumber = parseInt(skip);
  const limitNumber = parseInt(limit);
  const ordenJson = { [orden]: 1 };

  const restaurantes = await restaurantesCollection.find(filtroJson)
    .project(proyeccionJson)
    .skip(skipNumber)
    .limit(limitNumber)
    .sort(ordenJson)
    .toArray();

  console.log('Restaurantes encontrados:', restaurantes);
  await client.close();
};

//consultar ordenes
const consultarOrdenes = async () => {
  const { filtro, proyeccion, skip, limit, orden } = await inquirer.prompt([
    { type: 'input', name: 'filtro', message: 'Ingrese el filtro de búsqueda (JSON):' },
    { type: 'input', name: 'proyeccion', message: 'Ingrese las proyecciones (campos a seleccionar en JSON):' },
    { type: 'input', name: 'skip', message: 'Ingrese el número de registros a omitir:' },
    { type: 'input', name: 'limit', message: 'Ingrese el número de registros a limitar:' },
    { type: 'input', name: 'orden', message: 'Ingrese el campo para ordenar los registros (ejemplo: fechaOrden):' },
  ]);

  const client = await connectToMongoDB();
  const db = client.db('Proyecto_2');
  const ordenesCollection = db.collection('Ordenes');

  const filtroJson = JSON.parse(filtro);
  const proyeccionJson = JSON.parse(proyeccion);
  const skipNumber = parseInt(skip);
  const limitNumber = parseInt(limit);
  const ordenJson = { [orden]: 1 };

  const ordenes = await ordenesCollection.find(filtroJson)
    .project(proyeccionJson)
    .skip(skipNumber)
    .limit(limitNumber)
    .sort(ordenJson)
    .toArray();

  console.log('Órdenes encontradas:', ordenes);
  await client.close();
};

// consultar reseñas
const consultarResenas = async () => {
  const { filtro, proyeccion, skip, limit, orden } = await inquirer.prompt([
    { type: 'input', name: 'filtro', message: 'Ingrese el filtro de búsqueda (JSON):' },
    { type: 'input', name: 'proyeccion', message: 'Ingrese las proyecciones (campos a seleccionar en JSON):' },
    { type: 'input', name: 'skip', message: 'Ingrese el número de registros a omitir:' },
    { type: 'input', name: 'limit', message: 'Ingrese el número de registros a limitar:' },
    { type: 'input', name: 'orden', message: 'Ingrese el campo para ordenar los registros (ejemplo: fechaResena):' },
  ]);

  const client = await connectToMongoDB();
  const db = client.db('Proyecto_2');
  const resenasCollection = db.collection('Resenas');

  const filtroJson = JSON.parse(filtro);
  const proyeccionJson = JSON.parse(proyeccion);
  const skipNumber = parseInt(skip);
  const limitNumber = parseInt(limit);
  const ordenJson = { [orden]: 1 };

  const resenas = await resenasCollection.find(filtroJson)
    .project(proyeccionJson)
    .skip(skipNumber)
    .limit(limitNumber)
    .sort(ordenJson)
    .toArray();

  console.log('Reseñas encontradas:', resenas);
  await client.close();
};

//consultar articulos de menu
const consultarArticulosMenu = async () => {
  const { filtro, proyeccion, skip, limit, orden } = await inquirer.prompt([
    { type: 'input', name: 'filtro', message: 'Ingrese el filtro de búsqueda (JSON):' },
    { type: 'input', name: 'proyeccion', message: 'Ingrese las proyecciones (campos a seleccionar en JSON):' },
    { type: 'input', name: 'skip', message: 'Ingrese el número de registros a omitir:' },
    { type: 'input', name: 'limit', message: 'Ingrese el número de registros a limitar:' },
    { type: 'input', name: 'orden', message: 'Ingrese el campo para ordenar los registros (ejemplo: nombre):' },
  ]);

  const client = await connectToMongoDB();
  const db = client.db('Proyecto_2');
  const articulosMenuCollection = db.collection('Articulos_Menu');

  const filtroJson = JSON.parse(filtro);
  const proyeccionJson = JSON.parse(proyeccion);
  const skipNumber = parseInt(skip);
  const limitNumber = parseInt(limit);
  const ordenJson = { [orden]: 1 };

  const articulosMenu = await articulosMenuCollection.find(filtroJson)
    .project(proyeccionJson)
    .skip(skipNumber)
    .limit(limitNumber)
    .sort(ordenJson)
    .toArray();

  console.log('Artículos de menú encontrados:', articulosMenu);
  await client.close();
};

//exportar las funciones
module.exports = {
  consultarUsuarios,
  consultarRestaurantes,
  consultarOrdenes,
  consultarResenas,
  consultarArticulosMenu
};
