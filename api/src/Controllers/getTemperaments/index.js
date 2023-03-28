const axios = require('axios');
const {Temperaments, Dogs} = require("../../db")

const getTemperaments = async () => {

    let temperaments = await Temperaments.findAll();
  
    if (!temperaments.length) {
      const breeds = await axios.get('https://api.thedogapi.com/v1/breeds');

      let duplicatedTemperaments = [];
  
      breeds.data.forEach((breed) => {
        // Se verifica que la raza no tenga un temperamento nulo, si tiene temperamentos se le separa por las comas
        // y se les concatena al array duplicatedTemperaments.
        if(breed.temperament) duplicatedTemperaments = duplicatedTemperaments.concat(breed.temperament.split(", "));
      });

      // se utiliza el operador de propagación ... para crear un nuevo array con valores únicos, 
      // eliminando los duplicados del array duplicatedTemperaments.
      var uniqueTemperaments = [...new Set(duplicatedTemperaments)];
  
      uniqueTemperaments.sort();

      // Por cada temperamento en el array uniqueTemperaments nos devuelve un objeto con una sola propiedad: "temperament"
      uniqueTemperaments = uniqueTemperaments.map((temperament)=>{
        return {temperament};
      });
      //uniqueTemperaments pasa a ser un array con varios objetos, cada uno con la propiedad temperament

      // El método bulkCreate se utiliza para insertar varios registros a la vez en la tabla correspondiente (Temperaments)
      // de la base de datos y devuelve una promesa que resuelve en un array con los objetos creados.
      temperaments = await Temperaments.bulkCreate(uniqueTemperaments);

      // Se vuelve a consultar la tabla Temperaments para obtener un array actualizado de todos los objetos en la tabla, 
      // incluyendo los nuevos objetos creados con bulkCreate()
      temperaments = await Temperaments.findAll();
    }

    // Se devuelven los temperamentos ya almacenados y extraidos desde la base de datos
    return temperaments;
  };

  module.exports = {getTemperaments}
  