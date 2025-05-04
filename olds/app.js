const express = require('express');
const { MongoClient } = require('mongodb');
const crear = require('./crear');       // Importa las funciones de crear.js
const consultar = require('./consultar'); // Importa las funciones de consultar.js
const actualizar = require('./actualizar'); // Importa las funciones de actualizar.js
const eliminar = require('./eliminar');    // Importa las funciones de eliminar.js

const app = express();

// Middleware para procesar cuerpos de solicitud como JSON
app.use(express.json());

// Conexión a MongoDB
const mongoURI = 'mongodb+srv://dia21066:CMSOw7YTLnPTsdEp@cluster0.a4fng.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectToMongoDB = async () => {
  const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  return client;
};

// Función para conectar con la base de datos
const getDb = async () => {
  const client = await connectToMongoDB();
  return client.db('nombre_de_tu_base_de_datos');  // Reemplaza con el nombre de tu base de datos
};

// Rutas para crear documentos
app.post('/api/usuarios', async (req, res) => {
  try {
    await crear.crearUsuario(req, res, getDb);
  } catch (err) {
    res.status(500).send('Error al crear usuario: ' + err.message);
  }
});

app.post('/api/restaurantes', async (req, res) => {
  try {
    await crear.crearRestaurante(req, res, getDb);
  } catch (err) {
    res.status(500).send('Error al crear restaurante: ' + err.message);
  }
});

app.post('/api/articulos_menu', async (req, res) => {
  try {
    await crear.crearArticuloDeMenu(req, res, getDb);
  } catch (err) {
    res.status(500).send('Error al crear artículo de menú: ' + err.message);
  }
});

app.post('/api/ordenes', async (req, res) => {
  try {
    await crear.crearOrden(req, res, getDb);
  } catch (err) {
    res.status(500).send('Error al crear orden: ' + err.message);
  }
});

app.post('/api/resenas', async (req, res) => {
  try {
    await crear.crearResena(req, res, getDb);
  } catch (err) {
    res.status(500).send('Error al crear reseña: ' + err.message);
  }
});

// Rutas para consultar documentos
app.get('/api/usuarios', async (req, res) => {
  try {
    await consultar.consultarUsuarios(req, res, getDb);
  } catch (err) {
    res.status(500).send('Error al consultar usuarios: ' + err.message);
  }
});

app.get('/api/restaurantes', async (req, res) => {
  try {
    await consultar.consultarRestaurantes(req, res, getDb);
  } catch (err) {
    res.status(500).send('Error al consultar restaurantes: ' + err.message);
  }
});

app.get('/api/articulos_menu', async (req, res) => {
  try {
    await consultar.consultarArticulosMenu(req, res, getDb);
  } catch (err) {
    res.status(500).send('Error al consultar artículos de menú: ' + err.message);
  }
});

app.get('/api/ordenes', async (req, res) => {
  try {
    await consultar.consultarOrdenes(req, res, getDb);
  } catch (err) {
    res.status(500).send('Error al consultar órdenes: ' + err.message);
  }
});

app.get('/api/resenas', async (req, res) => {
  try {
    await consultar.consultarReseñas(req, res, getDb);
  } catch (err) {
    res.status(500).send('Error al consultar reseñas: ' + err.message);
  }
});

// Rutas para actualizar documentos
app.put('/api/usuarios/:id', async (req, res) => {
  try {
    await actualizar.actualizarUsuario(req, res, getDb);
  } catch (err) {
    res.status(500).send('Error al actualizar usuario: ' + err.message);
  }
});

app.put('/api/restaurantes/:id', async (req, res) => {
  try {
    await actualizar.actualizarRestaurante(req, res, getDb);
  } catch (err) {
    res.status(500).send('Error al actualizar restaurante: ' + err.message);
  }
});

app.put('/api/articulos_menu/:id', async (req, res) => {
  try {
    await actualizar.actualizarArticuloDeMenu(req, res, getDb);
  } catch (err) {
    res.status(500).send('Error al actualizar artículo de menú: ' + err.message);
  }
});

app.put('/api/ordenes/:id', async (req, res) => {
  try {
    await actualizar.actualizarOrden(req, res, getDb);
  } catch (err) {
    res.status(500).send('Error al actualizar orden: ' + err.message);
  }
});

app.put('/api/resenas/:id', async (req, res) => {
  try {
    await actualizar.actualizarResena(req, res, getDb);
  } catch (err) {
    res.status(500).send('Error al actualizar reseña: ' + err.message);
  }
});

// Rutas para eliminar documentos
app.delete('/api/usuarios/:id', async (req, res) => {
  try {
    await eliminar.eliminarUsuario(req, res, getDb);
  } catch (err) {
    res.status(500).send('Error al eliminar usuario: ' + err.message);
  }
});

app.delete('/api/restaurantes/:id', async (req, res) => {
  try {
    await eliminar.eliminarRestaurante(req, res, getDb);
  } catch (err) {
    res.status(500).send('Error al eliminar restaurante: ' + err.message);
  }
});

app.delete('/api/articulos_menu/:id', async (req, res) => {
  try {
    await eliminar.eliminarArticuloDeMenu(req, res, getDb);
  } catch (err) {
    res.status(500).send('Error al eliminar artículo de menú: ' + err.message);
  }
});

app.delete('/api/ordenes/:id', async (req, res) => {
  try {
    await eliminar.eliminarOrden(req, res, getDb);
  } catch (err) {
    res.status(500).send('Error al eliminar orden: ' + err.message);
  }
});

app.delete('/api/resenas/:id', async (req, res) => {
  try {
    await eliminar.eliminarResena(req, res, getDb);
  } catch (err) {
    res.status(500).send('Error al eliminar reseña: ' + err.message);
  }
});

// Iniciar servidor en el puerto 3000
app.listen(3000, (err) => {
  if (err) {
      console.log('Error al iniciar el servidor:', err);
      return;
  }
  console.log('Servidor API corriendo en http://localhost:3000');
});
