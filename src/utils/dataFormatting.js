function snakeToCamel (str) {
    return str.toLowerCase().replace(/([-_][a-z])/g, group =>
        group
        .toUpperCase()
        .replace('-', '')
        .replace('_', '')
  );
}

function objectKeysToCamel (object) {
    //Objeto donde se guarda el pasajero con la nueva notacion
    const passenger = {};
    
    //Toma la key de cada pasajero y las mapea para crear objetos con notacion camelCase
    Object.keys(object).map((key) => {passenger[snakeToCamel(key)] = object[key]});

    return passenger;
}

function queryObjectToArrayObject(queryObject){
    //Array donde se guardan los pasajeros
    const passengers = [];

    //Convierte el objeto Query que tiene de atributos cada linea de la query, en un array de pasajeros
    let objArray = []
    Object.keys(queryObject).map( key => objArray.push( queryObject[key] ) );

    //Transforma las keys de cada objeto a camelCase
    objArray.map( passengerObject => passengers.push( objectKeysToCamel(passengerObject) ) );

    return passengers;
}

module.exports = { objectKeysToCamel, queryObjectToArrayObject };