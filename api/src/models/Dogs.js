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

    // Las siguientes propiedades virtuales se crearon para hacer que los perros creados con las bases de datos tengan las mismas
    // propiedades que los perros extraidos desde la API, y poder extraerlas de la misma manera que con un perro de la API

    temperament: {
      type: DataTypes.VIRTUAL,
      get() {
        // Se extrae el array de temperamentos (objetos) de la tabla Temperaments
        const array = this.getDataValue("Temperaments");
        // Si "array" no es un array se retorna una string vacia
        if (!Array.isArray(array)) {
          return "";
        }
        // Sino se crea una string vacia
        let result = "";
        // Iniciamos un bucle for
        for (let i = 0; i < array.length; i++) {
          // Si estamos parados en la posicion 0 simplemente se añade el temperamento
          if(i === 0) result = result + array[i].temperament;
          // En las siguientes iteraciones se añadira una coma despues de cada temperamento añadido
          else result = result + ", " + array[i].temperament;
        }
        // Se retorna el resultado como una string de temperamentos juntos por comas
        return result;
      }
    },

    height: {
      type: DataTypes.VIRTUAL,
      get(){
        return {
          imperial: this.getDataValue("imperialHeight"),
          metric: this.getDataValue("metricHeight")};
      }
    },

    weight: {
      type: DataTypes.VIRTUAL,
      get(){
        return {
          imperial: this.getDataValue("imperialWeight"),
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
