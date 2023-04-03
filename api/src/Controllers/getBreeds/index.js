const axios = require('axios');
const {Temperaments, Dogs} = require("../../db")
const {Op} = require("sequelize");

const getBreeds = async (name) => {

    if(!name) {

        // Se extraen los perros de la API
        const dogsApi = await axios.get('https://api.thedogapi.com/v1/breeds');

        // Se extraen los perros de la DB
        const dogsDB = await Dogs.findAll(
            {include: {model: Temperaments, through: {attributes: []}}}
        );

        // Se concatenan, se ordenan y se devuelven
        const dogs = dogsApi.data.concat(dogsDB).sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);

        return dogs;

    } else {

        const dogsApi = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`); 

        // El comando Op.iLike es una función de PostgreSQL que se utiliza para realizar comparaciones de cadenas de 
        // texto sin tener en cuenta las diferencias entre mayúsculas y minúsculas

        const dogsDB = await Dogs.findAll(
        // La opción "include" es una forma de realizar una consulta "JOIN" en la base de datos 
        // para obtener datos de múltiples tablas en una sola consulta.
            {where: {name: {[Op.iLike]: `%${name}%`}}, include: {model: Temperaments, through: {attributes: []}}}
        );
        
        const dogs = dogsApi.data.concat(dogsDB).sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);

        return dogs.sort((a, b) => a.name > b.name);

    }
}

module.exports = {getBreeds}

