const axios = require('axios');
const {Temperaments, Dogs} = require("../../db")
const {Op} = require("sequelize");

const getBreeds = async (name) => {

    if(!name) {

        const dogsApi = await axios.get('https://api.thedogapi.com/v1/breeds');

        const dogsDB = await Dogs.findAll(
            {include: {model: Temperaments, through: {attributes: []}}}
        );

        const dogs = dogsApi.data.concat(dogsDB).sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);

        return dogs;

    } else {

        const dogsApi = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`); 

        const dogsDB = await Dogs.findAll(
            {where: {name: {[Op.iLike]: `%${name}%`}}, include: {model: Temperaments, through: {attributes: []}}}
        );

        const dogs = dogsApi.data.concat(dogsDB);

        return dogs.sort((a, b) => a.name > b.name);

    }
}

module.exports = {getBreeds}

