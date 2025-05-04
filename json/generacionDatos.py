import json
import random
import uuid
from faker import Faker
from datetime import datetime
from shapely.geometry import Point


fake = Faker('es')

#registros
N_USUARIOS       = 5000
N_RESTAURANTES   = 50
N_ARTICULOS      = 450
N_ORDENES        = 50000
N_RESEÑAS        = 2000

def gen_object_id():
    """Genera un ID tipo Mongo (hex de 24 chars)."""
    return uuid.uuid4().hex[:24]

#Usuarios
usuarios = []
for _ in range(N_USUARIOS):
    usuarios.append({
        "_id": gen_object_id(),
        "nombre": fake.name(),
        "correo": fake.email(),
        "direccion": fake.address().replace("\n", ", "),
        "telefono": fake.phone_number(),
        "fechaRegistro": fake.date_between(start_date="-2y", end_date="today").isoformat(),
        "fechaNacimiento": fake.date_of_birth(minimum_age=18, maximum_age=80).isoformat()
    })

#restaurantes
restaurantes = []
for _ in range(N_RESTAURANTES):
    lat, lng = fake.local_latlng(country_code="GT", coords_only=True)
    restaurantes.append({
        "_id": gen_object_id(),
        "nombre": fake.company(),
        "descripcion": fake.catch_phrase(),
        "direccion": {
            "calle": fake.street_name(),
            "ciudad": fake.city(),
        },
        "ubicacion": {                # GeoJSON Point
            "type": "Point",
            "coordinates": [float(lng), float(lat)]
        },
        "telefono": fake.phone_number(),
        "categoria": random.choice(["Mexicano", "Italiana", "Asiática", "Fast Food", "Café"]),
        "fechaRegistro": fake.date_between(start_date="-2y", end_date="today").isoformat()
    })

#artículos
articulos = []
for _ in range(N_ARTICULOS):
    restaurante = random.choice(restaurantes)["_id"]
    articulos.append({
        "_id": gen_object_id(),
        "nombre": fake.word().capitalize(),
        "descripcion": fake.sentence(nb_words=6),
        "precio": round(random.uniform(2, 25), 2),
        "disponibilidad": fake.boolean(chance_of_getting_true=85),
        "restauranteId": restaurante,
        "categoria": random.choice(["Entradas", "Principal", "Postre", "Bebida"])
    })

#ordenes
ordenes = []
for _ in range(N_ORDENES):
    usuario    = random.choice(usuarios)["_id"]
    restaurante= random.choice(restaurantes)["_id"]
    n_items    = random.randint(1,5)
    items = []
    total = 0
    for __ in range(n_items):
        art = random.choice(articulos)
        qty = random.randint(1,3)
        price = art["precio"]
        items.append({
            "articuloId": art["_id"],
            "cantidad": qty,
            "precio": price
        })
        total += qty * price
    ordenes.append({
        "_id": gen_object_id(),
        "usuarioId": usuario,
        "restauranteId": restaurante,
        "articulos": items,
        "estado": random.choice(["pendiente", "enviado", "entregado", "cancelado"]),
        "fechaOrden": fake.date_time_between(start_date="-180d", end_date="now").isoformat(),
        "total": round(total, 2)
    })

#reseñas
resenas = []
for _ in range(N_RESEÑAS):
    usuario    = random.choice(usuarios)["_id"]
    restaurante= random.choice(restaurantes)["_id"]
    orden      = random.choice(ordenes)["_id"]
    score      = round(random.uniform(1, 5), 1)
    resenas.append({
        "_id": gen_object_id(),
        "usuarioId": usuario,
        "restauranteId": restaurante,
        "ordenId": orden,
        "calificacion": score,
        "comentario": fake.paragraph(nb_sentences=2),
        "fechaResena": fake.date_time_between(start_date="-90d", end_date="now").isoformat()
    })

#guardar en json
def dump_json(data, filename):
    with open(filename, 'w', encoding='utf-8') as f:
        for doc in data:
            f.write(json.dumps(doc, ensure_ascii=False) + "\n")

# Generar archivos
dump_json(usuarios,     "usuarios.json")
dump_json(restaurantes, "restaurantes.json")
dump_json(articulos,    "articulos_menu.json")
dump_json(ordenes,      "ordenes.json")
dump_json(resenas,      "resenas.json")

print("Archivos JSON generados: usuarios.json, restaurantes.json, articulos_menu.json, ordenes.json, resenas.json")
