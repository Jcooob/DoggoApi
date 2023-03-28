import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllDogs } from "../../Redux/actions";
import { getAverageLifeSpan, getAverageWeight } from "../../Utils/GetAverageFunctions"
import LoadingScreen from "../LoadingScreen/LoadingScreen"
import NavBar from "../NavBar/NavBar";
import Breeds from "../Breeds/Breeds";
import Footer from "../Footer/Footer";
import "./Home.modules.css"

  
/*--------------------------------------------------------------------*/

const Home = () => {

    const dispatch = useDispatch(); 

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredBreeds, setFilteredBreeds] = useState([]);
    const [selectedTemperaments, setSelectedTemperaments] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(8);
    const [activeSort, setActiveSort] = useState("nameAsc");
    const breeds = useSelector((state) => state.dogs);
    const temperaments = useSelector((state) => state.selectedTemperaments)
    const source = useSelector((state) => state.selectedIdType)
    const mode = useSelector((state) => state.selectedMode)

    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = filteredBreeds.slice(indexOfFirstResult, indexOfLastResult);
    const totalPages = Math.ceil(filteredBreeds.length / resultsPerPage);

    const nextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };

    const previousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    useEffect(() => {
        dispatch(getAllDogs());
    }, []);
    
    useEffect(() => {
        setSelectedTemperaments(temperaments)
    })

    useEffect(() => {

      // Si no hay ningún temperamento seleccionado y la fuente es "all", se establece
      // el orden activo en "nameAsc" y se filtran las razas según el término de búsqueda.

        if (selectedTemperaments.length === 0 && source === "all") {
          setActiveSort("nameAsc")

          //Si no hay temperamentos seleccionados y la fuente es "all", el unico "filtro" activo es el de la search bar
          //El metodo filter devuelve un nuevo array con los elementos que cumplan con determinada condicion
          //Se evalua si el nombre de la raza convertido a minuscula incluye el termino introducido en la search bar convertido a minuscula
          //Con el metodo includes, si esto se cumple devuelve true, sino false. De esta manera se eliminan los perros que no cumplan con dicha condicion.
          //El método includes() devuelve true si la cadena de texto especificada está contenida en la cadena que se está evaluando, y false si no lo está.
          setFilteredBreeds(breeds.filter((breed) => breed.name.toLowerCase().includes(searchTerm.toLowerCase())));

        // Si hay temperamentos seleccionados, se filtran las razas según estos temperamentos.
        // Dependiendo del modo de filtrado (and / or), se utilizan diferentes lógicas de filtrado.

        } else {
          const filteredBreedsByTemperament = breeds.filter((breed) => {

            //Se separan los temperamentos de la raza (los cuales estan en una string separados por comas)

            const breedTemperaments = breed.temperament?.split(', ');

            //Si el modo es "and" con el metodo every solo las razas que cumplan con todos los 
            //temperamentos seleccionados (selectedTemperaments) retornaran true.
            if (mode === "and") {
              return selectedTemperaments.every((temperament) => breedTemperaments?.includes(temperament));

            //Si el modo es "or" y NO hay temperamentos seleccionados todas las razas retornaran true.
            } else if (mode === "or" && selectedTemperaments.length === 0) {
              return true;
              
            //Si el modo es "or" y SI hay temperamentos seleccionados todas las razas que al menos cumplan
            //con un temperamento seleccionado daran true.
            } else if (mode === "or" && selectedTemperaments.length > 0){
              return selectedTemperaments.some((temperament) => breedTemperaments?.includes(temperament));
            }
            //Si no todo retornara true.
            return true;
          });

          //Ahora se procede a filtrar por la fuente de la raza
          const filteredBreedsByIdType = filteredBreedsByTemperament.filter((breed) => {
            const breedId = breed.id;

            //Por cada raza filtrada por temperamento se realiza este proceso, solo retornan true las razas cuyo tipo de id
            //sea el seleccionado por el usuario. Las razas que retornan false (que no superan los filtros) no se muestran.

            //Si el source selector es de tipo number; se mostraran las razas de la API
            if (source === "number") {
              setActiveSort("nameAsc")
              setCurrentPage(1)
              return typeof breedId === "number";

            //Si el source selector es de tipo string; se mostraran las razas de la DB
            } else if (source === "string") {
              setActiveSort("nameAsc")
              setCurrentPage(1)
              return typeof breedId === "string";
            } else {
            
            //Si el source selector es ALL se mostraran todas las razas ya que todas retornaran true
              setActiveSort("nameAsc")
              setCurrentPage(1)
              return true;
            }
          });
          setActiveSort("nameAsc")
          setCurrentPage(1)

          //Por ultimo se setean como razas filtradas las razas que cumplan con el contenido de la searchBar, que funciona igual que los filtros anteriores
          setFilteredBreeds(filteredBreedsByIdType.filter((breed) => breed.name.toLowerCase().includes(searchTerm.toLowerCase())));
        }
    }, [selectedTemperaments, source, searchTerm, breeds, mode]);


    //================================================= Seccion Ordenamientos de razas =======================================================================

        // En esta seccion se muestran los handlers para los ordenamientos de las razas

        // Localcompare indica si una string es menor o mayor que otra segun su orden lexicografico

        // [...filteredBreeds] es una copia superficial (shallow copy) de filteredBreeds.
        // La razón por la que se utiliza una copia superficial en este caso es porque la función sort() es un método destructivo, 
        // lo que significa que modifica directamente el array sobre el que se llama en lugar de crear un nuevo array ordenado. 
        // Al hacer una copia superficial antes de ordenar, se evita modificar directamente el array original y se garantiza que los 
        // cambios se realicen en el nuevo array sortedBreeds.

    const sortDogsByNameAsc = () => {
      const sortedBreeds = [...filteredBreeds].sort((a, b) => a.name.localeCompare(b.name));
      setFilteredBreeds(sortedBreeds);
      setActiveSort("nameAsc");
    };
    
    const sortDogsByNameDesc = () => {
      const sortedBreeds = [...filteredBreeds].sort((a, b) => b.name.localeCompare(a.name));
      setFilteredBreeds(sortedBreeds);
      setActiveSort("nameDesc");
    };
    
    const sortDogsByWeightAsc = () => {
      const sortedBreeds = filteredBreeds.sort((a, b) => {
        return getAverageWeight(a.weight) - getAverageWeight(b.weight);
      });
      setFilteredBreeds(sortedBreeds);
      setActiveSort("weightAsc");
    };

    const sortDogsByWeightDesc = () => {
      const sortedBreeds = filteredBreeds.sort((a, b) => {
        return getAverageWeight(b.weight) - getAverageWeight(a.weight);
      });
      setFilteredBreeds(sortedBreeds);
      setActiveSort("weightDesc");
    };

    const sortDogsByLifespanAsc = () => {
      const sortedBreeds = [...filteredBreeds].sort((a, b) => {
        const aLifespan = getAverageLifeSpan(a.life_span);
        const bLifespan = getAverageLifeSpan(b.life_span);
        return aLifespan - bLifespan;
      });
      setFilteredBreeds(sortedBreeds);
      setActiveSort("lifespanAsc");
    };
    
    const sortDogsByLifespanDesc = () => {
      const sortedBreeds = [...filteredBreeds].sort((a, b) => {
        const aLifespan = getAverageLifeSpan(a.life_span);
        const bLifespan = getAverageLifeSpan(b.life_span);
        return bLifespan - aLifespan;
      });
      setFilteredBreeds(sortedBreeds);
      setActiveSort("lifespanDesc");
    };

    //===================================================== Finalizacion ordenamientos ==========================================================
    

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
      }

    if (breeds.length === 0) {
        return <LoadingScreen />;
    }

    return (
        <>
            <div className="bodyHome">

                <NavBar />

                <div className="searchBar">
                    <input 
                        type="text"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="sortBar">

                  <button className = {`sortButton ${activeSort === "nameAsc" ? "active" : ""}`}
                    onClick={sortDogsByNameAsc}
                  >
                    A-Z
                  </button>
                  
                  <button className = {`sortButton ${activeSort === "nameDesc" ? "active" : ""}`}
                    onClick={sortDogsByNameDesc}
                  >
                    Z-A
                  </button>

                  <button className = {`sortButton ${activeSort === "weightAsc" ? "active" : ""}`}
                    onClick={sortDogsByWeightAsc}
                  >
                    Weight (asc)
                  </button>

                  <button className = {`sortButton ${activeSort === "weightDesc" ? "active" : ""}`}
                    onClick={sortDogsByWeightDesc}
                  >
                    Weight (desc)
                  </button> 

                  <button className={`sortButton ${activeSort === "lifespanAsc" ? "active" : ""}`} 
                    onClick={sortDogsByLifespanAsc}>
                    Life Span (asc)
                  </button>

                  <button className={`sortButton ${activeSort === "lifespanDesc" ? "active" : ""}`} 
                    onClick={sortDogsByLifespanDesc}>
                    Life Span (desc)
                  </button>


                </div>

                <Breeds breeds={currentResults}/>


                
                <div className="pagination">

                    <button onClick={() => previousPage()}>
                        Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button key={page} onClick={() => handleClick(page)} className={page === currentPage ? "active" : ""}>
                            {page}
                        </button>
                    ))}

                    <button onClick={() => nextPage()}>
                        Next
                    </button>

                </div>
                
                <Footer />

            </div>
        </>
    );
};

export default Home;

