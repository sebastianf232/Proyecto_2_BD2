const apiUrl = 'http://localhost:3000/api';  // API

//Actualizar formularios 
document.getElementById('coleccion').addEventListener('change', updateCreateForm);
document.getElementById('coleccionConsulta').addEventListener('change', updateConsultForm);
document.getElementById('coleccionActualizar').addEventListener('change', updateUpdateForm);
document.getElementById('coleccionEliminar').addEventListener('change', updateDeleteForm);

//crear docuemntos
async function updateCreateForm() {
    const coleccion = document.getElementById('coleccion').value;
    const formCreate = document.getElementById('form-crear');

    formCreate.innerHTML = ''; // Limpiar el formulario actual

    if (coleccion === 'Usuarios') {
        formCreate.innerHTML = `
            <label for="nombre">Nombre:</label><input type="text" id="nombre" required>
            <label for="correo">Correo:</label><input type="email" id="correo" required>
            <label for="direccion">Dirección:</label><input type="text" id="direccion" required>
            <label for="telefono">Teléfono:</label><input type="text" id="telefono" required>
        `;
    } else if (coleccion === 'Restaurantes') {
        formCreate.innerHTML = `
            <label for="nombreRestaurante">Nombre Restaurante:</label><input type="text" id="nombreRestaurante" required>
            <label for="descripcion">Descripción:</label><input type="text" id="descripcion" required>
            <label for="categoria">Categoría:</label><input type="text" id="categoria" required>
        `;
    } else if (coleccion === 'Articulos_Menu') {
        formCreate.innerHTML = `
            <label for="nombreArticulo">Nombre Artículo:</label><input type="text" id="nombreArticulo" required>
            <label for="precio">Precio:</label><input type="number" id="precio" required>
            <label for="descripcionArticulo">Descripción:</label><input type="text" id="descripcionArticulo" required>
        `;
    } else if (coleccion === 'Ordenes') {
        formCreate.innerHTML = `
            <label for="usuarioId">ID Usuario:</label><input type="text" id="usuarioId" required>
            <label for="restauranteId">ID Restaurante:</label><input type="text" id="restauranteId" required>
            <label for="items">Items (JSON):</label><input type="text" id="items" required>
            <label for="total">Total:</label><input type="number" id="total" required>
        `;
    } else if (coleccion === 'Resenas') {
        formCreate.innerHTML = `
            <label for="usuarioIdResena">ID Usuario:</label><input type="text" id="usuarioIdResena" required>
            <label for="restauranteIdResena">ID Restaurante:</label><input type="text" id="restauranteIdResena" required>
            <label for="contenido">Contenido de la Reseña:</label><input type="text" id="contenido" required>
            <label for="calificacion">Calificación (1-5):</label><input type="number" id="calificacion" required>
        `;
    }
}

// consultar documentos
async function updateConsultForm() {
    const coleccion = document.getElementById('coleccionConsulta').value;
    const formConsult = document.getElementById('form-consultar');

    formConsult.innerHTML = `
        <label for="filtro">Filtro (JSON):</label><input type="text" id="filtro" placeholder="Ej: {nombre: 'Juan'}">
        <label for="proyeccion">Proyección (JSON):</label><input type="text" id="proyeccion" placeholder="Ej: {nombre: 1, correo: 1}">
        <label for="skip">Skip:</label><input type="number" id="skip" value="0">
        <label for="limit">Limit:</label><input type="number" id="limit" value="10">
        <label for="orden">Ordenar por:</label><input type="text" id="orden" placeholder="Ej: nombre">
    `;
}

//actualizar documentos
async function updateUpdateForm() {
    const coleccion = document.getElementById('coleccionActualizar').value;
    const formUpdate = document.getElementById('form-actualizar');

    formUpdate.innerHTML = ''; // Limpiar el formulario actual

    if (coleccion === 'Usuarios') {
        formUpdate.innerHTML = `
            <label for="idActualizar">ID Usuario:</label><input type="text" id="idActualizar" required>
            <label for="nombreActualizar">Nombre:</label><input type="text" id="nombreActualizar">
            <label for="correoActualizar">Correo:</label><input type="email" id="correoActualizar">
            <label for="direccionActualizar">Dirección:</label><input type="text" id="direccionActualizar">
            <label for="telefonoActualizar">Teléfono:</label><input type="text" id="telefonoActualizar">
        `;
    } else if (coleccion === 'Restaurantes') {
        formUpdate.innerHTML = `
            <label for="idRestauranteActualizar">ID Restaurante:</label><input type="text" id="idRestauranteActualizar" required>
            <label for="nombreRestauranteActualizar">Nombre Restaurante:</label><input type="text" id="nombreRestauranteActualizar">
            <label for="descripcionRestauranteActualizar">Descripción:</label><input type="text" id="descripcionRestauranteActualizar">
            <label for="categoriaRestauranteActualizar">Categoría:</label><input type="text" id="categoriaRestauranteActualizar">
        `;
    } else if (coleccion === 'Articulos_Menu') {
        formUpdate.innerHTML = `
            <label for="idArticuloActualizar">ID Artículo:</label><input type="text" id="idArticuloActualizar" required>
            <label for="nombreArticuloActualizar">Nombre Artículo:</label><input type="text" id="nombreArticuloActualizar">
            <label for="precioActualizar">Precio:</label><input type="number" id="precioActualizar">
            <label for="descripcionArticuloActualizar">Descripción:</label><input type="text" id="descripcionArticuloActualizar">
        `;
    } else if (coleccion === 'Ordenes') {
        formUpdate.innerHTML = `
            <label for="idOrdenActualizar">ID Orden:</label><input type="text" id="idOrdenActualizar" required>
            <label for="usuarioIdOrdenActualizar">ID Usuario:</label><input type="text" id="usuarioIdOrdenActualizar">
            <label for="restauranteIdOrdenActualizar">ID Restaurante:</label><input type="text" id="restauranteIdOrdenActualizar">
            <label for="itemsOrdenActualizar">Items (JSON):</label><input type="text" id="itemsOrdenActualizar">
            <label for="totalOrdenActualizar">Total:</label><input type="number" id="totalOrdenActualizar">
        `;
    } else if (coleccion === 'Resenas') {
        formUpdate.innerHTML = `
            <label for="idResenaActualizar">ID Reseña:</label><input type="text" id="idResenaActualizar" required>
            <label for="usuarioIdResenaActualizar">ID Usuario:</label><input type="text" id="usuarioIdResenaActualizar">
            <label for="restauranteIdResenaActualizar">ID Restaurante:</label><input type="text" id="restauranteIdResenaActualizar">
            <label for="contenidoResenaActualizar">Contenido:</label><input type="text" id="contenidoResenaActualizar">
            <label for="calificacionResenaActualizar">Calificación (1-5):</label><input type="number" id="calificacionResenaActualizar">
        `;
    }
}

// eliminar documentos
async function updateDeleteForm() {
    const coleccion = document.getElementById('coleccionEliminar').value;
    const formDelete = document.getElementById('form-eliminar');

    formDelete.innerHTML = `
        <label for="idEliminar">ID del Elemento a Eliminar:</label><input type="text" id="idEliminar" required>
    `;
}

//creacion elementos
document.getElementById('crearElementoForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const coleccion = document.getElementById('coleccion').value;
    const data = {};

    if (coleccion === 'Usuarios') {
        data.nombre = document.getElementById('nombre').value;
        data.correo = document.getElementById('correo').value;
        data.direccion = document.getElementById('direccion').value;
        data.telefono = document.getElementById('telefono').value;
    } else if (coleccion === 'Restaurantes') {
        data.nombreRestaurante = document.getElementById('nombreRestaurante').value;
        data.descripcion = document.getElementById('descripcion').value;
        data.categoria = document.getElementById('categoria').value;
    } else if (coleccion === 'Articulos_Menu') {
        data.nombreArticulo = document.getElementById('nombreArticulo').value;
        data.precio = document.getElementById('precio').value;
        data.descripcionArticulo = document.getElementById('descripcionArticulo').value;
    } else if (coleccion === 'Ordenes') {
        data.usuarioId = document.getElementById('usuarioId').value;
        data.restauranteId = document.getElementById('restauranteId').value;
        data.items = document.getElementById('items').value;
        data.total = document.getElementById('total').value;
    } else if (coleccion === 'Resenas') {
        data.usuarioIdResena = document.getElementById('usuarioIdResena').value;
        data.restauranteIdResena = document.getElementById('restauranteIdResena').value;
        data.contenido = document.getElementById('contenido').value;
        data.calificacion = document.getElementById('calificacion').value;
    }

    const response = await fetch(`${apiUrl}/${coleccion.toLowerCase()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    alert(`Elemento creado con éxito: ${result.message}`);
    console.log(result);
});

//consultar elementos
document.getElementById('consultarElementoForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const coleccion = document.getElementById('coleccionConsulta').value;
    const filtro = document.getElementById('filtro').value;
    const proyeccion = document.getElementById('proyeccion').value;
    const skip = document.getElementById('skip').value;
    const limit = document.getElementById('limit').value;
    const orden = document.getElementById('orden').value;

    const url = `${apiUrl}/${coleccion.toLowerCase()}?filtro=${filtro}&proyeccion=${proyeccion}&skip=${skip}&limit=${limit}&orden=${orden}`;

    const response = await fetch(url);
    const data = await response.json();

    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
});

//eliminar
document.getElementById('eliminarElementoForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const coleccion = document.getElementById('coleccionEliminar').value;
    const idEliminar = document.getElementById('idEliminar').value;

    const response = await fetch(`${apiUrl}/${coleccion.toLowerCase()}/${idEliminar}`, {
        method: 'DELETE',
    });

    const data = await response.json();
    alert('Elemento eliminado con éxito');
    console.log(data);
});
