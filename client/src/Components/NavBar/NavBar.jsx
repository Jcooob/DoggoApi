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

    const handleSelectTemperament = useCallback((e) => {
      const selected = Array.from(e.target.selectedOptions, (option) => option.value);
      setSelectedTemperaments((prevSelectedTemperaments) => {
        if (selected.length === 0) {
          return [];
        } else if (prevSelectedTemperaments.includes(selected[0])) {
          return prevSelectedTemperaments.filter((temperament) => temperament !== selected[0]);
        } else if (prevSelectedTemperaments.length >= 5) {
          return prevSelectedTemperaments;
        } else {
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
    
    const handleClearSelectedTemperaments = () => {
      setSelectedTemperaments([]);
    };

    const handleSelectIdType = useCallback((e) => {
        setSelectedIdType(e.target.value);
    }, []);

    const handleFilterModeChange = useCallback((e) => {
      setFilterMode(e.target.value)
    }, []);

    useEffect(() => {
        dispatch(updateSelectedTemperaments(selectedTemperaments));
        dispatch(updateSelectedIdType(selectedIdType));
        dispatch(updateSelectedMode(filterMode));
    }, [selectedTemperaments, selectedIdType, filterMode, dispatch]);

    return (
      
      
        <div className="NavBar"> 

            <Link to = {`/`}>
              <img src={logo} alt="Doggo Api Logo" className="logo" />
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
