const { MongoClient } = require('mongodb');

// Conexión a MongoDB
const mongoURI = 'mongodb+srv://dia21066:CMSOw7YTLnPTsdEp@cluster0.a4fng.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectToMongoDB = async () => {
  try {
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Conexión a MongoDB exitosa');
    return client;
  } catch (err) {
    console.error('Error de conexión a MongoDB:', err);
    throw err;
  }
};

// Consultar usuarios
const consultarUsuarios = async (req, res) => {
  const { filtro, proyeccion, skip, limit, orden } = req.query;

  try {
    const client = await connectToMongoDB();
    const db = client.db('Proyecto_2'); // Reemplaza 'nombre_de_tu_base_de_datos' con el nombre de tu base de datos

    // Preparamos el filtro y proyección, asegurándonos de que se pase como objetos JSON
    const filtroJson = filtro ? JSON.parse(filtro) : {};
    const proyeccionJson = proyeccion ? JSON.parse(proyeccion) : {};

    const usuarios = await db.collection('Usuarios')
      .find(filtroJson)  // Aplica el filtro (si existe)
      .project(proyeccionJson)  // Aplica la proyección (si existe)
      .skip(parseInt(skip) || 0)  // Aplica el número de elementos a saltar
      .limit(parseInt(limit) || 10)  // Limita la cantidad de documentos devueltos
      .sort(orden ? { [orden]: 1 } : {})  // Aplica el orden (si existe)
      .toArray();

    res.status(200).json(usuarios);
    client.close();
  } catch (err) {
    res.status(500).json({ message: 'Error al consultar los usuarios' });
  }
};

// Consultar restaurantes
const consultarRestaurantes = async (req, res) => {
  const { filtro, proyeccion, skip, limit, orden } = req.query;

  try {
    const client = await connectToMongoDB();
    const db = client.db('Proyecto_2'); // Reemplaza 'nombre_de_tu_base_de_datos' con el nombre de tu base de datos

    const filtroJson = filtro ? JSON.parse(filtro) : {};
    const proyeccionJson = proyeccion ? JSON.parse(proyeccion) : {};

    const restaurantes = await db.collection('Restaurantes')
      .find(filtroJson)
      .project(proyeccionJson)
      .skip(parseInt(skip) || 0)
      .limit(parseInt(limit) || 10)
      .sort(orden ? { [orden]: 1 } : {})
      .toArray();

    res.status(200).json(restaurantes);
    client.close();
  } catch (err) {
    res.status(500).json({ message: 'Error al consultar los restaurantes' });
  }
};

// Consultar artículos de menú
const consultarArticulosMenu = async (req, res) => {
  const { filtro, proyeccion, skip, limit, orden } = req.query;

  try {
    const client = await connectToMongoDB();
    const db = client.db('Proyecto_2'); // Reemplaza 'nombre_de_tu_base_de_datos' con el nombre de tu base de datos

    const filtroJson = filtro ? JSON.parse(filtro) : {};
    const proyeccionJson = proyeccion ? JSON.parse(proyeccion) : {};

    const articulosMenu = await db.collection('Articulos_Menu')
      .find(filtroJson)
      .project(proyeccionJson)
      .skip(parseInt(skip) || 0)
      .limit(parseInt(limit) || 10)
      .sort(orden ? { [orden]: 1 } : {})
      .toArray();

    res.status(200).json(articulosMenu);
    client.close();
  } catch (err) {
    res.status(500).json({ message: 'Error al consultar los artículos de menú' });
  }
};

// Consultar órdenes
const consultarOrdenes = async (req, res) => {
  const { filtro, proyeccion, skip, limit, orden } = req.query;

  try {
    const client = await connectToMongoDB();
    const db = client.db('Proyecto_2'); // Reemplaza 'nombre_de_tu_base_de_datos' con el nombre de tu base de datos

    const filtroJson = filtro ? JSON.parse(filtro) : {};
    const proyeccionJson = proyeccion ? JSON.parse(proyeccion) : {};

    const ordenes = await db.collection('Ordenes')
      .find(filtroJson)
      .project(proyeccionJson)
      .skip(parseInt(skip) || 0)
      .limit(parseInt(limit) || 10)
      .sort(orden ? { [orden]: 1 } : {})
      .toArray();

    res.status(200).json(ordenes);
    client.close();
  } catch (err) {
    res.status(500).json({ message: 'Error al consultar las órdenes' });
  }
};

// Consultar reseñas
const consultarReseñas = async (req, res) => {
  const { filtro, proyeccion, skip, limit, orden } = req.query;

  try {
    const client = await connectToMongoDB();
    const db = client.db('Proyecto_2'); // Reemplaza 'nombre_de_tu_base_de_datos' con el nombre de tu base de datos

    const filtroJson = filtro ? JSON.parse(filtro) : {};
    const proyeccionJson = proyeccion ? JSON.parse(proyeccion) : {};

    const reseñas = await db.collection('Resenas')
      .find(filtroJson)
      .project(proyeccionJson)
      .skip(parseInt(skip) || 0)
      .limit(parseInt(limit) || 10)
      .sort(orden ? { [orden]: 1 } : {})
      .toArray();

    res.status(200).json(reseñas);
    client.close();
  } catch (err) {
    res.status(500).json({ message: 'Error al consultar las reseñas' });
  }
};

module.exports = {
  consultarUsuarios,
  consultarRestaurantes,
  consultarArticulosMenu,
  consultarOrdenes,
  consultarReseñas
};
