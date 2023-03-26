const { Dogs } = require("../../db")
const { convertToImperialHeight, convertToImperialWeight } = require("../../Utils/ConvertionFunctions")

const postBreed = async(name, metricHeight, metricWeight, life_span, temperament,  img) => {
      
    const imperialHeight = convertToImperialHeight(metricHeight);
    const imperialWeight = convertToImperialWeight(metricWeight); 

    const newBreed = await Dogs.create({name, imperialHeight, metricHeight, imperialWeight, metricWeight, life_span, temperament, img});
    newBreed.addTemperament(temperament);
    return newBreed;

}

module.exports = {postBreed}