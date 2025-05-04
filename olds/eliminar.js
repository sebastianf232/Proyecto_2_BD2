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

// Eliminar un usuario
const eliminarUsuario = async (req, res) => {
  const { id } = req.params;  // Obtener el ID del usuario de los parámetros de la URL
  try {
    const client = await connectToMongoDB();
    const db = client.db('Proyecto_2'); // Reemplaza 'nombre_de_tu_base_de_datos' con el nombre de tu base de datos
    const result = await db.collection('Usuarios').deleteOne({ _id: new ObjectId(id) }); // Eliminar el usuario por su ID
    
    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Usuario no encontrado' });
    } else {
      res.status(200).json({ message: 'Usuario eliminado con éxito' });
    }
    client.close();
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
};

// Eliminar un restaurante
const eliminarRestaurante = async (req, res) => {
  const { id } = req.params;  // Obtener el ID del restaurante de los parámetros de la URL
  try {
    const client = await connectToMongoDB();
    const db = client.db('Proyecto_2'); // Reemplaza 'nombre_de_tu_base_de_datos' con el nombre de tu base de datos
    const result = await db.collection('Restaurantes').deleteOne({ _id: new ObjectId(id) }); // Eliminar el restaurante por su ID
    
    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Restaurante no encontrado' });
    } else {
      res.status(200).json({ message: 'Restaurante eliminado con éxito' });
    }
    client.close();
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar el restaurante' });
  }
};

// Eliminar un artículo de menú
const eliminarArticuloDeMenu = async (req, res) => {
  const { id } = req.params;  // Obtener el ID del artículo de menú de los parámetros de la URL
  try {
    const client = await connectToMongoDB();
    const db = client.db('Proyecto_2'); // Reemplaza 'nombre_de_tu_base_de_datos' con el nombre de tu base de datos
    const result = await db.collection('Articuloss_Menu').deleteOne({ _id: new ObjectId(id) }); // Eliminar el artículo de menú por su ID
    
    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Artículo de menú no encontrado' });
    } else {
      res.status(200).json({ message: 'Artículo de menú eliminado con éxito' });
    }
    client.close();
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar el artículo de menú' });
  }
};

// Eliminar una orden
const eliminarOrden = async (req, res) => {
  const { id } = req.params;  // Obtener el ID de la orden de los parámetros de la URL
  try {
    const client = await connectToMongoDB();
    const db = client.db('Proyecto_2'); // Reemplaza 'nombre_de_tu_base_de_datos' con el nombre de tu base de datos
    const result = await db.collection('Ordenes').deleteOne({ _id: new ObjectId(id) }); // Eliminar la orden por su ID
    
    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Orden no encontrada' });
    } else {
      res.status(200).json({ message: 'Orden eliminada con éxito' });
    }
    client.close();
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar la orden' });
  }
};

// Eliminar una reseña
const eliminarResena = async (req, res) => {
  const { id } = req.params;  // Obtener el ID de la reseña de los parámetros de la URL
  try {
    const client = await connectToMongoDB();
    const db = client.db('Proyecto_2'); // Reemplaza 'nombre_de_tu_base_de_datos' con el nombre de tu base de datos
    const result = await db.collection('Resenas').deleteOne({ _id: new ObjectId(id) }); // Eliminar la reseña por su ID
    
    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Reseña no encontrada' });
    } else {
      res.status(200).json({ message: 'Reseña eliminada con éxito' });
    }
    client.close();
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar la reseña' });
  }
};

module.exports = {
  eliminarUsuario,
  eliminarRestaurante,
  eliminarArticuloDeMenu,
  eliminarOrden,
  eliminarResena
};
