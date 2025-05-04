from bson import ObjectId
from flask import jsonify

def consultar_usuarios(request, db):
    try:
        # Aquí procesamos el filtro
        filtro = request.args.get('filtro', '{}')
        proyeccion = request.args.get('proyeccion', '{}')
        skip = int(request.args.get('skip', 0))
        limit = int(request.args.get('limit', 10))
        orden = request.args.get('orden', '')

        # Convertimos el filtro y la proyección de JSON a diccionarios de Python
        filtro = eval(filtro)
        proyeccion = eval(proyeccion)

        # Realizamos la consulta
        usuarios = db.Usuarios.find(filtro, proyeccion).skip(skip).limit(limit).sort(orden)

        # Convertimos los resultados a una lista de diccionarios
        resultado = []
        for usuario in usuarios:
            # Convertimos ObjectId a string para serializar correctamente
            usuario['_id'] = str(usuario['_id'])  # Aquí se convierte el ObjectId a string
            resultado.append(usuario)

        return jsonify(resultado)
    
    except Exception as e:
        return jsonify({"message": f"Error al consultar usuarios: {str(e)}"}), 500


def consultar_restaurantes(request, db):
    try:
        filtro = request.args.get('filtro', '{}')
        proyeccion = request.args.get('proyeccion', '{}')
        skip = int(request.args.get('skip', 0))
        limit = int(request.args.get('limit', 10))
        orden = request.args.get('orden', '')

        filtro = eval(filtro)
        proyeccion = eval(proyeccion)

        restaurantes = db.Restaurantes.find(filtro, proyeccion).skip(skip).limit(limit).sort(orden)

        resultado = []
        for restaurante in restaurantes:
            restaurante['_id'] = str(restaurante['_id'])
            resultado.append(restaurante)

        return jsonify(resultado)

    except Exception as e:
        return jsonify({"message": f"Error al consultar restaurantes: {str(e)}"}), 500


def consultar_articulos_menu(request, db):
    try:
        filtro = request.args.get('filtro', '{}')
        proyeccion = request.args.get('proyeccion', '{}')
        skip = int(request.args.get('skip', 0))
        limit = int(request.args.get('limit', 10))
        orden = request.args.get('orden', '')

        filtro = eval(filtro)
        proyeccion = eval(proyeccion)

        articulos_menu = db.Articulos_Menu.find(filtro, proyeccion).skip(skip).limit(limit).sort(orden)

        resultado = []
        for articulo in articulos_menu:
            articulo['_id'] = str(articulo['_id'])
            resultado.append(articulo)

        return jsonify(resultado)

    except Exception as e:
        return jsonify({"message": f"Error al consultar artículos de menú: {str(e)}"}), 500


def consultar_ordenes(request, db):
    try:
        filtro = request.args.get('filtro', '{}')
        proyeccion = request.args.get('proyeccion', '{}')
        skip = int(request.args.get('skip', 0))
        limit = int(request.args.get('limit', 10))
        orden = request.args.get('orden', '')

        filtro = eval(filtro)
        proyeccion = eval(proyeccion)

        ordenes = db.Ordenes.find(filtro, proyeccion).skip(skip).limit(limit).sort(orden)

        resultado = []
        for orden in ordenes:
            orden['_id'] = str(orden['_id'])
            resultado.append(orden)

        return jsonify(resultado)

    except Exception as e:
        return jsonify({"message": f"Error al consultar órdenes: {str(e)}"}), 500


def consultar_resenas(request, db):
    try:
        filtro = request.args.get('filtro', '{}')
        proyeccion = request.args.get('proyeccion', '{}')
        skip = int(request.args.get('skip', 0))
        limit = int(request.args.get('limit', 10))
        orden = request.args.get('orden', '')

        filtro = eval(filtro)
        proyeccion = eval(proyeccion)

        resenas = db.Resenas.find(filtro, proyeccion).skip(skip).limit(limit).sort(orden)

        resultado = []
        for resena in resenas:
            resena['_id'] = str(resena['_id'])
            resultado.append(resena)

        return jsonify(resultado)

    except Exception as e:
        return jsonify({"message": f"Error al consultar reseñas: {str(e)}"}), 500
