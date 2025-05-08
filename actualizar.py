from flask import jsonify, request
from pymongo import MongoClient
from bson import ObjectId

# Conexión a MongoDB
def connect_to_mongo():
    mongo_uri = 'mongodb+srv://dia21066:CMSOw7YTLnPTsdEp@cluster0.a4fng.mongodb.net/?retryWrites=true&w=majority'
    client = MongoClient(mongo_uri)
    db = client['Proyecto_2'] 
    return db

def _filtrar_campos(data):
    return {
        key: value
        for key, value in data.items()
        if value is not None and not (isinstance(value, str) and value.strip() == "")
    }


def _armar_filtro(id_str):
    # Si es hex válido, considerar ObjectId y string
    if ObjectId.is_valid(id_str):
        return {"$or": [{"_id": ObjectId(id_str)}, {"_id": id_str}]}
    return {"_id": id_str}


def actualizar_usuario(request, db):
    try:
        id_str = request.view_args['id']
        filtro = _armar_filtro(id_str)
        data = request.get_json() or {}
        update_data = _filtrar_campos(data)
        if not update_data:
            return jsonify({"message": "Sin campos para actualizar"}), 400

        result = db.Usuarios.update_one(filtro, {"$set": update_data})
        if result.matched_count == 0:
            return jsonify({"message": "Usuario no encontrado"}), 404
        if result.modified_count == 0:
            return jsonify({"message": "No se encontraron cambios para actualizar"}), 200
        return jsonify({"message": "Usuario actualizado con éxito"}), 200

    except Exception as e:
        return jsonify({"message": f"Error al actualizar el usuario: {str(e)}"}), 500


def actualizar_restaurante(request, db):
    try:
        id_str = request.view_args['id']
        filtro = _armar_filtro(id_str)
        data = request.get_json() or {}
        campos = _filtrar_campos(data)
        set_data = {}

        # Dirección anidada
        if "calle" in campos:
            set_data["direccion.calle"] = campos.pop("calle")
        if "ciudad" in campos:
            set_data["direccion.ciudad"] = campos.pop("ciudad")
        # Coordenadas
        lon = campos.pop("longitud", None)
        lat = campos.pop("latitud", None)
        if lon is not None and lat is not None:
            set_data["ubicacion.coordinates"] = [lon, lat]
        # Resto campos planos
        for k, v in campos.items():
            set_data[k] = v

        if not set_data:
            return jsonify({"message": "Sin campos para actualizar"}), 400

        result = db.Restaurantes.update_one(filtro, {"$set": set_data})
        if result.matched_count == 0:
            return jsonify({"message": "Restaurante no encontrado"}), 404
        if result.modified_count == 0:
            return jsonify({"message": "No se encontraron cambios para actualizar"}), 200
        return jsonify({"message": "Restaurante actualizado con éxito"}), 200

    except Exception as e:
        return jsonify({"message": f"Error al actualizar el restaurante: {str(e)}"}), 500


def actualizar_resena(request, db):
    try:
        id_str = request.view_args['id']
        filtro = _armar_filtro(id_str)
        data = request.get_json() or {}
        campos = _filtrar_campos(data)
        # Mapear claves de relación
        if "usuarioIdResena" in campos:
            campos["usuarioId"] = campos.pop("usuarioIdResena")
        if "restauranteIdResena" in campos:
            campos["restauranteId"] = campos.pop("restauranteIdResena")
        if not campos:
            return jsonify({"message": "Sin campos para actualizar"}), 400

        result = db.Resenas.update_one(filtro, {"$set": campos})
        if result.matched_count == 0:
            return jsonify({"message": "Reseña no encontrada"}), 404
        if result.modified_count == 0:
            return jsonify({"message": "No se encontraron cambios para actualizar"}), 200
        return jsonify({"message": "Reseña actualizada con éxito"}), 200

    except Exception as e:
        return jsonify({"message": f"Error al actualizar la reseña: {str(e)}"}), 500


def actualizar_articulo_de_menu(request, db):
    try:
        id_str = request.view_args['id']
        filtro = _armar_filtro(id_str)
        data = request.get_json() or {}
        update_data = _filtrar_campos(data)
        if not update_data:
            return jsonify({"message": "Sin campos para actualizar"}), 400

        result = db.Articulos_Menu.update_one(filtro, {"$set": update_data})
        if result.matched_count == 0:
            return jsonify({"message": "Artículo no encontrado"}), 404
        if result.modified_count == 0:
            return jsonify({"message": "No se encontraron cambios para actualizar"}), 200
        return jsonify({"message": "Artículo de menú actualizado con éxito"}), 200

    except Exception as e:
        return jsonify({"message": f"Error al actualizar el artículo de menú: {str(e)}"}), 500


def actualizar_orden(request, db):
    try:
        id_str = request.view_args['id']
        filtro = _armar_filtro(id_str)
        data = request.get_json() or {}
        campos = _filtrar_campos(data)
        # Mapear y convertir relaciones
        if "usuarioId" in campos:
            campos["usuarioId"] = campos["usuarioId"]
        if "restauranteId" in campos:
            campos["restauranteId"] = campos["restauranteId"]
        if "items" in campos and isinstance(campos["items"], list):
            campos["items"] = campos["items"]
        if not campos:
            return jsonify({"message": "Sin campos para actualizar"}), 400

        result = db.Ordenes.update_one(filtro, {"$set": campos})
        if result.matched_count == 0:
            return jsonify({"message": "Orden no encontrada"}), 404
        if result.modified_count == 0:
            return jsonify({"message": "No se encontraron cambios para actualizar"}), 200
        return jsonify({"message": "Orden actualizada con éxito"}), 200

    except Exception as e:
        return jsonify({"message": f"Error al actualizar la orden: {str(e)}"}), 500
