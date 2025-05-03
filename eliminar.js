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

//eliminar usuario
const eliminarUsuario = async () => {
  const { nombre } = await inquirer.prompt([
    { type: 'input', name: 'nombre', message: 'Ingrese el nombre del usuario a eliminar:' },
  ]);

  const client = await connectToMongoDB();
  const db = client.db('Proyecto_2');
  const usuariosCollection = db.collection('Usuarios');

  const result = await usuariosCollection.deleteOne({ nombre });

  if (result.deletedCount > 0) {
    console.log('Usuario eliminado con éxito');
  } else {
    console.log('No se encontró el usuario');
  }
  await client.close();
};

//eliminar restaurante
const eliminarRestaurante = async () => {
  const { nombre } = await inquirer.prompt([
    { type: 'input', name: 'nombre', message: 'Ingrese el nombre del restaurante a eliminar:' },
  ]);

  const client = await connectToMongoDB();
  const db = client.db('Proyecto_2');
  const restaurantesCollection = db.collection('Restaurantes');

  const result = await restaurantesCollection.deleteOne({ nombre });

  if (result.deletedCount > 0) {
    console.log('Restaurante eliminado con éxito');
  } else {
    console.log('No se encontró el restaurante');
  }
  await client.close();
};

// eliminar articulo de menu
const eliminarArticuloDeMenu = async () => {
  const { nombre } = await inquirer.prompt([
    { type: 'input', name: 'nombre', message: 'Ingrese el nombre del artículo a eliminar:' },
  ]);

  const client = await connectToMongoDB();
  const db = client.db('Proyecto_2');
  const articulosCollection = db.collection('Articulos_Menu');

  const result = await articulosCollection.deleteOne({ nombre });

  if (result.deletedCount > 0) {
    console.log('Artículo de menú eliminado con éxito');
  } else {
    console.log('No se encontró el artículo de menú');
  }
  await client.close();
};

// eliminar orden
const eliminarOrden = async () => {
  const { idOrden } = await inquirer.prompt([
    { type: 'input', name: 'idOrden', message: 'Ingrese el ID de la orden a eliminar:' },
  ]);

  const client = await connectToMongoDB();
  const db = client.db('Proyecto_2');
  const ordenesCollection = db.collection('Ordenes');

  const result = await ordenesCollection.deleteOne({ _id: new MongoClient.ObjectId(idOrden) });

  if (result.deletedCount > 0) {
    console.log('Orden eliminada con éxito');
  } else {
    console.log('No se encontró la orden');
  }
  await client.close();
};

//eliminar reseña
const eliminarResena = async () => {
  const { idResena } = await inquirer.prompt([
    { type: 'input', name: 'idResena', message: 'Ingrese el ID de la reseña a eliminar:' },
  ]);

  const client = await connectToMongoDB();
  const db = client.db('Proyecto_2');
  const resenasCollection = db.collection('Resenas');

  const result = await resenasCollection.deleteOne({ _id: new MongoClient.ObjectId(idResena) });

  if (result.deletedCount > 0) {
    console.log('Reseña eliminada con éxito');
  } else {
    console.log('No se encontró la reseña');
  }
  await client.close();
};

//exportar funciones
module.exports = {
  eliminarUsuario,
  eliminarRestaurante,
  eliminarArticuloDeMenu,
  eliminarOrden,
  eliminarResena,
};
