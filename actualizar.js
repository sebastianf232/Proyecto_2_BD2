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

// Actualizar Usuario
const actualizarUsuario = async () => {
  const { nombre, nuevoCorreo, nuevaDireccion, nuevoTelefono } = await inquirer.prompt([
    { type: 'input', name: 'nombre', message: 'Ingrese el nombre del usuario a actualizar:' },
    { type: 'input', name: 'nuevoCorreo', message: 'Ingrese el nuevo correo del usuario:' },
    { type: 'input', name: 'nuevaDireccion', message: 'Ingrese la nueva dirección del usuario:' },
    { type: 'input', name: 'nuevoTelefono', message: 'Ingrese el nuevo teléfono del usuario:' },
  ]);

  const client = await connectToMongoDB();
  const db = client.db('Proyecto_2');
  const usuariosCollection = db.collection('Usuarios');

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

// Actualizar Restaurante
const actualizarRestaurante = async () => {
  const { nombre, nuevaDireccion, nuevaCategoria } = await inquirer.prompt([
    { type: 'input', name: 'nombre', message: 'Ingrese el nombre del restaurante a actualizar:' },
    { type: 'input', name: 'nuevaDireccion', message: 'Ingrese la nueva dirección del restaurante:' },
    { type: 'input', name: 'nuevaCategoria', message: 'Ingrese la nueva categoría del restaurante:' },
  ]);

  const client = await connectToMongoDB();
  const db = client.db('Proyecto_2');
  const restaurantesCollection = db.collection('Restaurantes');

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

// Actualizar Artículo de Menú
const actualizarArticuloDeMenu = async () => {
  const { nombre, nuevaDescripcion, nuevoPrecio, nuevaCategoria } = await inquirer.prompt([
    { type: 'input', name: 'nombre', message: 'Ingrese el nombre del artículo a actualizar:' },
    { type: 'input', name: 'nuevaDescripcion', message: 'Ingrese la nueva descripción del artículo:' },
    { type: 'input', name: 'nuevoPrecio', message: 'Ingrese el nuevo precio del artículo:' },
    { type: 'input', name: 'nuevaCategoria', message: 'Ingrese la nueva categoría del artículo:' },
  ]);

  const client = await connectToMongoDB();
  const db = client.db('Proyecto_2');
  const articulosCollection = db.collection('Articulos_Menu');

  const result = await articulosCollection.updateOne(
    { nombre },
    { $set: { descripcion: nuevaDescripcion, precio: parseFloat(nuevoPrecio), categoria: nuevaCategoria } }
  );

  if (result.modifiedCount > 0) {
    console.log('Artículo de menú actualizado con éxito');
  } else {
    console.log('No se encontró el artículo o no hubo cambios');
  }
  await client.close();
};

// Actualizar Orden
const actualizarOrden = async () => {
  const { idOrden, nuevoEstado } = await inquirer.prompt([
    { type: 'input', name: 'idOrden', message: 'Ingrese el ID de la orden a actualizar:' },
    { type: 'input', name: 'nuevoEstado', message: 'Ingrese el nuevo estado de la orden (Ejemplo: Pendiente, Enviado, Entregado):' },
  ]);

  const client = await connectToMongoDB();
  const db = client.db('Proyecto_2');
  const ordenesCollection = db.collection('Ordenes');

  const result = await ordenesCollection.updateOne(
    { _id: new MongoClient.ObjectId(idOrden) },
    { $set: { estado: nuevoEstado } }
  );

  if (result.modifiedCount > 0) {
    console.log('Orden actualizada con éxito');
  } else {
    console.log('No se encontró la orden o no hubo cambios');
  }
  await client.close();
};

// Actualizar Reseña
const actualizarResena = async () => {
  const { idResena, nuevaCalificacion, nuevoComentario } = await inquirer.prompt([
    { type: 'input', name: 'idResena', message: 'Ingrese el ID de la reseña a actualizar:' },
    { type: 'input', name: 'nuevaCalificacion', message: 'Ingrese la nueva calificación (1-5):' },
    { type: 'input', name: 'nuevoComentario', message: 'Ingrese el nuevo comentario:' },
  ]);

  const client = await connectToMongoDB();
  const db = client.db('Proyecto_2');
  const resenasCollection = db.collection('Resenas');

  const result = await resenasCollection.updateOne(
    { _id: new MongoClient.ObjectId(idResena) },
    { $set: { calificacion: parseFloat(nuevaCalificacion), comentario: nuevoComentario } }
  );

  if (result.modifiedCount > 0) {
    console.log('Reseña actualizada con éxito');
  } else {
    console.log('No se encontró la reseña o no hubo cambios');
  }
  await client.close();
};

//exportar las funciones
module.exports = {
  actualizarUsuario,
  actualizarRestaurante,
  actualizarArticuloDeMenu,
  actualizarOrden,
  actualizarResena,
};
