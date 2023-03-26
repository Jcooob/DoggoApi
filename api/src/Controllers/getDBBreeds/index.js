const {Temperaments, Dogs} = require("../../db")

const getDBBreeds = async () => {

        const dogsDB = await Dogs.findAll(
            {include: {model: Temperaments, through: {attributes: []}}}
        );

        return dogsDB;
}

module.exports = {getDBBreeds}
