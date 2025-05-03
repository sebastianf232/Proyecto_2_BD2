const express = require('express');
const inquirer = require('inquirer');
const { MongoClient } = require('mongodb');
const crear = require('./crear');
const consultar = require('./consultar');
const actualizar = require('./actualizar');
const eliminar = require('./eliminar');

const app = express();
app.use(express.json());

// Conexión a MongoDB
const mongoURI = 'mongodb+srv://dia21066:CMSOw7YTLnPTsdEp@cluster0.a4fng.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const connectToMongoDB = async () => {
  const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  return client;
};

// Endpoint para crear un usuario
app.post('/api/usuarios', async (req, res) => {
  try {
    await crear.crearUsuario(req, res);
  } catch (err) {
    res.status(500).send('Error al crear usuario: ' + err.message);
  }
});

// Endpoint para consultar usuarios
app.get('/api/usuarios', async (req, res) => {
  try {
    await consultar.consultarUsuarios(req, res);
  } catch (err) {
    res.status(500).send('Error al consultar usuarios: ' + err.message);
  }
});

// Endpoint para actualizar un usuario
app.put('/api/usuarios/:id', async (req, res) => {
  try {
    await actualizar.actualizarUsuario(req, res);
  } catch (err) {
    res.status(500).send('Error al actualizar usuario: ' + err.message);
  }
});

// Endpoint para eliminar un usuario
app.delete('/api/usuarios/:id', async (req, res) => {
  try {
    await eliminar.eliminarUsuario(req, res);
  } catch (err) {
    res.status(500).send('Error al eliminar usuario: ' + err.message);
  }
});

// Endpoint para crear un restaurante
app.post('/api/restaurantes', async (req, res) => {
  try {
    await crear.crearRestaurante(req, res);
  } catch (err) {
    res.status(500).send('Error al crear restaurante: ' + err.message);
  }
});

// Endpoint para consultar restaurantes
app.get('/api/restaurantes', async (req, res) => {
  try {
    await consultar.consultarRestaurantes(req, res);
  } catch (err) {
    res.status(500).send('Error al consultar restaurantes: ' + err.message);
  }
});

// Endpoint para actualizar un restaurante
app.put('/api/restaurantes/:id', async (req, res) => {
  try {
    await actualizar.actualizarRestaurante(req, res);
  } catch (err) {
    res.status(500).send('Error al actualizar restaurante: ' + err.message);
  }
});

// Endpoint para eliminar un restaurante
app.delete('/api/restaurantes/:id', async (req, res) => {
  try {
    await eliminar.eliminarRestaurante(req, res);
  } catch (err) {
    res.status(500).send('Error al eliminar restaurante: ' + err.message);
  }
});

// Endpoint para crear un artículo de menú
app.post('/api/articulos_menu', async (req, res) => {
  try {
    await crear.crearArticuloDeMenu(req, res);
  } catch (err) {
    res.status(500).send('Error al crear artículo de menú: ' + err.message);
  }
});

// Endpoint para consultar artículos de menú
app.get('/api/articulos_menu', async (req, res) => {
  try {
    await consultar.consultarArticulosMenu(req, res);
  } catch (err) {
    res.status(500).send('Error al consultar artículos de menú: ' + err.message);
  }
});

// Endpoint para actualizar un artículo de menú
app.put('/api/articulos_menu/:id', async (req, res) => {
  try {
    await actualizar.actualizarArticuloDeMenu(req, res);
  } catch (err) {
    res.status(500).send('Error al actualizar artículo de menú: ' + err.message);
  }
});

// Endpoint para eliminar un artículo de menú
app.delete('/api/articulos_menu/:id', async (req, res) => {
  try {
    await eliminar.eliminarArticuloDeMenu(req, res);
  } catch (err) {
    res.status(500).send('Error al eliminar artículo de menú: ' + err.message);
  }
});

// Endpoint para crear una orden
app.post('/api/ordenes', async (req, res) => {
  try {
    await crear.crearOrden(req, res);
  } catch (err) {
    res.status(500).send('Error al crear orden: ' + err.message);
  }
});

// Endpoint para consultar órdenes
app.get('/api/ordenes', async (req, res) => {
  try {
    await consultar.consultarOrdenes(req, res);
  } catch (err) {
    res.status(500).send('Error al consultar órdenes: ' + err.message);
  }
});

// Endpoint para actualizar una orden
app.put('/api/ordenes/:id', async (req, res) => {
  try {
    await actualizar.actualizarOrden(req, res);
  } catch (err) {
    res.status(500).send('Error al actualizar orden: ' + err.message);
  }
});

// Endpoint para eliminar una orden
app.delete('/api/ordenes/:id', async (req, res) => {
  try {
    await eliminar.eliminarOrden(req, res);
  } catch (err) {
    res.status(500).send('Error al eliminar orden: ' + err.message);
  }
});

// Endpoint para crear una reseña
app.post('/api/resenas', async (req, res) => {
  try {
    await crear.crearResena(req, res);
  } catch (err) {
    res.status(500).send('Error al crear reseña: ' + err.message);
  }
});

// Endpoint para consultar reseñas
app.get('/api/resenas', async (req, res) => {
  try {
    await consultar.consultarReseñas(req, res);
  } catch (err) {
    res.status(500).send('Error al consultar reseñas: ' + err.message);
  }
});

// Endpoint para actualizar una reseña
app.put('/api/resenas/:id', async (req, res) => {
  try {
    await actualizar.actualizarResena(req, res);
  } catch (err) {
    res.status(500).send('Error al actualizar reseña: ' + err.message);
  }
});

// Endpoint para eliminar una reseña
app.delete('/api/resenas/:id', async (req, res) => {
  try {
    await eliminar.eliminarResena(req, res);
  } catch (err) {
    res.status(500).send('Error al eliminar reseña: ' + err.message);
  }
});

// Iniciar servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor API corriendo en http://localhost:3000');
});
