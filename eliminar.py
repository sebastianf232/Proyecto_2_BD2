from flask import jsonify, request
from pymongo import MongoClient
from bson import ObjectId

# Conexión a MongoDB
def connect_to_mongo():
    mongo_uri = 'mongodb+srv://dia21066:CMSOw7YTLnPTsdEp@cluster0.a4fng.mongodb.net/?retryWrites=true&w=majority'
    client = MongoClient(mongo_uri)
    db = client['Proyecto_2']  # Reemplaza con el nombre de tu base de datos
    return db

# Función para eliminar un usuario
def eliminar_usuario(request, db):
    try:
        # Obtener el ID del usuario desde la URL
        usuario_id = request.view_args['id']  # Obtenemos el ID de la URL

        # Verificar si el ID es válido
        if not ObjectId.is_valid(usuario_id):
            return jsonify({"message": "ID de usuario no válido"}), 400

        # Eliminar el documento de la colección 'usuarios'
        result = db.Usuarios.delete_one({"_id": ObjectId(usuario_id)})

        if result.deleted_count == 0:
            return jsonify({"message": "No se encontró el usuario para eliminar"}), 404

        return jsonify({"message": "Usuario eliminado con éxito"}), 200

    except Exception as e:
        return jsonify({"message": f"Error al eliminar el usuario: {str(e)}"}), 500


# Función para eliminar un restaurante
def eliminar_restaurante(request, db):
    try:
        # Obtener el ID del restaurante desde la URL
        restaurante_id = request.view_args['id']  # Obtenemos el ID de la URL

        # Verificar si el ID es válido
        if not ObjectId.is_valid(restaurante_id):
            return jsonify({"message": "ID de restaurante no válido"}), 400

        # Eliminar el documento de la colección 'restaurantes'
        result = db.Restaurantes.delete_one({"_id": ObjectId(restaurante_id)})

        if result.deleted_count == 0:
            return jsonify({"message": "No se encontró el restaurante para eliminar"}), 404

        return jsonify({"message": "Restaurante eliminado con éxito"}), 200

    except Exception as e:
        return jsonify({"message": f"Error al eliminar el restaurante: {str(e)}"}), 500


# Función para eliminar un artículo de menú
def eliminar_articulo_de_menu(request, db):
    try:
        # Obtener el ID del artículo de menú desde la URL
        articulo_id = request.view_args['id']  # Obtenemos el ID de la URL

        # Verificar si el ID es válido
        if not ObjectId.is_valid(articulo_id):
            return jsonify({"message": "ID de artículo de menú no válido"}), 400

        # Eliminar el documento de la colección 'articulos_menu'
        result = db.Articulos_Menu.delete_one({"_id": ObjectId(articulo_id)})

        if result.deleted_count == 0:
            return jsonify({"message": "No se encontró el artículo de menú para eliminar"}), 404

        return jsonify({"message": "Artículo de menú eliminado con éxito"}), 200

    except Exception as e:
        return jsonify({"message": f"Error al eliminar el artículo de menú: {str(e)}"}), 500


# Función para eliminar una orden
def eliminar_orden(request, db):
    try:
        # Obtener el ID de la orden desde la URL
        orden_id = request.view_args['id']  # Obtenemos el ID de la URL

        # Verificar si el ID es válido
        if not ObjectId.is_valid(orden_id):
            return jsonify({"message": "ID de orden no válido"}), 400

        # Eliminar el documento de la colección 'ordenes'
        result = db.Ordenes.delete_one({"_id": ObjectId(orden_id)})

        if result.deleted_count == 0:
            return jsonify({"message": "No se encontró la orden para eliminar"}), 404

        return jsonify({"message": "Orden eliminada con éxito"}), 200

    except Exception as e:
        return jsonify({"message": f"Error al eliminar la orden: {str(e)}"}), 500


# Función para eliminar una reseña
def eliminar_resena(request, db):
    try:
        # Obtener el ID de la reseña desde la URL
        resena_id = request.view_args['id']  # Obtenemos el ID de la URL

        # Verificar si el ID es válido
        if not ObjectId.is_valid(resena_id):
            return jsonify({"message": "ID de reseña no válido"}), 400

        # Eliminar el documento de la colección 'resenas'
        result = db.Resenas.delete_one({"_id": ObjectId(resena_id)})

        if result.deleted_count == 0:
            return jsonify({"message": "No se encontró la reseña para eliminar"}), 404

        return jsonify({"message": "Reseña eliminada con éxito"}), 200

    except Exception as e:
        return jsonify({"message": f"Error al eliminar la reseña: {str(e)}"}), 500
