const {Dogs} = require("../../db")

const deleteBreed = async (id) => {

      const deletedDog = await Dogs.destroy({ where: { id } });
      
      return deletedDog;
  };
  
  module.exports = {deleteBreed};
  

//   localhost:3001/deleteDogs/46f4b3b9-6b4d-4744-8dc6-2db7fddae89c