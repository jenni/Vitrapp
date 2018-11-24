# A JavaScript wrap of Vitrasa wsdl api.

:construction: under construction :construction:

:bus: VITRASA - Public transportation in Vigo

## Endpoints

* [Get all stops](#get-all-stops)
* [Get stops nearby](#get-stops-nearby)
* [Get stop estimations](#get-stop-estimations)
* [Get estimations by coordinates](#get-estimations-by-coordinates)

### Get all stops

``` http
GET /stops
```

Example:

``` http
GET /stops/all

{
    "id": 280,
    "name": "Arquitecto Antonio Cominges, 38",
    "location": {
        "lng": -8.80731148602987,
        "lat": 42.1897563491201
    }
},
{
    "id": 290,
    "name": "Arquitecto Gomez Roman, 35",
    "location": {
        "lng": -8.8038689924564,
        "lat": 42.1899936938779
    }
},
...

```

### Get stops nearby

``` http
GET /stops/nearby/:latitude/:longitude
```

Example:

``` http
GET /stops/nearby/42.215625/-8.747444/

[
    {
        "_attributes": {
            "idparada": "1320",
            "nombre": "Avda. Castelao- 87",
            "distancia": "532.5505",
            "latitud": "42.2173022236201",
            "longitud": "-8.75110475205119"
        }
    },
    {
        "_attributes": {
            "idparada": "1310",
            "nombre": "Avda. Castelao- 73",
            "distancia": "348.73",
            "latitud": "42.2177055282635",
            "longitud": "-8.74775332453754"
        }
    }
]
```

### Get stop estimations

``` http
GET stops/:id/estimations
```

Example:

``` http
GET /stops/14901/estimations

[
    {
        "line": "10",
        "route": "cemiterio de teis",
        "minutes": "1",
        "distance": "624"
    },
    {
        "line": "15A",
        "route": "r. nieto - cabral",
        "minutes": "10",
        "distance": "2748"
    }
]
```

### Get estimations by coordinates

``` http
GET /stops/location/:lat/:lng/estimations
```

Example:

``` http
GET /stops/location/42.2346052506693/-8.6711950590708/estimations

[
    {
        "line": "9A",
        "route": "peinador - aeroporto",
        "minutes": "4",
        "distance": "2383"
    },
    {
        "line": "9B",
        "route": "rabadeira por rinxela",
        "minutes": "23",
        "distance": "5938"
    }
]
```

For a python implementation visit --> [Time for Vbus API](https://github.com/abdonrd/time-for-vbus-api)