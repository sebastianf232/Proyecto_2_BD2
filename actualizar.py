from flask import jsonify, request
from pymongo import MongoClient
from bson import ObjectId

# Conexión a MongoDB
def connect_to_mongo():
    mongo_uri = 'mongodb+srv://dia21066:CMSOw7YTLnPTsdEp@cluster0.a4fng.mongodb.net/?retryWrites=true&w=majority'
    client = MongoClient(mongo_uri)
    db = client['Proyecto_2']  # Reemplaza con el nombre de tu base de datos
    return db

def convertir_a_objectid(id_str):
    if isinstance(id_str, ObjectId):
        return id_str
    if ObjectId.is_valid(id_str):
        return ObjectId(id_str)
    return id_str


def _filtrar_campos(data):
    return {
        key: value
        for key, value in data.items()
        if value is not None and not (isinstance(value, str) and value.strip() == "")
    }


def actualizar_usuario(request, db):
    try:
        usuario_id = convertir_a_objectid(request.view_args['id'])
        data = request.get_json() or {}
        update_data = _filtrar_campos(data)
        if update_data:
            result = db.Usuarios.update_one({"_id": usuario_id}, {"$set": update_data})
            if result.matched_count == 0:
                return jsonify({"message": "Usuario no encontrado"}), 404
            if result.modified_count == 0:
                return jsonify({"message": "No se encontraron cambios para actualizar"}), 200
            return jsonify({"message": "Usuario actualizado con éxito"}), 200
        return jsonify({"message": "Sin campos para actualizar"}), 400
    except Exception as e:
        return jsonify({"message": f"Error al actualizar el usuario: {str(e)}"}), 500


def actualizar_restaurante(request, db):
    try:
        restaurante_id = convertir_a_objectid(request.view_args['id'])
        data = request.get_json() or {}
        update_data = _filtrar_campos(data)
        set_data = {}
        # Campos anidados de dirección
        if "calle" in update_data:
            set_data["direccion.calle"] = update_data.pop("calle")
        if "ciudad" in update_data:
            set_data["direccion.ciudad"] = update_data.pop("ciudad")
        # Coordenadas geoespaciales
        longitud = update_data.pop("longitud", None)
        latitud = update_data.pop("latitud", None)
        if longitud is not None and latitud is not None:
            set_data["ubicacion.coordinates"] = [longitud, latitud]
        # Restantes campos
        for key, value in update_data.items():
            set_data[key] = value
        if set_data:
            result = db.Restaurantes.update_one({"_id": restaurante_id}, {"$set": set_data})
            if result.matched_count == 0:
                return jsonify({"message": "Restaurante no encontrado"}), 404
            if result.modified_count == 0:
                return jsonify({"message": "No se encontraron cambios para actualizar"}), 200
            return jsonify({"message": "Restaurante actualizado con éxito"}), 200
        return jsonify({"message": "Sin campos para actualizar"}), 400
    except Exception as e:
        return jsonify({"message": f"Error al actualizar el restaurante: {str(e)}"}), 500


def actualizar_resena(request, db):
    try:
        resena_id = convertir_a_objectid(request.view_args['id'])
        data = request.get_json() or {}
        update_data = _filtrar_campos(data)
        # Mapear campos de reseña
        if "usuarioIdResena" in update_data:
            update_data["usuarioId"] = convertir_a_objectid(update_data.pop("usuarioIdResena"))
        if "restauranteIdResena" in update_data:
            update_data["restauranteId"] = convertir_a_objectid(update_data.pop("restauranteIdResena"))
        if update_data:
            result = db.Resenas.update_one({"_id": resena_id}, {"$set": update_data})
            if result.matched_count == 0:
                return jsonify({"message": "Reseña no encontrada"}), 404
            if result.modified_count == 0:
                return jsonify({"message": "No se encontraron cambios para actualizar"}), 200
            return jsonify({"message": "Reseña actualizada con éxito"}), 200
        return jsonify({"message": "Sin campos para actualizar"}), 400
    except Exception as e:
        return jsonify({"message": f"Error al actualizar la reseña: {str(e)}"}), 500


def actualizar_articulo_de_menu(request, db):
    try:
        articulo_id = convertir_a_objectid(request.view_args['id'])
        data = request.get_json() or {}
        update_data = _filtrar_campos(data)
        if update_data:
            result = db.Articulos_Menu.update_one({"_id": articulo_id}, {"$set": update_data})
            if result.matched_count == 0:
                return jsonify({"message": "Artículo no encontrado"}), 404
            if result.modified_count == 0:
                return jsonify({"message": "No se encontraron cambios para actualizar"}), 200
            return jsonify({"message": "Artículo de menú actualizado con éxito"}), 200
        return jsonify({"message": "Sin campos para actualizar"}), 400
    except Exception as e:
        return jsonify({"message": f"Error al actualizar el artículo de menú: {str(e)}"}), 500


def actualizar_orden(request, db):
    try:
        orden_id = convertir_a_objectid(request.view_args['id'])
        data = request.get_json() or {}
        update_data = _filtrar_campos(data)
        # Convertir IDs relacionados
        if "usuarioId" in update_data:
            update_data["usuarioId"] = convertir_a_objectid(update_data["usuarioId"])
        if "restauranteId" in update_data:
            update_data["restauranteId"] = convertir_a_objectid(update_data["restauranteId"])
        # Normalizar items
        if "items" in update_data and isinstance(update_data["items"], list):
            update_data["items"] = [
                convertir_a_objectid(item) for item in update_data["items"]
            ]
        if update_data:
            result = db.Ordenes.update_one({"_id": orden_id}, {"$set": update_data})
            if result.matched_count == 0:
                return jsonify({"message": "Orden no encontrada"}), 404
            if result.modified_count == 0:
                return jsonify({"message": "No se encontraron cambios para actualizar"}), 200
            return jsonify({"message": "Orden actualizada con éxito"}), 200
        return jsonify({"message": "Sin campos para actualizar"}), 400
    except Exception as e:
        return jsonify({"message": f"Error al actualizar la orden: {str(e)}"}), 500
