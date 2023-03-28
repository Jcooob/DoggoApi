const axios = require('axios');
const {Temperaments, Dogs} = require('../../db.js');

const getBreedById = async (id) => {

    const breeds = await axios.get("https://api.thedogapi.com/v1/breeds")

    var breedFound = breeds.data.find((breed) => breed.id === Number(id));

    if(!breedFound) {

        // La opción "include" es una forma de realizar una consulta "JOIN" en la base de datos 
        // para obtener datos de múltiples tablas en una sola consulta.

        //findByPk devuelve una promesa que al resolverse devuelve el objeto del perro

        breedFound = await Dogs.findByPk(id, {include: {model: Temperaments, through: {attributes: []}}})

        //attributes sirve para no mostrar la tabla intermedia, sino solo las coincidencias de la tabla Temperaments

        // Equivalente en sql:
        // SELECT *
        // FROM Dogs
        // LEFT JOIN Temperaments ON Dogs.id = Temperaments.DogId
        // WHERE Dogs.id = {id}

    }

    if (!breedFound) {
        throw Error ("Breed not found");
    }

    return breedFound;
}


module.exports = {getBreedById};