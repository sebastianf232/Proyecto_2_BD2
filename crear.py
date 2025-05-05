from flask import jsonify, request
from pymongo import MongoClient
from bson import ObjectId
import json
from bson import json_util

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



#Crear Orden
def crear_orden(request, db):
    try:
        usuario_id_str = request.json.get("usuarioId")
        restaurante_id_str = request.json.get("restauranteId")
        items_ids_str = request.json.get("items")  # Lista de strings
        estado = request.json.get("estado")
        fecha_orden = request.json.get("fechaOrden")

        # Conversión segura de ID
        try:
            usuario_obj_id = ObjectId(usuario_id_str.strip())
        except Exception:
            usuario_obj_id = None

        try:
            restaurante_obj_id = ObjectId(restaurante_id_str.strip())
        except Exception:
            restaurante_obj_id = None

        # Buscar restaurante
        restaurante = db.Restaurantes.find_one({
            "$or": [
                {"_id": restaurante_obj_id} if restaurante_obj_id else {},
                {"_id": restaurante_id_str}
            ]
        })
        if not restaurante:
            return jsonify({"message": "Restaurante no encontrado"}), 404

        # Buscar usuario
        usuario = db.Usuarios.find_one({
            "$or": [
                {"_id": usuario_obj_id} if usuario_obj_id else {},
                {"_id": usuario_id_str}
            ]
        })
        if not usuario:
            return jsonify({"message": "Usuario no encontrado"}), 404

        # Procesar artículos
        total = 0
        datos_menu = []
        for item_id_str in items_ids_str:
            item_id_str = item_id_str.strip()
            try:
                item_obj_id = ObjectId(item_id_str)
            except Exception:
                item_obj_id = None

            articulo = db.Articulos_Menu.find_one({
                "$or": [
                    {"_id": item_obj_id} if item_obj_id else {},
                    {"_id": item_id_str}
                ]
            })
            if articulo:
                datos_menu.append({
                    "articuloId": str(articulo["_id"]),
                    "nombreArticulo": articulo.get("nombreArticulo"),
                    "precio": articulo.get("precio")
                })
                total += float(articulo.get("precio", 0))
            else:
                return jsonify({"message": f"Artículo con ID {item_id_str} no encontrado"}), 404

        # Crear la orden
        orden = {
            "datosRestaurante": {
                "restauranteId": str(restaurante.get("_id")),
                "nombreRestaurante": restaurante.get("nombre")
            },
            "datosUsuario": {
                "usuarioId": str(usuario.get("_id")),
                "nombreUsuario": usuario.get("nombre"),
                "correoUsuario": usuario.get("correo")
            },
            "datosMenu": datos_menu,
            "estado": estado,
            "fechaOrden": fecha_orden,
            "montoTotal": total
        }

        db.Ordenes.insert_one(orden)
        return jsonify({"message": "Orden creada con éxito", "orden": orden}), 201

    except Exception as e:
        return jsonify({"message": f"Error al crear la orden: {str(e)}"}), 500




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

