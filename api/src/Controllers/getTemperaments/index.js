const axios = require('axios');
const {Temperaments, Dogs} = require("../../db")

const getTemperaments = async () => {

    let temperaments = await Temperaments.findAll();
  
    if (!temperaments.length) {
      const breeds = await axios.get('https://api.thedogapi.com/v1/breeds');

      let duplicatedTemperaments = [];
  
      breeds.data.forEach((breed) => {
        if(breed.temperament) duplicatedTemperaments = duplicatedTemperaments.concat(breed.temperament.split(", "));
      });
  
      var uniqueTemperaments = [...new Set(duplicatedTemperaments)];
  
      uniqueTemperaments.sort();

      uniqueTemperaments = uniqueTemperaments.map((temperament)=>{
        return {temperament};
      });

      temperaments = await Temperaments.bulkCreate(uniqueTemperaments);
      temperaments = await Temperaments.findAll();
    }
  
    return temperaments;
  };

  module.exports = {getTemperaments}
  