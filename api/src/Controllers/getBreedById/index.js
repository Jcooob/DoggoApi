const axios = require('axios');
const {Temperaments, Dogs} = require('../../db.js');

const getBreedById = async (id) => {

    const breeds = await axios.get("https://api.thedogapi.com/v1/breeds")

    var breedFound = breeds.data.find((breed) => breed.id === Number(id));

    if(!breedFound) {
        breedFound = await Dogs.findByPk(id, {include: {model: Temperaments, through: {attributes: []}}})
    }

    if (!breedFound) {
        throw Error ("Breed not found");
    }

    return breedFound;
}


module.exports = {getBreedById};