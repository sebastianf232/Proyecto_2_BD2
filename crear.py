from flask import jsonify, request
from pymongo import MongoClient
from bson import ObjectId

# Conexión a MongoDB
def connect_to_mongo():
    mongo_uri = 'mongodb+srv://dia21066:CMSOw7YTLnPTsdEp@cluster0.a4fng.mongodb.net/?retryWrites=true&w=majority'
    client = MongoClient(mongo_uri)
    db = client['Proyecto_2']  # Reemplaza con el nombre de tu base de datos
    return db

# Crear un usuario (Pedir campos por separado)
def crear_usuario(request, db):
    try:
        # Pedir los campos por separado
        nombre = request.json.get("nombre")
        correo = request.json.get("correo")
        direccion = request.json.get("direccion")
        telefono = request.json.get("telefono")
        fecha_registro = request.json.get("fechaRegistro")
        fecha_nacimiento = request.json.get("fechaNacimiento")

        # Crear el objeto JSON
        usuario = {
            "nombre": nombre,
            "correo": correo,
            "direccion": direccion,
            "telefono": telefono,
            "fechaRegistro": fecha_registro,
            "fechaNacimiento": fecha_nacimiento
        }

        # Insertar el nuevo usuario en la colección 'usuarios'
        result = db.Usuarios.insert_one(usuario)

        # Responder con un mensaje de éxito
        return jsonify({"message": f"Usuario creado con éxito, ID: {str(result.inserted_id)}"}), 201
    except Exception as e:
        # Manejo de errores
        return jsonify({"message": f"Error al crear el usuario: {str(e)}"}), 500


# Crear un restaurante (Pedir campos por separado)
def crear_restaurante(request, db):
    try:
        # Pedir los campos por separado
        nombre_restaurante = request.json.get("nombre")
        descripcion = request.json.get("descripcion")
        categoria = request.json.get("categoria")
        calle = request.json.get("calle")
        ciudad = request.json.get("ciudad")
        telefono = request.json.get("telefono")
        longitud = request.json.get("longitud")
        latitud = request.json.get("latitud")
        fecha_registro = request.json.get("fechaRegistro")

        # Validar que no falten campos requeridos
        if not nombre_restaurante or not descripcion or not categoria:
            return jsonify({"message": "Faltan datos obligatorios: nombre, descripcion, categoria"}), 400
        
        if longitud is None or latitud is None:
            return jsonify({"message": "Las coordenadas no pueden ser nulas."}), 400

        # Crear el objeto JSON para el restaurante
        restaurante = {
            "nombre": nombre_restaurante,
            "descripcion": descripcion,
            "categoria": categoria,
            "direccion": {
                "calle": calle,
                "ciudad": ciudad
            },
            "telefono": telefono,
            "ubicacion": {
                "type": "Point",
                "coordinates": [longitud, latitud]  # Usando la longitud y latitud como array de coordenadas
            },
            "fechaRegistro": fecha_registro
        }

        # Insertar el nuevo restaurante en la colección 'restaurantes'
        result = db.Restaurantes.insert_one(restaurante)

        # Responder con un mensaje de éxito
        return jsonify({"message": f"Restaurante creado con éxito, ID: {str(result.inserted_id)}"}), 201
    except Exception as e:
        # Manejo de errores
        return jsonify({"message": f"Error al crear el restaurante: {str(e)}"}), 500


# Crear un artículo de menú (Pedir campos por separado)
def crear_articulo_de_menu(request, db):
    try:
        # Pedir los campos por separado
        nombre_articulo = request.json.get("nombre")
        precio = request.json.get("precio")
        descripcion = request.json.get("descripcion")
        disponible = request.json.get("disponibilidad")
        restaurante_id = request.json.get("restauranteId")
        categoria = request.json.get("categoria")

        # Crear el objeto JSON para el artículo de menú
        articulo = {
            "nombre": nombre_articulo,
            "precio": precio,
            "descripcion": descripcion,
            "disponibilidad": disponible,
            "restauranteId": restaurante_id,
            "categoria": categoria  
        }

        # Insertar el artículo de menú en la colección 'articulos_menu'
        result = db.Articulos_Menu.insert_one(articulo)

        # Responder con un mensaje de éxito
        return jsonify({"message": f"Artículo de menú creado con éxito, ID: {str(result.inserted_id)}"}), 201
    except Exception as e:
        # Manejo de errores
        return jsonify({"message": f"Error al crear el artículo de menú: {str(e)}"}), 500


# Crear una orden 
def crear_orden(request, db):
    try:
        # Pedir los campos por separado
        usuario_id = request.json.get("usuarioId")
        restaurante_id = request.json.get("restauranteId")
        items_ids = request.json.get("items")  # Esto debería ser una lista de ids de artículos
        estado = request.json.get("estado")
        fecha_orden = request.json.get("fechaOrden")

        # Obtener los datos del restaurante
        restaurante = db.Restaurantes.find_one({"_id": restaurante_id})
        if not restaurante:
            return jsonify({"message": "Restaurante no encontrado"}), 404

        # Obtener los datos del usuario
        usuario = db.Usuarios.find_one({"_id": ObjectId(usuario_id)})
        datos = []
        if usuario:
            items = {
                "usuarioId": usuario_id,
                "nombre": usuario.get("nombre"),
                "correo": usuario.get("correo")
            }
            datos.append(items)
        else:
            return jsonify({"message": "Usuario no encontrado"}), 404
        

        # Obtener los artículos y calcular el total
        total = 0
        datos_menu = []
        for item_id in items_ids:
            articulo = db.Articulos_Menu.find_one({"_id": item_id})
            if articulo:
                item = {
                    "articuloId": item_id,
                    "nombreArticulo": articulo.get("nombreArticulo"),
                    "precio": articulo.get("precio")
                }
                datos_menu.append(item)
                total += articulo.get("precio", 0)  # Acumular el precio al total
            else:
                return jsonify({"message": f"Artículo con ID {item_id} no encontrado"}), 404

        # Crear el objeto JSON para la orden
        orden = {
            "datosRestaurante": {
                "restauranteId": restaurante_id,
                "nombreRestaurante": restaurante.get("nombreRestaurante")
                },
            "datosUsuario": {
                "usuarioId": usuario_id,
                "nombreUsuario": usuario.get("nombre"),
                "correoUsuario": usuario.get("correo")
                },
            "datosMenu": datos_menu,
            "estado": estado,
            "fechaOrden": fecha_orden,
            "montoTotal": total
        }

        # Insertar la orden en la base de datos
        db.Ordenes.insert_one(orden)
        return jsonify({"message": "Orden creada con éxito", "orden": orden}), 201
    except Exception as e:
        return jsonify({"message": "Error al crear la orden: " + str(e)}), 500


# Crear una reseña (Pedir campos por separado)
def crear_resena(request, db):
    try:
        # Pedir los campos por separado
        usuario_id_resena = request.json.get("usuarioId")
        restaurante_id_resena = request.json.get("restauranteId")
        comentario = request.json.get("comentario")
        calificacion = request.json.get("calificacion")
        fecha_resena = request.json.get("fechaResena")
        orden_id = request.json.get("ordenId")



        # Crear el objeto JSON para la reseña
        resena = {
            "usuarioId": usuario_id_resena,
            "restauranteId": restaurante_id_resena,
            "comentario": comentario,
            "calificacion": calificacion,
            "fechaResena": fecha_resena,
            "ordenId": orden_id
        }

        # Insertar la reseña en la colección 'resenas'
        result = db.Resenas.insert_one(resena)

        # Responder con un mensaje de éxito
        return jsonify({"message": f"Reseña creada con éxito, ID: {str(result.inserted_id)}"}), 201
    except Exception as e:
        # Manejo de errores
        return jsonify({"message": f"Error al crear la reseña: {str(e)}"}), 500
