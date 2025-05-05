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
    # Si el ID es un ObjectId, lo devolvemos tal cual
    if ObjectId.is_valid(id_str):
        return ObjectId(id_str)
    # Si no es un ObjectId válido, lo dejamos como string
    return id_str

# Función para actualizar un usuario
def actualizar_usuario(id, request, db):
    try:
        data = request.get_json()  # Obtener los datos a actualizar

        # Verificar si el ID es un ObjectId o un tipo diferente (como string o int)
        if ObjectId.is_valid(id):
            # El id es un ObjectId, entonces lo convertimos a un ObjectId de MongoDB
            id = ObjectId(id)

        # Actualizar el documento en la colección 'usuarios'
        result = db.Usuarios.update_one(
            {"_id": id},  # Usamos el id directamente, que puede ser un ObjectId o un string
            {"$set": data}  # Actualizar los campos con los nuevos valores
        )

        if result.modified_count == 0:
            return jsonify({"message": "No se encontró el usuario o no se realizaron cambios"}), 404

        return jsonify({"message": "Usuario actualizado con éxito"}), 200

    except Exception as e:
        return jsonify({"message": f"Error al actualizar el usuario: {str(e)}"}), 500

# Función para actualizar un restaurante
# Función para actualizar un restaurante
def actualizar_restaurante(request, db):
    try:
        restaurante_id = request.view_args['id']  # Obtenemos el ID de la URL
        data = request.get_json()  # Obtenemos los datos a actualizar

        # Convertir el ID recibido a un ObjectId si es posible
        restaurante_id = convertir_a_objectid(restaurante_id)

        # Crear un diccionario de actualización
        update_data = {}

        # Solo agregar los campos que se pasen en el request
        if 'nombre' in data:
            update_data['nombre'] = data['nombre']
        if 'descripcion' in data:
            update_data['descripcion'] = data['descripcion']
        if 'categoria' in data:
            update_data['categoria'] = data['categoria']
        if 'direccion' in data:
            update_data['direccion'] = data['direccion']
        if 'telefono' in data:
            update_data['telefono'] = data['telefono']
        if 'fechaRegistro' in data:
            update_data['fechaRegistro'] = data['fechaRegistro']
        if 'ubicacion' in data:
            update_data['ubicacion'] = data['ubicacion']

        # Verificar si no hay datos para actualizar
        if not update_data:
            return jsonify({"message": "No se proporcionaron datos para actualizar"}), 400

        # Realizar la actualización
        result = db.Restaurantes.update_one(
            {"_id": restaurante_id},  # Usar el ID convertido
            {"$set": update_data}  # Solo actualizar los campos proporcionados
        )

        if result.modified_count == 0:
            return jsonify({"message": "No se encontró el restaurante o no se realizaron cambios"}), 404

        return jsonify({"message": "Restaurante actualizado con éxito"}), 200

    except Exception as e:
        return jsonify({"message": f"Error al actualizar el restaurante: {str(e)}"}), 500

# Función para actualizar un artículo de menú
def actualizar_articulo_de_menu(id, request, db):
    try:
        data = request.get_json()  # Obtener los datos a actualizar

        # Verificar si el ID es un ObjectId o un tipo diferente (como string o int)
        if ObjectId.is_valid(id):
            # El id es un ObjectId, entonces lo convertimos a un ObjectId de MongoDB
            id = ObjectId(id)

        # Actualizar el documento en la colección 'articulos_menu'
        result = db.Articulos_Menu.update_one(
            {"_id": id},  # Usamos el id directamente, que puede ser un ObjectId o un string
            {"$set": data}  # Actualizar los campos con los nuevos valores
        )

        if result.modified_count == 0:
            return jsonify({"message": "No se encontró el artículo de menú o no se realizaron cambios"}), 404

        return jsonify({"message": "Artículo de menú actualizado con éxito"}), 200

    except Exception as e:
        return jsonify({"message": f"Error al actualizar el artículo de menú: {str(e)}"}), 500

# Función para actualizar una orden
def actualizar_orden(id, request, db):
    try:
        data = request.get_json()  # Obtener los datos a actualizar

        # Verificar si el ID es un ObjectId o un tipo diferente (como string o int)
        if ObjectId.is_valid(id):
            # El id es un ObjectId, entonces lo convertimos a un ObjectId de MongoDB
            id = ObjectId(id)

        # Actualizar el documento en la colección 'ordenes'
        result = db.Ordenes.update_one(
            {"_id": id},  # Usamos el id directamente, que puede ser un ObjectId o un string
            {"$set": data}  # Actualizar los campos con los nuevos valores
        )

        if result.modified_count == 0:
            return jsonify({"message": "No se encontró la orden o no se realizaron cambios"}), 404

        return jsonify({"message": "Orden actualizada con éxito"}), 200

    except Exception as e:
        return jsonify({"message": f"Error al actualizar la orden: {str(e)}"}), 500

# Función para actualizar una reseña
def actualizar_resena(id, request, db):
    try:
        data = request.get_json()  # Obtener los datos a actualizar

        # Verificar si el ID es un ObjectId o un tipo diferente (como string o int)
        if ObjectId.is_valid(id):
            # El id es un ObjectId, entonces lo convertimos a un ObjectId de MongoDB
            id = ObjectId(id)

        # Actualizar el documento en la colección 'resenas'
        result = db.Resenas.update_one(
            {"_id": id},  # Usamos el id directamente, que puede ser un ObjectId o un string
            {"$set": data}  # Actualizar los campos con los nuevos valores
        )

        if result.modified_count == 0:
            return jsonify({"message": "No se encontró la reseña o no se realizaron cambios"}), 404

        return jsonify({"message": "Reseña actualizada con éxito"}), 200

    except Exception as e:
        return jsonify({"message": f"Error al actualizar la reseña: {str(e)}"}), 500