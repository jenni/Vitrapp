# A JavaScript wrap of Vitrasa wsdl api.

:construction: under construction :construction:

## Endpoints

* [Get all stops](#get-all-stops)
* [Get stops nearby](#get-stops-nearby)
* [Get stop information](#get-stop-information)
* [Get stop estimations](#get-stop-estimations)

### Get all stops

``` http
GET /stops
```

Example:

``` http
GET /info/stops

{
    "number": 310,
    "name": "ARQUITECTO ANTONIIO COMINGES, 4",
    "location": {
    "lng": -8.80441411567944,
    "lat": 42.1906881202496
}
},
{
    "number": 320,
    "name": "Arquitecto Antonio Cominges, 70",
    "location": {
    "lng": -8.81170888870462,
    "lat": 42.1893673614418
}

```

### Get stops nearby

``` http
GET /stops/:latitude/:longitude
```

Example:

``` http
GET /info/stops/42.2178710901769/-8.74959517161433

{
    "_attributes": {
    "idparada": "1320",
    "nombre": "Avda. Castelao- 87",
    "distancia": "209.5128",
    "latitud": "42.2173022236201",
    "longitud": "-8.75110475205119"
    }
},
{
    "_attributes": {
    "idparada": "1310",
    "nombre": "Avda. Castelao- 73",
    "distancia": "229.6862",
    "latitud": "42.2177055282635",
    "longitud": "-8.74775332453754"
    }
}
```

### Get stop information

``` http
GET /info/:id
```

Example:

``` http
GET /info/14901

{
    "id": "14901",
    "name": "Avda Castelao- 1",
    "distance": "0.7514634",
    "latitude": "42.2202110030046",
    "longitude": "-8.73418302261462"
}
```

### Get stop estimations

``` http
GET /info/:id/estimations
```

Example:

``` http
GET /info/14901/estimations

{
    "stop": {
    "id": "14901",
    "name": "Avda Castelao- 1",
    "distance": "0.7514634",
    "latitude": "42.2202110030046",
    "longitude": "-8.73418302261462"
    },
"buses": {
    "Estimaciones": [
        {
            "Linea": {
                "_text": "C3"
        },
            "Ruta": {
                "_text": "ENCARNACIÃ“N por TRAV. DE VIGO"
        },
            "minutos": {
                "_text": "6"
        },
            "metros": {
                "_text": "1526"
            }
        },
        {
            "Linea": {
                "_text": "15A"
            },
            "Ruta": {
                "_text": "R. NIETO - CABRAL"
            },
            "minutos": {
                "_text": "11"
            },
            "metros": {
                "_text": "2628"
            }
        }
    ]
}
```

For a python implementation visit --> [Time for Vbus API](https://github.com/abdonrd/time-for-vbus-api)
