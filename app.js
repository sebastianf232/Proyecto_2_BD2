const inquirer = require('inquirer');
const crear = require('./crear');
const consultar = require('./consultar');
const actualizar = require('./actualizar');
const eliminar = require('./eliminar');

// Menú interactivo
const menu = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: '¿Qué operación deseas realizar?',
      choices: [
        'Crear',
        'Consultar',
        'Actualizar',
        'Eliminar',
        'Salir'
      ],
    },
  ]);

  switch (action) {
    case 'Crear':
      await menuCrear();
      break;
    case 'Consultar':
      await menuConsultar();
      break;
    case 'Actualizar':
      await menuActualizar();
      break;
    case 'Eliminar':
      await menuEliminar();
      break;
    case 'Salir':
      console.log("¡Hasta luego!");
      process.exit();
      break;
    default:
      console.log("Opción no válida.");
      menu();
  }
};

// Menú para la opción Crear
const menuCrear = async () => {
  const { actionCrear } = await inquirer.prompt([
    {
      type: 'list',
      name: 'actionCrear',
      message: '¿Qué deseas crear?',
      choices: [
        'Crear Usuario',
        'Crear Restaurante',
        'Crear Artículo de Menú',
        'Crear Orden',
        'Crear Reseña',
        'Volver al Menú Principal'
      ],
    },
  ]);

  switch (actionCrear) {
    case 'Crear Usuario':
      await crear.crearUsuario();
      break;
    case 'Crear Restaurante':
      await crear.crearRestaurante();
      break;
    case 'Crear Artículo de Menú':
      await crear.crearArticuloDeMenu();
      break;
    case 'Crear Orden':
      await crear.crearOrden();
      break;
    case 'Crear Reseña':
      await crear.crearResena();
      break;
    case 'Volver al Menú Principal':
      return menu();
    default:
      console.log("Opción no válida.");
      menuCrear();
  }

  // Volver al Menú Principal después de la operación
  await menu();
};

// Menú para la opción Consultar
const menuConsultar = async () => {
  const { actionConsultar } = await inquirer.prompt([
    {
      type: 'list',
      name: 'actionConsultar',
      message: '¿Qué deseas consultar?',
      choices: [
        'Consultar Usuario',
        'Consultar Restaurante',
        'Consultar Orden',
        'Consultar Reseña',
        'Consultar Artículo de Menú',
        'Volver al Menú Principal'
      ],
    },
  ]);

  switch (actionConsultar) {
    case 'Consultar Usuario':
      await consultar.consultarUsuarios();
      break;
    case 'Consultar Restaurante':
      await consultar.consultarRestaurantes();
      break;
    case 'Consultar Orden':
      await consultar.consultarOrdenes();
      break;
    case 'Consultar Reseña':
      await consultar.consultarReseñas();
      break;
    case 'Consultar Artículo de Menú':
      await consultar.consultarArticulosMenu();
      break;
    case 'Volver al Menú Principal':
      return menu();
    default:
      console.log("Opción no válida.");
      menuConsultar();
  }

  // Volver al Menú Principal después de la operación
  await menu();
};

// Menú para la opción Actualizar
const menuActualizar = async () => {
  const { actionActualizar } = await inquirer.prompt([
    {
      type: 'list',
      name: 'actionActualizar',
      message: '¿Qué deseas actualizar?',
      choices: [
        'Actualizar Usuario',
        'Actualizar Restaurante',
        'Actualizar Artículo de Menú',
        'Actualizar Orden',
        'Actualizar Reseña',
        'Volver al Menú Principal'
      ],
    },
  ]);

  switch (actionActualizar) {
    case 'Actualizar Usuario':
      await actualizar.actualizarUsuario();
      break;
    case 'Actualizar Restaurante':
      await actualizar.actualizarRestaurante();
      break;
    case 'Actualizar Artículo de Menú':
      await actualizar.actualizarArticuloDeMenu();
      break;
    case 'Actualizar Orden':
      await actualizar.actualizarOrden();
      break;
    case 'Actualizar Reseña':
      await actualizar.actualizarResena();
      break;
    case 'Volver al Menú Principal':
      return menu();
    default:
      console.log("Opción no válida.");
      menuActualizar();
  }

  // Volver al Menú Principal después de la operación
  await menu();
};

// Menú para la opción Eliminar
const menuEliminar = async () => {
  const { actionEliminar } = await inquirer.prompt([
    {
      type: 'list',
      name: 'actionEliminar',
      message: '¿Qué deseas eliminar?',
      choices: [
        'Eliminar Usuario',
        'Eliminar Restaurante',
        'Eliminar Artículo de Menú',
        'Eliminar Orden',
        'Eliminar Reseña',
        'Volver al Menú Principal'
      ],
    },
  ]);

  switch (actionEliminar) {
    case 'Eliminar Usuario':
      await eliminar.eliminarUsuario();
      break;
    case 'Eliminar Restaurante':
      await eliminar.eliminarRestaurante();
      break;
    case 'Eliminar Artículo de Menú':
      await eliminar.eliminarArticuloDeMenu();
      break;
    case 'Eliminar Orden':
      await eliminar.eliminarOrden();
      break;
    case 'Eliminar Reseña':
      await eliminar.eliminarResena();
      break;
    case 'Volver al Menú Principal':
      return menu();
    default:
      console.log("Opción no válida.");
      menuEliminar();
  }

  // Volver al Menú Principal después de la operación
  await menu();
};

// Llamar al menú principal al ejecutar el archivo
menu();
