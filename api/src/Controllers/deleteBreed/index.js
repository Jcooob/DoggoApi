const {Dogs} = require("../../db")

const deleteBreed = async (id) => {

      const deletedDog = await Dogs.destroy({ where: { id } });
      
      return deletedDog;
  };
  
  module.exports = {deleteBreed};