import { Link } from "react-router-dom";
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
                    <p> Average life span: {life_span}</p>
                    <p> Weight: {weight.metric} kg</p>
                </div>
            </div>
        </Link>
        
    )
}

export default BreedCard;