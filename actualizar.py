from flask import jsonify, request
from pymongo import MongoClient
from bson import ObjectId

# Conexión a MongoDB
def connect_to_mongo():
    mongo_uri = 'mongodb+srv://dia21066:CMSOw7YTLnPTsdEp@cluster0.a4fng.mongodb.net/?retryWrites=true&w=majority'
    client = MongoClient(mongo_uri)
    db = client['Proyecto_2']  # Reemplaza con el nombre de tu base de datos
    return db

# Función para actualizar un usuario
def actualizar_usuario(request, db):
    try:
        # Obtener el ID del usuario y los nuevos datos
        usuario_id = request.view_args['id']  # Obtenemos el ID de la URL
        data = request.get_json()  # Obtenemos los datos a actualizar

        # Verificar si el ID es válido
        if not ObjectId.is_valid(usuario_id):
            return jsonify({"message": "ID de usuario no válido"}), 400

        # Actualizar el documento en la colección 'usuarios'
        result = db.Usuarios.update_one(
            {"_id": ObjectId(usuario_id)},  # Filtro: buscar el documento por ID
            {"$set": data}  # Actualizar los campos con los nuevos valores
        )

        if result.modified_count == 0:
            return jsonify({"message": "No se encontró el usuario o no se realizaron cambios"}), 404

        return jsonify({"message": "Usuario actualizado con éxito"}), 200

    except Exception as e:
        return jsonify({"message": f"Error al actualizar el usuario: {str(e)}"}), 500


# Función para actualizar un restaurante
def actualizar_restaurante(request, db):
    try:
        # Obtener el ID del restaurante y los nuevos datos
        restaurante_id = request.view_args['id']  # Obtenemos el ID de la URL
        data = request.get_json()  # Obtenemos los datos a actualizar

        # Verificar si el ID es válido
        if not ObjectId.is_valid(restaurante_id):
            return jsonify({"message": "ID de restaurante no válido"}), 400

        # Actualizar el documento en la colección 'restaurantes'
        result = db.Restaurantes.update_one(
            {"_id": ObjectId(restaurante_id)},  # Filtro: buscar el documento por ID
            {"$set": data}  # Actualizar los campos con los nuevos valores
        )

        if result.modified_count == 0:
            return jsonify({"message": "No se encontró el restaurante o no se realizaron cambios"}), 404

        return jsonify({"message": "Restaurante actualizado con éxito"}), 200

    except Exception as e:
        return jsonify({"message": f"Error al actualizar el restaurante: {str(e)}"}), 500


# Función para actualizar un artículo de menú
def actualizar_articulo_de_menu(request, db):
    try:
        # Obtener el ID del artículo de menú y los nuevos datos
        articulo_id = request.view_args['id']  # Obtenemos el ID de la URL
        data = request.get_json()  # Obtenemos los datos a actualizar

        # Verificar si el ID es válido
        if not ObjectId.is_valid(articulo_id):
            return jsonify({"message": "ID de artículo de menú no válido"}), 400

        # Actualizar el documento en la colección 'articulos_menu'
        result = db.Articulos_Menu.update_one(
            {"_id": ObjectId(articulo_id)},  # Filtro: buscar el documento por ID
            {"$set": data}  # Actualizar los campos con los nuevos valores
        )

        if result.modified_count == 0:
            return jsonify({"message": "No se encontró el artículo de menú o no se realizaron cambios"}), 404

        return jsonify({"message": "Artículo de menú actualizado con éxito"}), 200

    except Exception as e:
        return jsonify({"message": f"Error al actualizar el artículo de menú: {str(e)}"}), 500


# Función para actualizar una orden
def actualizar_orden(request, db):
    try:
        # Obtener el ID de la orden y los nuevos datos
        orden_id = request.view_args['id']  # Obtenemos el ID de la URL
        data = request.get_json()  # Obtenemos los datos a actualizar

        # Verificar si el ID es válido
        if not ObjectId.is_valid(orden_id):
            return jsonify({"message": "ID de orden no válido"}), 400

        # Actualizar el documento en la colección 'ordenes'
        result = db.Ordenes.update_one(
            {"_id": ObjectId(orden_id)},  # Filtro: buscar el documento por ID
            {"$set": data}  # Actualizar los campos con los nuevos valores
        )

        if result.modified_count == 0:
            return jsonify({"message": "No se encontró la orden o no se realizaron cambios"}), 404

        return jsonify({"message": "Orden actualizada con éxito"}), 200

    except Exception as e:
        return jsonify({"message": f"Error al actualizar la orden: {str(e)}"}), 500


# Función para actualizar una reseña
def actualizar_resena(request, db):
    try:
        # Obtener el ID de la reseña y los nuevos datos
        resena_id = request.view_args['id']  # Obtenemos el ID de la URL
        data = request.get_json()  # Obtenemos los datos a actualizar

        # Verificar si el ID es válido
        if not ObjectId.is_valid(resena_id):
            return jsonify({"message": "ID de reseña no válido"}), 400

        # Actualizar el documento en la colección 'resenas'
        result = db.Resenas.update_one(
            {"_id": ObjectId(resena_id)},  # Filtro: buscar el documento por ID
            {"$set": data}  # Actualizar los campos con los nuevos valores
        )

        if result.modified_count == 0:
            return jsonify({"message": "No se encontró la reseña o no se realizaron cambios"}), 404

        return jsonify({"message": "Reseña actualizada con éxito"}), 200

    except Exception as e:
        return jsonify({"message": f"Error al actualizar la reseña: {str(e)}"}), 500
