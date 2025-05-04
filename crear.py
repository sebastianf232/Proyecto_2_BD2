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

        # Crear el objeto JSON
        usuario = {
            "nombre": nombre,
            "correo": correo,
            "direccion": direccion,
            "telefono": telefono
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
        nombre_restaurante = request.json.get("nombreRestaurante")
        descripcion = request.json.get("descripcion")
        categoria = request.json.get("categoria")

        # Crear el objeto JSON para el restaurante
        restaurante = {
            "nombreRestaurante": nombre_restaurante,
            "descripcion": descripcion,
            "categoria": categoria
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
        nombre_articulo = request.json.get("nombreArticulo")
        precio = request.json.get("precio")
        descripcion = request.json.get("descripcionArticulo")

        # Crear el objeto JSON para el artículo de menú
        articulo = {
            "nombreArticulo": nombre_articulo,
            "precio": precio,
            "descripcionArticulo": descripcion
        }

        # Insertar el artículo de menú en la colección 'articulos_menu'
        result = db.Articulos_Menu.insert_one(articulo)

        # Responder con un mensaje de éxito
        return jsonify({"message": f"Artículo de menú creado con éxito, ID: {str(result.inserted_id)}"}), 201
    except Exception as e:
        # Manejo de errores
        return jsonify({"message": f"Error al crear el artículo de menú: {str(e)}"}), 500


# Crear una orden (Pedir campos por separado)
def crear_orden(request, db):
    try:
        # Pedir los campos por separado
        usuario_id = request.json.get("usuarioId")
        restaurante_id = request.json.get("restauranteId")
        items = request.json.get("items")
        total = request.json.get("total")

        # Crear el objeto JSON para la orden
        orden = {
            "usuarioId": usuario_id,
            "restauranteId": restaurante_id,
            "items": items,
            "total": total
        }

        # Insertar la orden en la colección 'ordenes'
        result = db.Ordenes.insert_one(orden)

        # Responder con un mensaje de éxito
        return jsonify({"message": f"Orden creada con éxito, ID: {str(result.inserted_id)}"}), 201
    except Exception as e:
        # Manejo de errores
        return jsonify({"message": f"Error al crear la orden: {str(e)}"}), 500


# Crear una reseña (Pedir campos por separado)
def crear_resena(request, db):
    try:
        # Pedir los campos por separado
        usuario_id_resena = request.json.get("usuarioIdResena")
        restaurante_id_resena = request.json.get("restauranteIdResena")
        contenido = request.json.get("contenido")
        calificacion = request.json.get("calificacion")

        # Crear el objeto JSON para la reseña
        resena = {
            "usuarioIdResena": usuario_id_resena,
            "restauranteIdResena": restaurante_id_resena,
            "contenido": contenido,
            "calificacion": calificacion
        }

        # Insertar la reseña en la colección 'resenas'
        result = db.Resenas.insert_one(resena)

        # Responder con un mensaje de éxito
        return jsonify({"message": f"Reseña creada con éxito, ID: {str(result.inserted_id)}"}), 201
    except Exception as e:
        # Manejo de errores
        return jsonify({"message": f"Error al crear la reseña: {str(e)}"}), 500
