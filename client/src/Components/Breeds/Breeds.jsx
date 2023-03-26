import BreedCard from "../BreedCard/BreedCard";
import "./Breeds.modules.css";

const Breeds = ({ breeds }) => {
  return (
    <>
      {breeds ? (
        <div className="cardsBox">
          {breeds.map((breed) => (
            <BreedCard
              key={breed.id}
              id={breed.id}
              name={breed.name}
              img={breed.image.url}
              temperament={breed.temperament}
              weight={breed.weight}
              life_span={breed.life_span}
            />
          ))}
        </div>
      ) : (
        <p>No breeds found</p>
      )}
    </>
  );
};

export default Breeds;
