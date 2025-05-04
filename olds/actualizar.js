const { MongoClient, ObjectId } = require('mongodb');

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

// Actualizar un usuario
const actualizarUsuario = async (req, res) => {
  const { id } = req.params;  // Obtener el ID de los parámetros de la URL
  const { nombre, correo, direccion, telefono, fechaRegistro, fechaNacimiento } = req.body;  // Obtener los datos a actualizar desde el cuerpo de la solicitud

  try {
    const client = await connectToMongoDB();
    const db = client.db('Proyecto_2'); // Reemplaza 'nombre_de_tu_base_de_datos' con el nombre de tu base de datos
    const result = await db.collection('Usuarios').updateOne(
      { _id: new ObjectId(id) },  // Buscar el usuario por su ID
      { $set: { nombre, correo, direccion, telefono, fechaRegistro, fechaNacimiento } }  // Actualizar los campos
    );
    
    if (result.matchedCount === 0) {
      res.status(404).json({ message: 'Usuario no encontrado' });
    } else {
      res.status(200).json({ message: 'Usuario actualizado con éxito' });
    }
    client.close();
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
};

// Actualizar un restaurante
const actualizarRestaurante = async (req, res) => {
  const { id } = req.params;  // Obtener el ID del restaurante de los parámetros de la URL
  const { nombreRestaurante, descripcion, categoria } = req.body;  // Obtener los datos a actualizar desde el cuerpo de la solicitud

  try {
    const client = await connectToMongoDB();
    const db = client.db('Proyecto_2'); // Reemplaza 'nombre_de_tu_base_de_datos' con el nombre de tu base de datos
    const result = await db.collection('Restaurantes').updateOne(
      { _id: new ObjectId(id) },  // Buscar el restaurante por su ID
      { $set: { nombreRestaurante, descripcion, categoria } }  // Actualizar los campos
    );

    if (result.matchedCount === 0) {
      res.status(404).json({ message: 'Restaurante no encontrado' });
    } else {
      res.status(200).json({ message: 'Restaurante actualizado con éxito' });
    }
    client.close();
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar el restaurante' });
  }
};

// Actualizar un artículo de menú
const actualizarArticuloDeMenu = async (req, res) => {
  const { id } = req.params;  // Obtener el ID del artículo de menú de los parámetros de la URL
  const { nombreArticulo, precio, descripcionArticulo } = req.body;  // Obtener los datos a actualizar desde el cuerpo de la solicitud

  try {
    const client = await connectToMongoDB();
    const db = client.db('Proyecto_2'); // Reemplaza 'nombre_de_tu_base_de_datos' con el nombre de tu base de datos
    const result = await db.collection('Articulos_Menu').updateOne(
      { _id: new ObjectId(id) },  // Buscar el artículo de menú por su ID
      { $set: { nombreArticulo, precio, descripcionArticulo } }  // Actualizar los campos
    );

    if (result.matchedCount === 0) {
      res.status(404).json({ message: 'Artículo de menú no encontrado' });
    } else {
      res.status(200).json({ message: 'Artículo de menú actualizado con éxito' });
    }
    client.close();
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar el artículo de menú' });
  }
};

// Actualizar una orden
const actualizarOrden = async (req, res) => {
  const { id } = req.params;  // Obtener el ID de la orden de los parámetros de la URL
  const { usuarioId, restauranteId, items, total } = req.body;  // Obtener los datos a actualizar desde el cuerpo de la solicitud

  try {
    const client = await connectToMongoDB();
    const db = client.db('Proyecto_2'); // Reemplaza 'nombre_de_tu_base_de_datos' con el nombre de tu base de datos
    const result = await db.collection('Ordenes').updateOne(
      { _id: new ObjectId(id) },  // Buscar la orden por su ID
      { $set: { usuarioId, restauranteId, items, total } }  // Actualizar los campos
    );

    if (result.matchedCount === 0) {
      res.status(404).json({ message: 'Orden no encontrada' });
    } else {
      res.status(200).json({ message: 'Orden actualizada con éxito' });
    }
    client.close();
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar la orden' });
  }
};

// Actualizar una reseña
const actualizarResena = async (req, res) => {
  const { id } = req.params;  // Obtener el ID de la reseña de los parámetros de la URL
  const { usuarioIdResena, restauranteIdResena, contenido, calificacion } = req.body;  // Obtener los datos a actualizar desde el cuerpo de la solicitud

  try {
    const client = await connectToMongoDB();
    const db = client.db('Proyecto_2'); // Reemplaza 'nombre_de_tu_base_de_datos' con el nombre de tu base de datos
    const result = await db.collection('Resenas').updateOne(
      { _id: new ObjectId(id) },  // Buscar la reseña por su ID
      { $set: { usuarioIdResena, restauranteIdResena, contenido, calificacion } }  // Actualizar los campos
    );

    if (result.matchedCount === 0) {
      res.status(404).json({ message: 'Reseña no encontrada' });
    } else {
      res.status(200).json({ message: 'Reseña actualizada con éxito' });
    }
    client.close();
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar la reseña' });
  }
};

module.exports = {
  actualizarUsuario,
  actualizarRestaurante,
  actualizarArticuloDeMenu,
  actualizarOrden,
  actualizarResena
};
