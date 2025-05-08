const apiUrl = 'http://127.0.0.1:5000/api';  

// Actualizar formularios según la colección seleccionada
document.getElementById('coleccion').addEventListener('change', updateCreateForm);
document.getElementById('coleccionConsulta').addEventListener('change', updateConsultForm);
document.getElementById('coleccionActualizar').addEventListener('change', updateUpdateForm);
document.getElementById('coleccionEliminar').addEventListener('change', updateDeleteForm);

// Función para crear elementos (formulario de "Crear")
async function updateCreateForm() {
    const coleccion = document.getElementById('coleccion').value;
    const formCreate = document.getElementById('form-crear');
    formCreate.innerHTML = '';  // Limpiar el formulario actual

    if (coleccion === 'Usuarios') {
        formCreate.innerHTML = `
            <label for="nombre">Nombre:</label><input type="text" id="nombre" required>
            <label for="correo">Correo:</label><input type="email" id="correo" required>
            <label for="direccion">Dirección:</label><input type="text" id="direccion" required>
            <label for="telefono">Teléfono:</label><input type="text" id="telefono" required>
            <label for="fechaRegistro">Fecha Registro:</label><input type="date" id="fechaRegistro" required>
            <label for="fechaNacimiento">Fecha Nacimiento:</label><input type="date" id="fechaNacimiento" required>
        `;
    } else if (coleccion === 'Restaurantes') {
        formCreate.innerHTML = `
            <label for="nombre">Nombre Restaurante:</label><input type="text" id="nombre" required>
            <label for="descripcion">Descripción:</label><input type="text" id="descripcion" required>
            <label for="categoria">Categoría:</label><input type="text" id="categoria" required>
            <label for="calle">Calle:</label><input type="text" id="calle" required>
            <label for="ciudad">Ciudad:</label><input type="text" id="ciudad" required>
            <label for="telefono">Teléfono:</label><input type="text" id="telefono" required>
            <label for="longitud">Longitud:</label><input type="number" id="longitud" step="any">
            <label for="latitud">Latitud:</label><input type="number" id="latitud" step="any">
            <label for="fechaRegistro">Fecha Registro:</label><input type="date" id="fechaRegistro" required>
        `;
    } else if (coleccion === 'Articulos_Menu') {
        formCreate.innerHTML = `
            <label for="nombre">Nombre Artículo:</label><input type="text" id="nombre" required>
            <label for="precio">Precio:</label><input type="number" id="precio" step="0.01" required>
            <label for="descripcion">Descripción:</label><input type="text" id="descripcion" required>
            <label for="categoria">Categoría:</label><input type="text" id="categoria" required>
            <label for="restauranteId">ID Restaurante:</label><input type="text" id="restauranteId" required>
            <label for="disponibilidad">Disponibilidad:</label><input type="checkbox" id="disponibilidad" name="disponibilidad" value="true">
        `;
    } else if (coleccion === 'Ordenes') {
        formCreate.innerHTML = `
            <label for="usuarioId">ID Usuario:</label><input type="text" id="usuarioId" required>
            <label for="restauranteId">ID Restaurante:</label><input type="text" id="restauranteId" required>
            <label for="items">Items (JSON):</label><input type="text" id="items" required>
            <label for="estado">Estado:</label><input type="text" id="estado" required>
            <label for="fechaOrden">Fecha Orden:</label><input type="date" id="fechaOrden" required>
        `;
    } else if (coleccion === 'Resenas') {
        formCreate.innerHTML = `
            <label for="usuarioId">ID Usuario:</label><input type="text" id="usuarioId" required>
            <label for="restauranteId">ID Restaurante:</label><input type="text" id="restauranteId" required>
            <label for="contenido">Contenido de la Reseña:</label><input type="text" id="contenido" required>
            <label for="calificacion">Calificación (1-5):</label><input type="number" id="calificacion" name="calificacion" min="0" max="5" step="any" required>
            <label for="ordenId">ID Orden:</label><input type="text" id="ordenId" required>
            <label for="fechaResena">Fecha Reseña:</label><input type="date" id="fechaResena" required>
        `;
    }
}

// Función para consultar elementos (formulario de "Consultar")
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

// Función para actualizar elementos (formulario de "Actualizar")
function updateUpdateForm() {
    const coleccion = document.getElementById('coleccionActualizar').value;
    const formUpdate = document.getElementById('form-actualizar');
    formUpdate.innerHTML = '';
  
    if (coleccion === 'Usuarios') {
      formUpdate.innerHTML = `
        <label for="idActualizar">ID Usuario:</label>
        <input type="text" id="idActualizar" required>
        <label for="nombreActualizar">Nombre:</label>
        <input type="text" id="nombreActualizar">
        <label for="correoActualizar">Correo:</label>
        <input type="email" id="correoActualizar">
        <label for="direccionActualizar">Dirección:</label>
        <input type="text" id="direccionActualizar">
        <label for="telefonoActualizar">Teléfono:</label>
        <input type="text" id="telefonoActualizar">
        <label for="fechaRegistroActualizar">Fecha Registro:</label>
        <input type="date" id="fechaRegistroActualizar">
        <label for="fechaNacimientoActualizar">Fecha Nacimiento:</label>
        <input type="date" id="fechaNacimientoActualizar">
      `;
  
    } else if (coleccion === 'Restaurantes') {
      formUpdate.innerHTML = `
        <label for="idRestauranteActualizar">ID Restaurante:</label>
        <input type="text" id="idRestauranteActualizar" required>
        <label for="nombreRestauranteActualizar">Nombre Restaurante:</label>
        <input type="text" id="nombreRestauranteActualizar">
        <label for="descripcionRestauranteActualizar">Descripción:</label>
        <input type="text" id="descripcionRestauranteActualizar">
        <label for="categoriaRestauranteActualizar">Categoría:</label>
        <input type="text" id="categoriaRestauranteActualizar">
        <label for="calleActualizar">Calle:</label>
        <input type="text" id="calleActualizar">
        <label for="ciudadActualizar">Ciudad:</label>
        <input type="text" id="ciudadActualizar">
        <label for="telefonoActualizar">Teléfono:</label>
        <input type="text" id="telefonoActualizar">
        <label for="longitudActualizar">Longitud:</label>
        <input type="number" id="longitudActualizar" step="any">
        <label for="latitudActualizar">Latitud:</label>
        <input type="number" id="latitudActualizar" step="any">
        <label for="fechaRegistroActualizar">Fecha Registro:</label>
        <input type="date" id="fechaRegistroActualizar">
      `;
  
    } else if (coleccion === 'Articulos_Menu') {
      formUpdate.innerHTML = `
        <label for="idArticuloActualizar">ID Artículo:</label>
        <input type="text" id="idArticuloActualizar" required>
        <label for="nombreArticuloActualizar">Nombre Artículo:</label>
        <input type="text" id="nombreArticuloActualizar">
        <label for="precioActualizar">Precio:</label>
        <input type="number" id="precioActualizar">
        <label for="descripcionArticuloActualizar">Descripción:</label>
        <input type="text" id="descripcionArticuloActualizar">
        <label for="categoriaArticuloActualizar">Categoría:</label>
        <input type="text" id="categoriaArticuloActualizar">
        <label for="restauranteIdActualizar">ID Restaurante:</label>
        <input type="text" id="restauranteIdActualizar">
        <label for="disponibilidadActualizar">Disponibilidad:</label>
        <input type="checkbox" id="disponibilidadActualizar" name="disponibilidadActualizar" value="true">
      `;
  
    } else if (coleccion === 'Ordenes') {
      formUpdate.innerHTML = `
        <label for="idOrdenActualizar">ID Orden:</label>
        <input type="text" id="idOrdenActualizar" required>
        <label for="usuarioIdOrdenActualizar">ID Usuario:</label>
        <input type="text" id="usuarioIdOrdenActualizar">
        <label for="restauranteIdOrdenActualizar">ID Restaurante:</label>
        <input type="text" id="restauranteIdOrdenActualizar">
        <label for="itemsOrdenActualizar">Items (JSON):</label>
        <input type="text" id="itemsOrdenActualizar">
        <label for="totalOrdenActualizar">Total:</label>
        <input type="number" id="totalOrdenActualizar">
      `;
  
    } else if (coleccion === 'Resenas') {
      formUpdate.innerHTML = `
        <label for="idResenaActualizar">ID Reseña:</label>
        <input type="text" id="idResenaActualizar" required>
        <label for="usuarioIdResenaActualizar">ID Usuario:</label>
        <input type="text" id="usuarioIdResenaActualizar">
        <label for="restauranteIdResenaActualizar">ID Restaurante:</label>
        <input type="text" id="restauranteIdResenaActualizar">
        <label for="contenidoResenaActualizar">Contenido:</label>
        <input type="text" id="contenidoResenaActualizar">
        <label for="calificacionResenaActualizar">Calificación (1-5):</label>
        <input type="number" id="calificacionResenaActualizar">
      `;
    }
  }

// Función para eliminar elementos (formulario de "Eliminar")
async function updateDeleteForm() {
    const coleccion = document.getElementById('coleccionEliminar').value;
    const formDelete = document.getElementById('form-eliminar');
    formDelete.innerHTML = `
        <label for="idEliminar">ID del Elemento a Eliminar:</label><input type="text" id="idEliminar" required>
    `;
}

// Crear elementos
document.getElementById('crearElementoForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const coleccion = document.getElementById('coleccion').value;
    const data = {};

    // Recoger los datos del formulario según la colección seleccionada
    if (coleccion === 'Usuarios') {
        data.nombre = document.getElementById('nombre').value;
        data.correo = document.getElementById('correo').value;
        data.direccion = document.getElementById('direccion').value;
        data.telefono = document.getElementById('telefono').value;
        data.fechaRegistro = document.getElementById('fechaRegistro').value;
        data.fechaNacimiento = document.getElementById('fechaNacimiento').value;
    } else if (coleccion === 'Restaurantes') {
        data.nombre = document.getElementById('nombre').value;
        data.descripcion = document.getElementById('descripcion').value;
        data.categoria = document.getElementById('categoria').value;
        data.calle = document.getElementById('calle').value;
        data.ciudad = document.getElementById('ciudad').value;
        data.telefono = document.getElementById('telefono').value;
        data.longitud = parseFloat(document.getElementById('longitud').value);
        data.latitud = parseFloat(document.getElementById('latitud').value);
        data.fechaRegistro = document.getElementById('fechaRegistro').value;
    } else if (coleccion === 'Articulos_Menu') {
        data.nombre = document.getElementById('nombre').value;
        data.precio = parseFloat(document.getElementById('precio').value);
        data.descripcion = document.getElementById('descripcion').value;
        data.categoria = document.getElementById('categoria').value;
        data.restauranteId = document.getElementById('restauranteId').value;
        data.disponibilidad = document.getElementById('disponibilidad').checked;
    } else if (coleccion === 'Ordenes') {
        data.usuarioId = document.getElementById('usuarioId').value;
        data.restauranteId = document.getElementById('restauranteId').value;
    
        try {
            data.items = JSON.parse(document.getElementById('items').value);  
        } catch (e) {
            alert("Items debe ser un arreglo JSON válido, ejemplo: [\"id1\", \"id2\"]");
            return;
        }
    
        data.estado = document.getElementById('estado').value;
        data.fechaOrden = document.getElementById('fechaOrden').value;
    }

     else if (coleccion === 'Resenas') {
        data.usuarioIdResena = document.getElementById('usuarioIdResena').value;
        data.restauranteIdResena = document.getElementById('restauranteIdResena').value;
        data.contenido = document.getElementById('contenido').value;
        data.calificacion = document.getElementById('calificacion').value;
    }

    // Asegúrate de que la URL esté correcta dependiendo de la colección seleccionada
    const response = await fetch(`${apiUrl}/${coleccion.toLowerCase()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    alert(`Elemento creado con éxito: ${result.message}`);
    console.log(result);
});

// Consultar elementos
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
// Actualizar elementos
document.getElementById('coleccionActualizar').addEventListener('change', updateUpdateForm);
updateUpdateForm();  // Inicializar formulario

// Manejar envío de actualización
document.getElementById('actualizarElementoForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const coleccion = document.getElementById('coleccionActualizar').value;
  let idActualizar;
  const data = {};

  // Obtener el ID según la colección
  if (coleccion === 'Usuarios') {
    idActualizar = document.getElementById('idActualizar').value;
    data.nombre = document.getElementById('nombreActualizar').value;
    data.correo = document.getElementById('correoActualizar').value;
    data.direccion = document.getElementById('direccionActualizar').value;
    data.telefono = document.getElementById('telefonoActualizar').value;
    data.fechaRegistro = document.getElementById('fechaRegistroActualizar').value;
    data.fechaNacimiento = document.getElementById('fechaNacimientoActualizar').value;

  } else if (coleccion === 'Restaurantes') {
    idActualizar = document.getElementById('idRestauranteActualizar').value;
    data.nombre = document.getElementById('nombreRestauranteActualizar').value;
    data.descripcion = document.getElementById('descripcionRestauranteActualizar').value;
    data.categoria = document.getElementById('categoriaRestauranteActualizar').value;
    data.calle = document.getElementById('calleActualizar').value;
    data.ciudad = document.getElementById('ciudadActualizar').value;
    data.telefono = document.getElementById('telefonoActualizar').value;
    data.longitud = parseFloat(document.getElementById('longitudActualizar').value);
    data.latitud = parseFloat(document.getElementById('latitudActualizar').value);
    data.fechaRegistro = document.getElementById('fechaRegistroActualizar').value;

  } else if (coleccion === 'Articulos_Menu') {
    idActualizar = document.getElementById('idArticuloActualizar').value;
    data.nombre = document.getElementById('nombreArticuloActualizar').value;
    data.precio = document.getElementById('precioActualizar').value;
    data.descripcion = document.getElementById('descripcionArticuloActualizar').value;
    data.categoria = document.getElementById('categoriaArticuloActualizar').value;
    data.restauranteId = document.getElementById('restauranteIdActualizar').value;
    data.disponibilidad = document.getElementById('disponibilidadActualizar').checked;

  } else if (coleccion === 'Ordenes') {
    idActualizar = document.getElementById('idOrdenActualizar').value;
    data.usuarioId = document.getElementById('usuarioIdOrdenActualizar').value;
    data.restauranteId = document.getElementById('restauranteIdOrdenActualizar').value;
    try {
      data.items = JSON.parse(document.getElementById('itemsOrdenActualizar').value);
    } catch (err) {
      return alert("Items debe ser un arreglo JSON válido, por ejemplo: [\"id1\", \"id2\"]");
    }
    data.total = document.getElementById('totalOrdenActualizar').value;

  } else if (coleccion === 'Resenas') {
    idActualizar = document.getElementById('idResenaActualizar').value;
    data.usuarioIdResena = document.getElementById('usuarioIdResenaActualizar').value;
    data.restauranteIdResena = document.getElementById('restauranteIdResenaActualizar').value;
    data.contenido = document.getElementById('contenidoResenaActualizar').value;
    data.calificacion = document.getElementById('calificacionResenaActualizar').value;
  }

  // Verificar que exista un ID
  if (!idActualizar) {
    return alert('Debes indicar un ID válido para actualizar.');
  }

  // Realizar petición PUT
  try {
    const response = await fetch(`${apiUrl}/${coleccion.toLowerCase()}/${idActualizar}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    alert(result.message);
    console.log(result);
  } catch (error) {
    console.error(error);
    alert('Ocurrió un error al actualizar. Revisa la consola para más detalles.');
  }
});




// Eliminar elementos
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


document.getElementById('mostrarResenasForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nombreRestaurante = document.getElementById('nombreRestaurante').value;
    const orden = document.getElementById('orden').value;

    const response = await fetch(`/api/resenas_restaurante?nombre=${encodeURIComponent(nombreRestaurante)}&orden=${orden}`);
    const data = await response.json();

    const resultadoDiv = document.getElementById('resultadoResenas');
    resultadoDiv.innerHTML = '';

    if (data.message) {
        resultadoDiv.textContent = data.message;
    } else {
        data.reseñas.forEach(resena => {
            const p = document.createElement('p');
            const fecha = resena.fechaResena ? new Date(resena.fechaResena).toLocaleDateString() : 'sin fecha';
            p.textContent = `⭐ ${resena.calificacion} - ${resena.comentario || 'Sin comentario'} (📅 ${fecha})`;
            resultadoDiv.appendChild(p);
        });
    }
});

document.getElementById('mostrarResenasPorFechaForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nombreRestauranteFecha = document.getElementById('nombreRestauranteFecha').value;
    const ordenFecha = document.getElementById('ordenFecha').value;

    const response = await fetch(`/api/resenas_restaurante_fecha?nombre=${encodeURIComponent(nombreRestauranteFecha)}&orden=${ordenFecha}`);
    const data = await response.json();

    const resultadoDiv = document.getElementById('resultadoResenasPorFecha');
    resultadoDiv.innerHTML = '';

    if (data.message) {
        resultadoDiv.textContent = data.message;
    } else {
        data.reseñas.forEach(resena => {
            const p = document.createElement('p');
            const fecha = resena.fechaResena ? new Date(resena.fechaResena).toLocaleDateString() : 'sin fecha';
            p.textContent = `⭐ ${resena.calificacion} - ${resena.comentario || 'Sin comentario'} (📅 ${fecha})`;
            resultadoDiv.appendChild(p);
        });
    }
});

document.getElementById('mostrarOrdenesForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nombreRestauranteOrdenes = document.getElementById('nombreRestauranteOrdenes').value;
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;
    const estadoOrden = document.getElementById('estadoOrden').value;

    const response = await fetch(`/api/ordenes_restaurante?nombre=${encodeURIComponent(nombreRestauranteOrdenes)}&fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}&estado=${estadoOrden}`);
    const data = await response.json();

    const resultadoDiv = document.getElementById('resultadoOrdenes');
    resultadoDiv.innerHTML = '';

    if (data.message) {
        resultadoDiv.textContent = data.message;
    } else {
        data.ordenes.forEach(orden => {
            const ordenDiv = document.createElement('div');
            ordenDiv.classList.add('orden'); // Añadir clase 'orden' para el estilo visual

            const encabezado = document.createElement('h3');
            encabezado.textContent = `Usuario: ${orden.nombreUsuario}, Correo: ${orden.correoUsuario}, Fecha: ${orden.fechaOrden}, Total: ${orden.MontoTotal}`;
            ordenDiv.appendChild(encabezado);

            orden.articulos.forEach(articulo => {
                const articuloDiv = document.createElement('p');
                articuloDiv.classList.add('articulo'); // Añadir clase 'articulo' para mayor separación
                articuloDiv.textContent = `Artículo: ${articulo.nombreArticulo} (Variante ${articulo.variante || 'N/A'}), Precio: ${articulo.precio}`;
                ordenDiv.appendChild(articuloDiv);
            });

            // Añadir una línea divisoria visual (esto crea la separación)
            const linea = document.createElement('hr');
            ordenDiv.appendChild(linea);

            // Añadir la orden completa al contenedor
            resultadoDiv.appendChild(ordenDiv);
        });
    }
});

document.getElementById('mostrarGraficoForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nombreRestauranteGrafico = document.getElementById('nombreRestauranteGrafico').value;
    const fechaInicioGrafico = document.getElementById('fechaInicioGrafico').value;
    const fechaFinGrafico = document.getElementById('fechaFinGrafico').value;
    const estadoGrafico = document.getElementById('estadoGrafico').value;

    // Hacer la solicitud para obtener los datos de las órdenes y graficar
    const response = await fetch(`/api/grafico_platos?nombre=${encodeURIComponent(nombreRestauranteGrafico)}&fecha_inicio=${fechaInicioGrafico}&fecha_fin=${fechaFinGrafico}&estado=${estadoGrafico}`);
    const data = await response.json();

    if (data.message) {
        alert(data.message); // Si hay un error, mostrarlo
    } else {
        // Crear el gráfico en el frontend usando los datos obtenidos
        const graficoContainer = document.getElementById('graficoContainer');
        graficoContainer.innerHTML = '';  // Limpiar cualquier gráfico previo

        // Crear la imagen base64 del gráfico y mostrarla en el contenedor
        const img = document.createElement('img');
        img.src = `data:image/png;base64,${data.grafico_base64}`;
        graficoContainer.appendChild(img);
    }
});

document.getElementById('generarGraficoBtn').addEventListener('click', async function () {
    const response = await fetch('/api/grafico_restaurantes');
    const data = await response.json();

    if (data.message) {
        alert(data.message); // Si hay un error, mostrarlo
    } else {
        // Crear el gráfico en el frontend usando los datos obtenidos
        const graficoContainer = document.getElementById('graficoRestaurantesContainer');
        graficoContainer.innerHTML = '';  // Limpiar cualquier gráfico previo

        // Crear la imagen base64 del gráfico y mostrarla en el contenedor
        const img = document.createElement('img');
        img.src = `data:image/png;base64,${data.grafico_base64}`;
        graficoContainer.appendChild(img);
    }
});








