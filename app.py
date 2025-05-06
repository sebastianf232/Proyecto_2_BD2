from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from crear import crear_usuario, crear_restaurante, crear_articulo_de_menu, crear_orden, crear_resena
from consultar import consultar_usuarios, consultar_restaurantes, consultar_articulos_menu, consultar_ordenes, consultar_resenas
from actualizar import actualizar_usuario, actualizar_restaurante, actualizar_articulo_de_menu, actualizar_orden, actualizar_resena
from eliminar import eliminar_usuario, eliminar_restaurante, eliminar_articulo_de_menu, eliminar_orden, eliminar_resena

from MostrarReseñasYOrdenes import clasificar_reseñas_calificacion_ordenado
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

@app.route('/api/usuarios/<id>', methods=['PUT'])
def put_usuario(id):
    return actualizar_usuario(id, request, db)

@app.route('/api/restaurantes/<id>', methods=['PUT'])
def put_restaurante(id):
    return actualizar_restaurante(request, db)

@app.route('/api/articulos_menu/<id>', methods=['PUT'])
def put_articulo_de_menu(id):
    return actualizar_articulo_de_menu(id, request, db)

@app.route('/api/ordenes/<id>', methods=['PUT'])
def put_orden(id):
    return actualizar_orden(id, request, db)

@app.route('/api/resenas/<id>', methods=['PUT'])
def put_resena(id):
    return actualizar_resena(id, request, db)

@app.route('/api/usuarios/<id>', methods=['DELETE'])
def delete_usuario(id):
    return eliminar_usuario(id, db)

@app.route('/api/restaurantes/<id>', methods=['DELETE'])
def delete_restaurante(id):
    return eliminar_restaurante(id, db)

@app.route('/api/articulos_menu/<id>', methods=['DELETE'])
def delete_articulo_de_menu(id):
    return eliminar_articulo_de_menu(id, db)

@app.route('/api/ordenes/<id>', methods=['DELETE'])
def delete_orden(id):
    return eliminar_orden(id, db)

@app.route('/api/resenas/<id>', methods=['DELETE'])
def delete_resena(id):
    return eliminar_resena(id, db)

@app.route('/api/resenas_restaurante')
def obtener_resenas_restaurante():
    nombre = request.args.get('nombre')
    orden = request.args.get('orden', 'desc')

    if not nombre:
        return jsonify({"message": "Debes proporcionar el nombre del restaurante"}), 400

    resultado = clasificar_reseñas_calificacion_ordenado(db, nombre, orden)

    if isinstance(resultado, str):  # mensaje de error
        return jsonify({"message": resultado}), 404

    resultado_json = json.loads(json_util.dumps(resultado))
    return jsonify({"reseñas": resultado_json})

if __name__ == '__main__':
    app.run(debug=True)

