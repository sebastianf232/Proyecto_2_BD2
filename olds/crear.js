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

// Crear un usuario
const crearUsuario = async (req, res) => {
  const { nombre, correo, direccion, telefono } = req.body;

  try {
    const client = await connectToMongoDB();
    const db = client.db('Proyecto_2'); // Reemplaza 'nombre_de_tu_base_de_datos' con el nombre de tu base de datos
    const result = await db.collection('Usuarios').insertOne({
      nombre, correo, direccion, telefono, fechaRegistro, fechaNacimiento
    });

    res.status(201).json({ message: 'Usuario creado con éxito', userId: result.insertedId });
    client.close();
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
};

// Crear un restaurante
const crearRestaurante = async (req, res) => {
  const { nombreRestaurante, descripcion, categoria } = req.body;

  try {
    const client = await connectToMongoDB();
    const db = client.db('Proyecto_2'); // Reemplaza 'nombre_de_tu_base_de_datos' con el nombre de tu base de datos
    const result = await db.collection('Restaurantes').insertOne({
      nombreRestaurante, descripcion, categoria
    });

    res.status(201).json({ message: 'Restaurante creado con éxito', restaurantId: result.insertedId });
    client.close();
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el restaurante' });
  }
};

// Crear un artículo de menú
const crearArticuloDeMenu = async (req, res) => {
  const { nombreArticulo, precio, descripcionArticulo } = req.body;

  try {
    const client = await connectToMongoDB();
    const db = client.db('Proyecto_2'); // Reemplaza 'nombre_de_tu_base_de_datos' con el nombre de tu base de datos
    const result = await db.collection('Articulos_Menu').insertOne({
      nombreArticulo, precio, descripcionArticulo
    });

    res.status(201).json({ message: 'Artículo de menú creado con éxito', articleId: result.insertedId });
    client.close();
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el artículo de menú' });
  }
};

// Crear una orden
const crearOrden = async (req, res) => {
  const { usuarioId, restauranteId, items, total } = req.body;

  try {
    const client = await connectToMongoDB();
    const db = client.db('Proyecto_2'); // Reemplaza 'nombre_de_tu_base_de_datos' con el nombre de tu base de datos
    const result = await db.collection('Ordenes').insertOne({
      usuarioId, restauranteId, items, total
    });

    res.status(201).json({ message: 'Orden creada con éxito', orderId: result.insertedId });
    client.close();
  } catch (err) {
    res.status(500).json({ message: 'Error al crear la orden' });
  }
};

// Crear una reseña
const crearResena = async (req, res) => {
  const { usuarioIdResena, restauranteIdResena, contenido, calificacion } = req.body;

  try {
    const client = await connectToMongoDB();
    const db = client.db('Proyecto_2'); // Reemplaza 'nombre_de_tu_base_de_datos' con el nombre de tu base de datos
    const result = await db.collection('Resenas').insertOne({
      usuarioIdResena, restauranteIdResena, contenido, calificacion
    });

    res.status(201).json({ message: 'Reseña creada con éxito', reviewId: result.insertedId });
    client.close();
  } catch (err) {
    res.status(500).json({ message: 'Error al crear la reseña' });
  }
};

module.exports = {
  crearUsuario,
  crearRestaurante,
  crearArticuloDeMenu,
  crearOrden,
  crearResena
};
