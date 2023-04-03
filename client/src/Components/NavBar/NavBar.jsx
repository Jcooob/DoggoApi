import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSelectedTemperaments, updateSelectedMode, getTemperaments, updateSelectedIdType } from "../../Redux/actions";
import "./NavBar.modules.css"
import logo from "../../Assets/doggoApiLogoBlack.png";

export default function NavBar() {
    
    const dispatch = useDispatch();

    const [selectedTemperaments, setSelectedTemperaments] = useState([]);
    const [selectedIdType, setSelectedIdType] = useState("all");
    const [filterLabel, setFilterLabel] = useState("");
    const [filterMode, setFilterMode] = useState("or");

    const temperaments = useSelector((state) => state.temperaments);

    useEffect(() => {
        dispatch(getTemperaments());
    }, []);

    useEffect(() => {
      setFilterLabel(" " + selectedTemperaments.filter(Boolean).join(", "));
    }, [selectedTemperaments]);

    //---------------------------------------------------------------

    const handleSelectTemperament = useCallback((e) => {
      
      // Se crea un array con un solo elemento, el cual es la opcion seleccionada en el selector
      const selected = Array.from(e.target.selectedOptions, (option) => option.value);
      
      //prevSelectedTemperaments es el estado previo de la lista de temperamentos seleccionados, antes que se produzca el onChange
      setSelectedTemperaments((prevSelectedTemperaments) => {
        
        // Si no hay temperamento seleccionado retorna un array vacio
        if (selected.length === 0) {
          return [];
        
        // Se comprueba si el primer elemento seleccionado ya está en la lista de elementos seleccionados. 
        // Si ese es el caso, el elemento se elimina de la lista.
        } else if (prevSelectedTemperaments.includes(selected[0])) {
          return prevSelectedTemperaments.filter((temperament) => temperament !== selected[0]);

        // Si los temperamentos seleccionados son 5 retorna los temperamentos ya seleccionados
        } else if (prevSelectedTemperaments.length >= 5) {
          return prevSelectedTemperaments;

        // Finalmente se crea una copia superficial de los temperamentos previamente seleccionados  
        } else {
          const newSelectedTemperaments = [...prevSelectedTemperaments];

        // Con un forEach se evalua si el temperamento seleccionado ya se encuentra en el array de seleccionado
        // Si esto es asi se añade dentro del array de temperamentos seleccionados y esto es lo que se retorna
          selected.forEach((temperament) => {
            if (!newSelectedTemperaments.includes(temperament)) {
              newSelectedTemperaments.push(temperament);
            }
          });
          return newSelectedTemperaments;
        }
      });
    }, []);
    
    const handleClearSelectedTemperaments = () => {
      setSelectedTemperaments([]);
    };

    const handleSelectIdType = useCallback((e) => {
        setSelectedIdType(e.target.value);
    }, []);

    const handleFilterModeChange = useCallback((e) => {
      setFilterMode(e.target.value)
    }, []);

    // Este useEffect se encarga de despachar hacia el estado global los filtros seleccionados en este componente (NavBar)
    useEffect(() => {
        dispatch(updateSelectedTemperaments(selectedTemperaments));
        dispatch(updateSelectedIdType(selectedIdType));
        dispatch(updateSelectedMode(filterMode));
    
    // Mira a todos los filtros, si estos cambian se ejecutara este useEffect
    }, [selectedTemperaments, selectedIdType, filterMode, dispatch]);

    return (
      
      
        <div className="NavBar"> 

            <Link to = {`/`}>
              <img src={logo} alt="Doggo Api Logo" className="logoNavBar" />
            </Link>
            
            <div className="selected-temperaments">

              <label className="selected-temperaments-label">Temperaments selected (max. 5):</label>

              <select className="temperaments-select" multiple value={selectedTemperaments} onChange={handleSelectTemperament}>
                {temperaments.map((temperament) => (
                  <option key={temperament.id} value={temperament.temperament}>
                    {temperament.temperament}
                  </option>
                ))}
              </select>

              {selectedTemperaments.length > 0 ? (
                <div className="temperaments-label">
                    {filterLabel}
                </div>
              ) : (
                <div className="temperaments-label-empty">
                  No temperaments selected
                </div>
              )}

              <div className="filterMode">
              <label className="and-label">
                <input
                  type="radio"
                  value="and"
                  checked={filterMode === "and"}
                  onChange={handleFilterModeChange}
                />
                  AND
              </label>

              <label className="or-label">
                <input
                  type="radio"
                  value="or"
                  checked={filterMode === "or"}
                  onChange={handleFilterModeChange}
                />
                  OR
              </label>
              </div>
              
              <button className="clearButton" onClick={handleClearSelectedTemperaments}>Clear</button>

            </div>

            <div className="sourceSelector">
                <label htmlFor="id-type-select">Source: </label>
                <select id="id-type-select" value={selectedIdType} onChange={handleSelectIdType}>
                    <option value="number">API</option>
                    <option value="string">DB</option>
                    <option value="all">All</option>
                </select>
            </div>

            <Link to = {`/manageBreeds`}>
              <button className="createBreed-button">Manage Breeds</button>
            </Link>

            

        </div>
    );
}
