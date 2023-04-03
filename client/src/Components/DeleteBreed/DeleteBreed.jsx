import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDBBreeds, deleteBreed } from "../../Redux/actions";
import TitleBar from "../TitleBar/TitleBar";
import Footer from "../Footer/Footer";
import "./DeleteBreed.modules.css"

export default function DeleteBreed() {

  const dispatch = useDispatch();

  const breeds = useSelector((state) => state.dbBreeds);

  const [selectedBreed, setSelectedBreed] = useState(null);

  const handleBreedChange = (event) => {
    const selectedId = event.target.value;
    setSelectedBreed(breeds.find((breed) => breed.id === selectedId));
  };

  const handleDeleteBreed = () => {
    if (selectedBreed) {
      deleteBreed(selectedBreed.id);
      alert("Breed deleted succesfully");
      setSelectedBreed(null);
      window.location.reload();
    }
  };

  useEffect(() => {
    dispatch(getDBBreeds());
  }, []);

  return (
    <>
        <TitleBar type={"deleteBreed"} text={"Delete a breed from the DB"}/>
        
        <div className="deleteBody">
            <select value={selectedBreed ? selectedBreed.id : ""} onChange={handleBreedChange} className="deleteSelector">
                <option value="">Choose a breed</option>
                {breeds.map((breed) => (
                    <option key={breed.id} value={breed.id} className="deleteBreedSelector">
                        {breed.name}
                    </option>
                ))}
            </select>
            
            <div className="deleteArea">
              {selectedBreed ? (
                  <div className="deleteDogInfo">
                      <h1 className="deleteFormTitle">Selected breed detail: </h1>
                      <hr className="separatorDelete"/>
                      <p className="deleteInfo">Name: <span className="breedInfo">{selectedBreed.name}</span></p>
                      <p className="deleteInfo">Life span: <span className="breedInfo">{selectedBreed.life_span}</span></p>
                      <p className="deleteInfo">Height: <span className="breedInfo">{selectedBreed.height.imperial} or {selectedBreed.height.metric} cm</span></p>
                      <p className="deleteInfo">Weight: <span className="breedInfo">{selectedBreed.weight.imperial} lbs or {selectedBreed.weight.metric} kg</span></p>
                      <p className="deleteInfo">Temperaments: <span className="breedInfo">{selectedBreed.temperament}</span></p>
                      <hr className="separatorDelete"/>
                      <img src={selectedBreed.img} alt={selectedBreed.name} className="deleteDogImg"/>
                      <hr className="separatorDelete"/>
                      <button onClick={handleDeleteBreed} className="deleteBreedButton">Delete Breed</button>
                  </div>
              ) : (
                  <div className="emptyDogSelected">
                      No breed Selected
                  </div>
              )}
            </div>
        </div>

        <Footer />
    </>
  );
}
