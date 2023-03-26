const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dogs', {

    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    img: {
      type: DataTypes.STRING,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    imperialHeight: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    metricHeight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    imperialWeight: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    metricWeight: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    life_span: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    temperament: {
      type: DataTypes.VIRTUAL,
      get() {
        const array = this.getDataValue("Temperaments");
        if (!Array.isArray(array)) {
          return "";
        }
        let result = "";
        for (let i = 0; i < array.length; i++) {
          if(i === 0) result = result + array[i].temperament;
          else result = result + ", " + array[i].temperament;
        }
        return result;
      }
    },

    height: {
      type: DataTypes.VIRTUAL,
      get(){
        return {imperial: this.getDataValue("imperialHeight"),
        metric: this.getDataValue("metricHeight")};
      }
    },

    weight: {
      type: DataTypes.VIRTUAL,
      get(){
        return {imperial: this.getDataValue("imperialWeight"),
        metric: this.getDataValue("metricWeight")};
      }
    },

    image: {
      type: DataTypes.VIRTUAL,
      get(){
        const url = this.getDataValue("img");
        return {url}
      }
    }

  },{
    timestamps: false,
  });
};
