from pymongo import MongoClient
from datetime import datetime
import matplotlib.pyplot as plt
import seaborn as sns
"""
# Cadena de conexión copiada de Compass
uri = "mongodb+srv://adrian:CmKZDuWRuJmoQfQc@cluster0.a4fng.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Conectar a MongoDB usando PyMongo
client = MongoClient(uri)

# Seleccionar la base de datos
db = client['Proyecto_2']  # Reemplaza con tu base de datos

# Acceder a una colección
Resenas = db['Resenas']  # Reemplaza con tu colección

Restaurantes= db['Restaurantes']

Ordenes=db['Ordenes']

"""
#Muestra las reseñas de un restaurante dado el nombre del restaurante (las muestra en asc o desc por calificacion)
def clasificar_reseñas_calificacion_ordenado(db, NombreRestaurante, orden):
    order=0
    if orden=='asc':
        order=1
    elif orden=='desc':
        order=-1
    
    # Buscar el restaurante por su nombre y obtener el restauranteId
    restaurante = db.Restaurantes.find_one({"nombre": NombreRestaurante})
    
    if not restaurante:
        return f"Restaurante con nombre {NombreRestaurante} no encontrado."

    restaurante_id = restaurante['_id']
    
    # Buscar las reseñas del restaurante por restauranteId y ordenarlas por calificación descendente
    resultado = db.Resenas.find(
        {"restauranteId": restaurante_id}  # Filtrar por restauranteId
    ).sort("calificacion", order)  # Ordenar por calificación en orden descendente
    
    # Retornar las reseñas

    return list(resultado)

#Muestra las reseñas de un restaurante dado su nombre (las muestra ordenadas por la calificacion en desc o asc)
def clasificar_reseñas_por_fecha_desc(Resenas, Restaurantes, NombreRestaurante,orden):
    order=0
    if orden=='asc':
        order=1
    elif orden=='desc':
        order=-1
    # Buscar el restaurante por su nombre y obtener el restauranteId
    restaurante = Restaurantes.find_one({"nombre": NombreRestaurante})
    
    if not restaurante:
        return f"Restaurante con nombre {NombreRestaurante} no encontrado."

    restaurante_id = restaurante['_id']
    
    # Buscar las reseñas del restaurante por restauranteId y ordenarlas por fecha descendente
    resultado = Resenas.find(
        {"restauranteId": restaurante_id}  # Filtrar por restauranteId
    ).sort("fechaResena", order)  # Ordenar por fechaResena en orden descendente
    
    # Retornar las reseñas
    return list(resultado)


def obtener_ordenes(ordenes, nombre_restaurante, fecha_inicio, fecha_fin, estado):
    # Convertir las fechas a formato datetime
    fecha_inicio = datetime.strptime(fecha_inicio, "%Y-%m-%d")
    fecha_fin = datetime.strptime(fecha_fin, "%Y-%m-%d")

    # Realizar la consulta usando aggregation pipeline
    resultado = ordenes.aggregate([
        {
            # Filtrar por restaurante, fecha y estado
            "$match": {
                "datosRestaurante.nombreRestaurante": nombre_restaurante,  # Filtrar por restaurante
                "fechaOrden": { "$gte": fecha_inicio, "$lte": fecha_fin },  # Filtrar por fecha
                "estado": estado  # Filtrar por estado
            }
        },
        {
            # Proyectar solo los campos necesarios
            "$project": {
                "_id": 0,  # Excluir _id
                "nombreUsuario": "$datosUsuario.nombreUsuario",  # Incluir nombreUsuario
                "correoUsuario": "$datosUsuario.correoUsuario",  # Incluir correoUsuario
                "articulos": {
                    "$map": {
                        "input": "$datosMenu",  # Mapear datos del menú
                        "as": "articulo",  # Alias para el artículo
                        "in": {
                            "nombreArticulo": "$$articulo.nombreArticulo",  # Incluir nombreArticulo
                            "precio": "$$articulo.precio"  # Incluir precio
                        }
                    }
                },
                "fechaOrden": 1,  # Incluir la fechaOrden
                "MontoTotal": 1  # Incluir el MontoTotal
            }
        },
        {
            # Ordenar por fecha en orden descendente (más reciente primero)
            "$sort": { "fechaOrden": -1 }
        }
    ])

    # Retornar el resultado como una lista
    return list(resultado)



def obtener_ordenes_grafico(ordenes, nombre_restaurante, fecha_inicio, fecha_fin, estado):
    # Convertir las fechas a formato datetime
    try:
        fecha_inicio = datetime.strptime(fecha_inicio, "%Y-%m-%d")
        fecha_fin = datetime.strptime(fecha_fin, "%Y-%m-%d")
    except Exception as e:
        print(f"Error al convertir las fechas: {e}")
        return []
    
    print(f"Fechas de búsqueda: {fecha_inicio} a {fecha_fin}")

    # Realizar la consulta usando aggregation pipeline
    resultado = ordenes.aggregate([
        {
            # Filtrar por restaurante, fecha y estado
            "$match": {
                "datosRestaurante.nombreRestaurante": nombre_restaurante,  # Filtrar por restaurante
                "fechaOrden": { "$gte": fecha_inicio, "$lte": fecha_fin },  # Filtrar por fecha
                "estado": estado  # Filtrar por estado
            }
        },
        {
            # Proyectar solo los campos necesarios
            "$project": {
                "_id": 0,  # Excluir _id
                "nombreUsuario": "$datosUsuario.nombreUsuario",  # Incluir nombreUsuario
                "correoUsuario": "$datosUsuario.correoUsuario",  # Incluir correoUsuario
                "articulos": {
                    "$map": {
                        "input": "$datosMenu",  # Mapear datos del menú
                        "as": "articulo",  # Alias para el artículo
                        "in": {
                            "nombreArticulo": "$$articulo.nombreArticulo",  # Incluir nombreArticulo
                            "precio": "$$articulo.precio"  # Incluir precio
                        }
                    }
                },
                "fechaOrden": 1,  # Incluir la fechaOrden
                "MontoTotal": 1  # Incluir el MontoTotal
            }
        },
        {
            # Ordenar por fecha en orden descendente (más reciente primero)
            "$sort": { "fechaOrden": -1 }
        },
        {
            # Descomponer los artículos del menú para obtener un documento por artículo
            "$unwind": "$articulos"
        }
    ])

    # Retornar el resultado como una lista
    result_list = list(resultado)

    if not result_list:
        print("No se encontraron órdenes que coincidan con los criterios.")


    # Contar la frecuencia de los platos y su total generado
    contador_platos = {}

        # Recorrer todos los documentos
    for doc in result_list:
        # Acceder al artículo (en lugar de una lista de artículos, solo hay uno)
        articulo = doc['articulos']
            
        nombre_plato = articulo['nombreArticulo']
        precio_plato = articulo['precio']
        
        # Si el plato ya está en el diccionario, sumamos el precio y aumentamos el contador
        if nombre_plato in contador_platos:
            contador_platos[nombre_plato]['cantidad'] += 1
            contador_platos[nombre_plato]['total_generado'] += precio_plato
        else:
            # Si es el primer plato que encontramos, lo añadimos al diccionario
            contador_platos[nombre_plato] = {
                'cantidad': 1,
                'total_generado': precio_plato
            }

    """
    # Mostrar los resultados
    if contador_platos:
        print("Platos más repetidos y su total generado:")
        for plato, data in contador_platos.items():
            print(f"{plato}: Repeticiones: {data['cantidad']}, Total generado: {data['total_generado']:.2f}")
    else:
        print("No se encontraron platos repetidos en el rango de fechas.")
    """
    return result_list,contador_platos

def top_restaurantes_por_puntuacion_y_ordenes(resenas):
    # Realizar el query con aggregation pipeline
    resultado = resenas.aggregate([
        {
            # Agrupar por restaurante y calcular el promedio de calificación y la cantidad de órdenes
            "$group": {
                "_id": "$restauranteId",  # Agrupar por restauranteId
                "promedio_calificacion": { "$avg": "$calificacion" },  # Calcular promedio de calificación
                "cantidad_ordenes": { "$sum": 1 }  # Contar la cantidad de órdenes
            }
        },
        {
            # Proyectar el resultado para incluir el nombre del restaurante, promedio y cantidad de órdenes
            "$lookup": {
                "from": "Restaurantes",  # Tabla de restaurantes
                "localField": "_id",  # Campo de restauranteId de las reseñas
                "foreignField": "_id",  # Campo _id en Restaurantes
                "as": "restaurante_info"  # Nombre del array con la información del restaurante
            }
        },
        {
            # Descomponer el array restaurante_info para acceder al nombre del restaurante
            "$unwind": "$restaurante_info"
        },
        {
            # Proyectar solo los campos necesarios (nombre del restaurante, promedio de calificación y cantidad de órdenes)
            "$project": {
                "_id": 0,
                "nombreRestaurante": "$restaurante_info.nombre",  # Mostrar el nombre del restaurante
                "promedio_calificacion": 1,  # Mostrar el promedio de calificación
                "cantidad_ordenes": 1  # Mostrar la cantidad de órdenes
            }
        },
        {
            # Ordenar por el promedio de calificación en orden descendente (mejor puntuado primero)
            "$sort": { "promedio_calificacion": -1 }
        }
    ])
    print(resultado)
    # Imprimir el resultado
    #top_restaurantes=list(resultado)
    #for restaurante in top_restaurantes:
     #   print(f"Restaurante: {restaurante['nombreRestaurante']}, Promedio de Calificación: {restaurante['promedio_calificacion']:.2f}, Cantidad de Órdenes: {restaurante['cantidad_ordenes']}")


    # Retornar el resultado como una lista
    return list(resultado)


def graficar_platos(contador_platos):
    # Extraer los datos de 'contador_platos'
    nombres_platos = list(contador_platos.keys())
    cantidades = [data['cantidad'] for data in contador_platos.values()]
    totales = [data['total_generado'] for data in contador_platos.values()]

    # Ordenar los datos por cantidad (de mayor a menor)
    sorted_indices_cantidades = sorted(range(len(cantidades)), key=lambda i: cantidades[i], reverse=True)
    nombres_platos = [nombres_platos[i] for i in sorted_indices_cantidades]
    cantidades = [cantidades[i] for i in sorted_indices_cantidades]
    totales = [totales[i] for i in sorted_indices_cantidades]

    # Configurar los gráficos
    fig, axes = plt.subplots(1, 2, figsize=(14, 6))

    # Gráfico 1: Cantidad de veces que se pidió cada plato
    sns.barplot(x=nombres_platos, y=cantidades, ax=axes[0], palette="viridis")
    axes[0].set_title('Cantidad de veces que se pidió cada plato')
    axes[0].set_xlabel('Plato')
    axes[0].set_ylabel('Cantidad de pedidos')
    axes[0].tick_params(axis='x', rotation=90)

    # Gráfico 2: Total generado por cada plato
    sns.barplot(x=nombres_platos, y=totales, ax=axes[1], palette="Blues")
    axes[1].set_title('Total generado por cada plato')
    axes[1].set_xlabel('Plato')
    axes[1].set_ylabel('Total generado ($)')
    axes[1].tick_params(axis='x', rotation=90)

    # Ajustar el espacio entre los gráficos
    plt.tight_layout()

    # Mostrar los gráficos
    plt.show()

def graficar_promedio_y_ordenes_separadas(top_restaurantes):
    # Ordenar el top de restaurantes por el promedio de calificación de mayor a menor
    top_restaurantes = sorted(top_restaurantes, key=lambda x: x['promedio_calificacion'], reverse=True)

    # Limitar a los 10 primeros
    top_restaurantes = top_restaurantes[:10]

    # Obtener los datos para el gráfico
    nombres_restaurantes = [restaurante['nombreRestaurante'] for restaurante in top_restaurantes]
    promedio_calificaciones = [restaurante['promedio_calificacion'] for restaurante in top_restaurantes]
    cantidad_ordenes = [restaurante['cantidad_ordenes'] for restaurante in top_restaurantes]

    # Crear la figura con 2 subgráficas
    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 12))

    # Gráfico 1: Promedio de Calificación
    bars1=ax1.barh(nombres_restaurantes, promedio_calificaciones, color='skyblue')
    #ax1.set_xlabel('Promedio de Calificación')
    ax1.set_ylabel('Restaurantes')
    ax1.set_title('Promedio de Calificación de Restaurantes')
    ax1.set_xlim(0, 5)  # Limitar el eje X para que se ajuste a la escala de calificación
    ax1.invert_yaxis()  # Invertir el eje Y para que el restaurante con mayor puntuación esté arriba
    ax1.bar_label(bars1, fmt='%.2f', padding=5)  # Agregar los valores sobre las barras

    # Gráfico 2: Cantidad de Órdenes
    bars2=ax2.barh(nombres_restaurantes, cantidad_ordenes, color='orange')
    ax2.set_xlabel('Cantidad de Órdenes')
    ax2.set_ylabel('Restaurantes')
    ax2.set_title('Cantidad de Órdenes de Restaurantes')
    ax2.invert_yaxis()  # Invertir el eje Y para que el restaurante con más órdenes esté arriba
    ax2.bar_label(bars2, padding=5)  # Agregar los valores sobre las barras

    # Mostrar las gráficas
    plt.tight_layout()
    plt.show()

"""
topcito=top_restaurantes_por_puntuacion_y_ordenes(Resenas)

graficar_promedio_y_ordenes_separadas(topcito)



# Llamar a la función con los parámetros deseados
nombre_restaurante = "Industrias Mendizábal S.Coop."
fecha_inicio = "2025-02-01"
fecha_fin = "2025-04-30"
estado = "En preparación"
#resultados,graficos = obtener_ordenes_grafico(Ordenes, nombre_restaurante, fecha_inicio, fecha_fin, estado)

"""
#resultados = obtener_ordenes(Ordenes, nombre_restaurante, fecha_inicio, fecha_fin, estado)



#print(resultados)
#for i in resultados:
 #   print(i)
  #  print("____________________________________________________________________________")
#graficar_platos(graficos)


#x=clasificar_reseñas_calificacion_ordenado(Resenas,Restaurantes,'Maxi Borrell Daza S.L.','desc')

#x= clasificar_reseñas_por_fecha_desc(Resenas,Restaurantes,'Maxi Borrell Daza S.L.','desc')







# Cerrar la conexión cuando ya no sea necesaria
#client.close()