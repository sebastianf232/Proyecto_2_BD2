from flask import jsonify, request
from pymongo import MongoClient
from bson import ObjectId

# Conexión a MongoDB
def connect_to_mongo():
    mongo_uri = 'mongodb+srv://dia21066:CMSOw7YTLnPTsdEp@cluster0.a4fng.mongodb.net/?retryWrites=true&w=majority'
    client = MongoClient(mongo_uri)
    db = client['Proyecto_2']  # Reemplaza con el nombre de tu base de datos
    return db

def _armar_filtro(id_str):
    # Si el ID es un ObjectId válido, probar ambos (ObjectId y string)
    if ObjectId.is_valid(id_str):
        return {"$or": [{"_id": ObjectId(id_str)}, {"_id": id_str}]}
    # Si no, filtrar solo por string
    return {"_id": id_str}


def eliminar_usuario(request, db):
    try:
        id_str = request.view_args['id']
        filtro = _armar_filtro(id_str)
        result = db.Usuarios.delete_one(filtro)
        if result.deleted_count == 0:
            return jsonify({"message": "No se encontró el usuario para eliminar"}), 404
        return jsonify({"message": "Usuario eliminado con éxito"}), 200
    except Exception as e:
        return jsonify({"message": f"Error al eliminar el usuario: {str(e)}"}), 500


def eliminar_restaurante(request, db):
    try:
        id_str = request.view_args['id']
        filtro = _armar_filtro(id_str)
        result = db.Restaurantes.delete_one(filtro)
        if result.deleted_count == 0:
            return jsonify({"message": "No se encontró el restaurante para eliminar"}), 404
        return jsonify({"message": "Restaurante eliminado con éxito"}), 200
    except Exception as e:
        return jsonify({"message": f"Error al eliminar el restaurante: {str(e)}"}), 500


def eliminar_articulo_de_menu(request, db):
    try:
        id_str = request.view_args['id']
        filtro = _armar_filtro(id_str)
        result = db.Articulos_Menu.delete_one(filtro)
        if result.deleted_count == 0:
            return jsonify({"message": "No se encontró el artículo de menú para eliminar"}), 404
        return jsonify({"message": "Artículo de menú eliminado con éxito"}), 200
    except Exception as e:
        return jsonify({"message": f"Error al eliminar el artículo de menú: {str(e)}"}), 500


def eliminar_orden(request, db):
    try:
        id_str = request.view_args['id']
        filtro = _armar_filtro(id_str)
        result = db.Ordenes.delete_one(filtro)
        if result.deleted_count == 0:
            return jsonify({"message": "No se encontró la orden para eliminar"}), 404
        return jsonify({"message": "Orden eliminada con éxito"}), 200
    except Exception as e:
        return jsonify({"message": f"Error al eliminar la orden: {str(e)}"}), 500


def eliminar_resena(request, db):
    try:
        id_str = request.view_args['id']
        filtro = _armar_filtro(id_str)
        result = db.Resenas.delete_one(filtro)
        if result.deleted_count == 0:
            return jsonify({"message": "No se encontró la reseña para eliminar"}), 404
        return jsonify({"message": "Reseña eliminada con éxito"}), 200
    except Exception as e:
        return jsonify({"message": f"Error al eliminar la reseña: {str(e)}"}), 500
