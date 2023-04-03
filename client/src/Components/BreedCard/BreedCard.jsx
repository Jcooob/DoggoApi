import { Link } from "react-router-dom";
import { getAverageWeight, getAverageLifeSpan } from "../../Utils/GetAverageFunctions";
import "./BreedCard.modules.css"

const BreedCard = ({id, name, img, temperament, weight, life_span}) => {

    let temperamentText = "";

    if (temperament) {
      const temperamentArray = temperament.split(",");
      
      if (temperamentArray.length > 7) {
        const firstSevenTemperaments = temperamentArray.slice(0, 7).join(", ");
        temperamentText = `${firstSevenTemperaments} + ${temperamentArray.length - 7} others`;
      } else {
        temperamentText = temperamentArray.join(", ");
      }
    }
    

    return (
        <Link to = {`/detail/${id}`}>
            <div className = "container">
                <h2 className="titleBreed"> {name}</h2>
                <img src = {img} alt = {name} className = "breedPicture"/>
                <div className="data">
                    <p> {temperamentText}</p>
                    <p> Average life span: {getAverageLifeSpan(life_span)} years</p>
                    <p> Average weight: {getAverageWeight(weight)} kg</p>
                </div>
            </div>
        </Link>
        
    )
}

export default BreedCard;