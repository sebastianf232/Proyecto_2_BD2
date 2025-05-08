from flask import Flask, render_template, request, jsonify,send_file
import base64
from io import BytesIO
import matplotlib.pyplot as plt
from pymongo import MongoClient
from crear import crear_usuario, crear_restaurante, crear_articulo_de_menu, crear_orden, crear_resena
from consultar import consultar_usuarios, consultar_restaurantes, consultar_articulos_menu, consultar_ordenes, consultar_resenas
from actualizar import actualizar_usuario, actualizar_restaurante, actualizar_articulo_de_menu, actualizar_orden, actualizar_resena
from eliminar import eliminar_usuario, eliminar_restaurante, eliminar_articulo_de_menu, eliminar_orden, eliminar_resena

from MostrarResenasYOrdenes import clasificar_resenas_calificacion_ordenado,clasificar_resenas_por_fecha_desc,obtener_ordenes,obtener_ordenes_grafico, graficar_platos,top_restaurantes_por_puntuacion_y_ordenes, graficar_promedio_y_ordenes_separadas
import json
from bson import json_util


app = Flask(__name__)

# Conexión a MongoDB
mongo_uri = 'mongodb+srv://dia21066:CMSOw7YTLnPTsdEp@cluster0.a4fng.mongodb.net/?retryWrites=true&w=majority'
client = MongoClient(mongo_uri, tlsAllowInvalidCertificates=True)
db = client['Proyecto_2']  # Reemplaza con el nombre de tu base de datos

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/usuarios', methods=['POST'])
def post_usuario():
    return crear_usuario(request, db)

@app.route('/api/restaurantes', methods=['POST'])
def post_restaurante():
    return crear_restaurante(request, db)

@app.route('/api/articulos_menu', methods=['POST'])
def post_articulo_de_menu():
    return crear_articulo_de_menu(request, db)

@app.route('/api/ordenes', methods=['POST'])
def post_orden():
    return crear_orden(request, db)

@app.route('/api/resenas', methods=['POST'])
def post_resena():
    return crear_resena(request, db)

@app.route('/api/usuarios', methods=['GET'])
def get_usuarios():
    return consultar_usuarios(request, db)

@app.route('/api/restaurantes', methods=['GET'])
def get_restaurantes():
    return consultar_restaurantes(request, db)

@app.route('/api/articulos_menu', methods=['GET'])
def get_articulos_menu():
    return consultar_articulos_menu(request, db)

@app.route('/api/ordenes', methods=['GET'])
def get_ordenes():
    return consultar_ordenes(request, db)

@app.route('/api/resenas', methods=['GET'])
def get_resenas():
    return consultar_resenas(request, db)

@app.route('/api/usuarios/<id>', methods=['PUT'])
def put_usuario(id):
    app.logger.debug(f"Actualizando usuario con ID: {id}")
    return actualizar_usuario(request, db)

@app.route('/api/restaurantes/<id>', methods=['PUT'])
def put_restaurante(id):
    return actualizar_restaurante(request, db)

@app.route('/api/articulos_menu/<id>', methods=['PUT'])
def put_articulo_de_menu(id):
    return actualizar_articulo_de_menu(request, db)

@app.route('/api/ordenes/<id>', methods=['PUT'])
def put_orden(id):
    return actualizar_orden(request, db)

@app.route('/api/resenas/<id>', methods=['PUT'])
def put_resena(id):
    return actualizar_resena(request, db)

@app.route('/api/usuarios/<id>', methods=['DELETE'])
def delete_usuario(id):
    app.logger.debug(f"DELETE /api/usuarios/{id}")
    return eliminar_usuario(request, db)

@app.route('/api/restaurantes/<id>', methods=['DELETE'])
def delete_restaurante(id):
    app.logger.debug(f"DELETE /api/restaurantes/{id}")
    return eliminar_restaurante(request, db)

@app.route('/api/articulos_menu/<id>', methods=['DELETE'])
def delete_articulo(id):
    app.logger.debug(f"DELETE /api/articulos_menu/{id}")
    return eliminar_articulo_de_menu(request, db)

@app.route('/api/ordenes/<id>', methods=['DELETE'])
def delete_orden(id):
    app.logger.debug(f"DELETE /api/ordenes/{id}")
    return eliminar_orden(request, db)

@app.route('/api/resenas/<id>', methods=['DELETE'])
def delete_resena(id):
    app.logger.debug(f"DELETE /api/resenas/{id}")
    return eliminar_resena(request, db)

@app.route('/api/resenas_restaurante')
def obtener_resenas_restaurante():
    nombre = request.args.get('nombre')
    orden = request.args.get('orden', 'desc')

    if not nombre:
        return jsonify({"message": "Debes proporcionar el nombre del restaurante"}), 400

    resultado = clasificar_resenas_calificacion_ordenado(db, nombre, orden)

    if isinstance(resultado, str):  # mensaje de error
        return jsonify({"message": resultado}), 404

    resultado_json = json.loads(json_util.dumps(resultado))
    return jsonify({"reseñas": resultado_json})

from MostrarResenasYOrdenes import clasificar_resenas_por_fecha_desc

@app.route('/api/resenas_restaurante_fecha')
def obtener_resenas_restaurante_por_fecha():
    nombre = request.args.get('nombre')
    orden = request.args.get('orden', 'desc')

    if not nombre:
        return jsonify({"message": "Debes proporcionar el nombre del restaurante"}), 400

    resultado = clasificar_resenas_por_fecha_desc(db, nombre, orden)

    if isinstance(resultado, str):  # mensaje de error
        return jsonify({"message": resultado}), 404

    resultado_json = json.loads(json_util.dumps(resultado))
    return jsonify({"reseñas": resultado_json})


@app.route('/api/ordenes_restaurante')
def obtener_ordenes_restaurante():
    nombre = request.args.get('nombre')
    fecha_inicio = request.args.get('fecha_inicio')
    fecha_fin = request.args.get('fecha_fin')
    estado = request.args.get('estado')

    if not nombre or not fecha_inicio or not fecha_fin or not estado:
        return jsonify({"message": "Debes proporcionar todos los parámetros (nombre, fecha_inicio, fecha_fin, estado)."}), 400

    resultado = obtener_ordenes(db, nombre, fecha_inicio, fecha_fin, estado)

    if isinstance(resultado, str):  # mensaje de error
        return jsonify({"message": resultado}), 404

    return jsonify({"ordenes": resultado})

@app.route('/api/grafico_platos')
def obtener_grafico_platos():
    nombre_restaurante = request.args.get('nombre')
    fecha_inicio = request.args.get('fecha_inicio')
    fecha_fin = request.args.get('fecha_fin')
    estado = request.args.get('estado')

    if not nombre_restaurante or not fecha_inicio or not fecha_fin or not estado:
        return jsonify({"message": "Debes proporcionar todos los parámetros (nombre, fecha_inicio, fecha_fin, estado)."}), 400

    # Llamamos a la función que obtiene las órdenes y genera el gráfico
    result_list, contador_platos = obtener_ordenes_grafico(db, nombre_restaurante, fecha_inicio, fecha_fin, estado)

    if not contador_platos:
        return jsonify({"message": "No se encontraron órdenes que coincidan con los criterios."}), 404

    # Generar el gráfico con la función graficar_platos
    fig = graficar_platos(contador_platos)

    # Convertir el gráfico a una imagen en formato base64
    img_stream = BytesIO()
    fig.savefig(img_stream, format='png')
    img_stream.seek(0)
    img_base64 = base64.b64encode(img_stream.read()).decode('utf-8')

    return jsonify({"grafico_base64": img_base64})


@app.route('/api/grafico_restaurantes')
def obtener_grafico_restaurantes():
    # Llamamos a la función que obtiene el top de restaurantes
    top_restaurantes = top_restaurantes_por_puntuacion_y_ordenes(db)

    if not top_restaurantes:
        return jsonify({"message": "No se encontraron restaurantes."}), 404

    # Generar el gráfico con la función graficar_promedio_y_ordenes_separadas
    fig = graficar_promedio_y_ordenes_separadas(top_restaurantes)

    # Convertir el gráfico a una imagen en formato base64
    img_stream = BytesIO()
    fig.savefig(img_stream, format='png')
    img_stream.seek(0)
    img_base64 = base64.b64encode(img_stream.read()).decode('utf-8')

    return jsonify({"grafico_base64": img_base64})






if __name__ == '__main__':
    app.run(debug=True)

