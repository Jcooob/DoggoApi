const {Temperaments, Dogs} = require("../../db")

const getDBBreeds = async () => {

        const dogsDB = await Dogs.findAll(
            {include: {model: Temperaments, through: {attributes: []}}}
        );

        const dogsDBOrdered = dogsDB.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);

        return dogsDBOrdered;
}

module.exports = {getDBBreeds}
