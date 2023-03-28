import { getTemperaments } from "../../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { postBreed } from "../../Redux/actions";
import TitleBar from "../TitleBar/TitleBar"
import Footer from "../Footer/Footer";
import "./Form.modules.css"

export default function Form() {

    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [minWeight, setMinWeight] = useState("")
    const [maxWeight, setMaxWeight] = useState("")
    const [minHeight, setMinHeight] = useState("")
    const [maxHeight, setMaxHeight] = useState("")
    const [minLifeSpan, setMinLifeSpan] = useState("")
    const [maxLifeSpan, setMaxLifeSpan] = useState("")
    const [selectedTemperaments, setSelectedTemperaments] = useState([])
    const [selectedTemperamentsIds, setSelectedTemperamentIds] = useState([])
    const [imageURL, setImageURL] = useState("");
    const [status, setStatus] = useState("")

    const temperaments = useSelector((state) => state.temperaments)

    // Esta funcion sirve para encontrar los temperamentos seleccionados por el usuario en el array de todos los temperamentos
    // extraidos del estado global
    const updateSelectedTemperamentIds = () => {
      const selectedIds = selectedTemperaments.map((temperament) => {
        const matchingTemperament = temperaments.find((t) => t.temperament === temperament);
        return matchingTemperament ? matchingTemperament.id : null;
      });
    
      setSelectedTemperamentIds(selectedIds.filter((id) => id !== null));
    };

    useEffect(() => {
      updateSelectedTemperamentIds();
    }, [selectedTemperaments]);
    
    useEffect(() => {
        dispatch(getTemperaments());
    }, []);

    const nameHandler = (event) => {
        setName(event.target.value)
    }
    
    const minWeightHandler = (event) => {
        setMinWeight(event.target.value)
    }
    
    const maxWeightHandler = (event) => {
        setMaxWeight(event.target.value)
    }
    
    const minHeightHandler = (event) => {
        setMinHeight(event.target.value)
    }
    
    const maxHeightHandler = (event) => {
        setMaxHeight(event.target.value)
    }
    
    const minLifeSpanHandler = (event) => {
        setMinLifeSpan(event.target.value)
    }
    
    const maxLifeSpanHandler = (event) => {
        setMaxLifeSpan(event.target.value)
    }

    const handleInputChange = (event) => {
        setImageURL(event.target.value);
    }

    const handleClearTemperaments = (event) => {
        event.preventDefault();
        setSelectedTemperaments([])
    }

    function isValidImageURL(url) {
        return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(url);
    }

    // Se utiliza useCallback para evitar que la función se cree de nuevo en cada renderizado, 
    // lo que puede tener un impacto en el rendimiento.
    const handleSelectTemperament = useCallback((e) => {

      // Selected contiene los valores de los elementos seleccionados en el elemento <select>
      const selected = Array.from(e.target.selectedOptions, (option) => option.value);

      // SelectedID contiene las claves de esos elementos seleccionados.
      const selectedID = Array.from(e.target.selectedOptions, (option) => option.key);

      // Se actualiza el estado de la aplicación con las claves de los elementos seleccionados.
      setSelectedTemperamentIds(selectedID);
    
      setSelectedTemperaments((prevSelectedTemperaments) => {

        //Si no hay temperamentos seleccionados retorna un array vacio
        if (selected.length === 0) {
          return [];

        // Se comprueba si el primer elemento seleccionado ya está en la lista de elementos seleccionados. 
        // Si ese es el caso, el elemento se elimina de la lista. 
        } else if (prevSelectedTemperaments.includes(selected[0])) {
          return prevSelectedTemperaments.filter((temperament) => temperament !== selected[0]);

        // Si los temperamentos seleccionados son 10 retorna los temperamentos ya seleccionados
        } else if (prevSelectedTemperaments.length >= 10) {
          return prevSelectedTemperaments;
        } else {
        
        // Si se selecciona un temperamento y este no esta en el array de selectedTemperaments, se añade cnop un push
          const newSelectedTemperaments = [...prevSelectedTemperaments];
          selected.forEach((temperament) => {
            if (!newSelectedTemperaments.includes(temperament)) {
              newSelectedTemperaments.push(temperament);
            }
          });
          return newSelectedTemperaments;
        }
      });
    }, []);
    

      function validate() {
        if (name === "" || !/^[a-zA-Z]+$/.test(name)) {
          alert("Please enter a valid name using only letters.");
          return false;
        }
      
        if (
          minWeight === "" ||
          maxWeight === "" ||
          isNaN(minWeight) ||
          isNaN(maxWeight) ||
          parseFloat(minWeight) < 0 ||
          parseFloat(maxWeight) < 0 ||
          parseFloat(minWeight) >= parseFloat(maxWeight)
        ) {
          alert("Please enter valid weight values.");
          return false;
        }
      
        if (
          minHeight === "" ||
          maxHeight === "" ||
          isNaN(minHeight) ||
          isNaN(maxHeight) ||
          parseFloat(minHeight) < 0 ||
          parseFloat(maxHeight) < 0 ||
          parseFloat(minHeight) >= parseFloat(maxHeight)
        ) {
          alert("Please enter valid height values.");
          return false;
        }
      
        if (
          minLifeSpan === "" ||
          maxLifeSpan === "" ||
          isNaN(minLifeSpan) ||
          isNaN(maxLifeSpan) ||
          parseInt(minLifeSpan) < 0 ||
          parseInt(maxLifeSpan) < 0 ||
          parseInt(minLifeSpan) >= parseInt(maxLifeSpan)
        ) {
          alert("Please enter valid lifespan values.");
          return false;
        }
      
        if (selectedTemperaments.length === 0) {
          alert("Please select at least one temperament.");
          return false;
        }
      
        if (imageURL === "" || !isValidImageURL(imageURL)) {
          alert("Please enter a valid image URL.");
          return false;
        }
      
        return true;
      }

      const breed = {
        name: name,
        metricHeight: minHeight + " - " + maxHeight,
        metricWeight: minWeight + " - " + maxWeight,
        life_span: minLifeSpan + " - " + maxLifeSpan + " years ",
        temperament: selectedTemperamentsIds,
        img: imageURL,
      }

      const clearForm = () => {
        setName("");
        setMinWeight("")
        setMaxWeight("")
        setMinHeight("")
        setMaxHeight("")
        setMinLifeSpan("")
        setMaxLifeSpan("")
        setSelectedTemperaments([])
        setSelectedTemperamentIds([])
        setImageURL("");
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        if (validate()) {
          postBreed(breed)
            .then((response) => {
              if (response.message === "Request failed with status code 404") {
                setStatus("Something went wrong")
              } else {
                setStatus("Breed created successfully!")
                clearForm();
                setTimeout(() => {
                  setStatus("")
                }, 7000);
              }
            })
        } 
      };
      

    return (
      <>
        <TitleBar type={"createBreed"} text={"Create your own breed!"}  />


        <div className="backgroundForm">

          <form onSubmit={handleSubmit}>
            
            <h1 className="titleForm">Introduce your breed's information</h1>
            <hr className="formSeparator"/>

            <div className="nameSection">
                <label htmlFor="breedName" className="formLabel">Your breed's name: </label>
                <input type="text" name="breedName" autoComplete="off" className="formInput" value={name} onChange={nameHandler} placeholder="Name"/>
            </div>

            <div className="weightSection">
                <label htmlFor="minWeight" className="formLabel">Your breed's weight (kg): </label>
                <input type="text" name="minWeight" autoComplete="off" className="formInput"value={minWeight} onChange={minWeightHandler} placeholder="Min weight"/>
                <input type="text" name="maxWeight" autoComplete="off" className="formInput" value={maxWeight} onChange={maxWeightHandler} placeholder="Max weight"/>
            </div>

            <div className="heightSection">
                <label htmlFor="minHeight" className="formLabel">Your breed's height (cm): </label>
                <input type="text" name="minHeight" autoComplete="off" className="formInput" value={minHeight} onChange={minHeightHandler} placeholder="Min height"/>
                <input type="text" name="maxHeight" autoComplete="off" className="formInput" value={maxHeight} onChange={maxHeightHandler} placeholder="Max height"/>
            </div>
      
            <div className="lifeSpanSection">
                <label htmlFor="minLifeSpan" className="formLabel">Your breed's life span (y): </label>
                <input type="text" name="minLifeSpan" autoComplete="off" className="formInput" value={minLifeSpan} onChange={minLifeSpanHandler} placeholder="Min lifespan"/>
                <input type="text" name="maxLifeSpan" autoComplete="off" className="formInput" value={maxLifeSpan} onChange={maxLifeSpanHandler} placeholder="Max lifespan"/>
            </div>

            <hr className="formSeparator"/>
      
            <div className="temperamentSection">
                <label htmlFor="temperaments-selector" className="formLabel">Your breed temperaments: </label>

                <select className="temperaments-selector" name="temperaments-selector" multiple value={selectedTemperaments} onChange={handleSelectTemperament}>
                    {temperaments.map((temperament) => (
                        <option key={temperament.id} value={temperament.temperament}>
                            {temperament.temperament}
                        </option>
                    ))}
                </select>

                <label className="tempSelect">Selected Temperaments (Max. 10):</label>
                {selectedTemperaments.length > 0 ? (
                    <p>{selectedTemperaments.join(", ")}</p>
                ) : (
                    <p>No temperaments selected</p>
                )}
                <button onClick={handleClearTemperaments} className="clearTemperamentsButton">Clear</button>
            </div>

            <hr className="formSeparator"/>
      
            <div className="imageSection">
                <label className="formLabel">Your breed url's image: </label>

                <input type="text" value={imageURL} className="formInput" onChange={handleInputChange} placeholder="http//yourDogImage.jpg"/>
                <div>
                    {imageURL ? (
                        isValidImageURL(imageURL) ? (
                            <img src={imageURL} className="formInput" alt="Breed" />
                        ) : (
                            <div className="noImageSquare">Insert a valid URL</div>
                        )) : (
                            <div className="noImageSquare">Insert an URL</div>
                    )}
                </div>

            </div>
            
            <div className="endForm">

              <button type="submit" className="submitButton">Submit</button>
              
              <span className="statusMessage">
                {status}
              </span>

            </div>

          </form>
        </div>

        <Footer />
        </>
      );
}