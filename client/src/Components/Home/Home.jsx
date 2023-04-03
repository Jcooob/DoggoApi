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

    const [searchTerm, setSearchTerm] = useState(""); // Término de busqueda
    const [filteredBreeds, setFilteredBreeds] = useState([]); // Razas filtradas por temperamentos
    const [selectedTemperaments, setSelectedTemperaments] = useState([]) // Temperamentos seleccionados
    const [currentPage, setCurrentPage] = useState(1); // Selector de pagina
    const [resultsPerPage, setResultsPerPage] = useState(8); // Elementos mostrados en pagina
    const [activeSort, setActiveSort] = useState("nameAsc"); // Selector de ordenamiento

    const breeds = useSelector((state) => state.dogs); // Se traen del estado global las razas de perros
    const temperaments = useSelector((state) => state.selectedTemperaments) // Se traen del estado global los temperamentos seleccionados en el componente NavBar
    const source = useSelector((state) => state.selectedIdType) // Selector del tipo de fuente (API, DB, ALL), se trae del estado global
    const mode = useSelector((state) => state.selectedMode) // Selector de OR o AND, se trae del estado global
    
    //===================================== Paginador ========================================

    // IndexOfLastResult: es el índice del último elemento de la página actual y se calcula multiplicando el número de 
    // la página actual por el número de resultados por página.
    const indexOfLastResult = currentPage * resultsPerPage;

    // IndexOfFirstResult: es el índice del primer elemento de la página actual y se calcula restando el número de resultados 
    // por página del índice del último resultado de la página actual.
    const indexOfFirstResult = indexOfLastResult - resultsPerPage; 

    // CurrentResults: es un arreglo que contiene los elementos de la página actual, que se obtiene al cortar el arreglo filteredBreeds desde 
    // el índice del primer resultado hasta el índice del último resultado de la página actual.
    const currentResults = filteredBreeds.slice(indexOfFirstResult, indexOfLastResult);

    // TotalPages: es el número total de páginas que se necesitan para mostrar todos los elementos de filteredBreeds, que se obtiene dividiendo 
    // la longitud del arreglo filteredBreeds por el número de resultados por página y redondeando hacia arriba con la función Math.ceil().
    const totalPages = Math.ceil(filteredBreeds.length / resultsPerPage); 
    
    // Se aumenta de pagina
    const nextPage = () => {
      if (currentPage < totalPages) { // Solo se aumenta si la pagina actual es menor a la cantidad total de paginas
        setCurrentPage(currentPage + 1);
      }
    };
    
    // Se retrocede de pagina
    const previousPage = () => {
      if (currentPage > 1) { // Solo se retrocede siempre y cuando la pagina actual sea mayor que 1
        setCurrentPage(currentPage - 1);
      }
    };
    
    // Se setea la pagina en la que se haya hecho click
    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber); 
      }
    
      
      //===================================== UseEffects ========================================

    // Se suben al array del estado global los perros recibidos con la funcion getAllDogs
    useEffect(() => {
        dispatch(getAllDogs());
    }, []);
    
    // Este useEffect no tiene array de dependencias porque se tiene que ejecutar cada que se actualiza un temperamento en el estado global, 
    // Si tuviera un array de dependencias solo se renderizaria una sola vez, y no cada que se actualizan los temperamentos seleccionados
    useEffect(() => {
        setSelectedTemperaments(temperaments)
    })

    useEffect(() => {

        if (selectedTemperaments.length === 0 && source === "all") {
          setActiveSort("nameAsc")
          setCurrentPage(1)
          setFilteredBreeds(breeds.filter((breed) => breed.name.toLowerCase().includes(searchTerm.toLowerCase())));

        // Si hay temperamentos seleccionados, se filtran las razas según estos temperamentos.
        // Dependiendo del modo de filtrado (and / or), se utilizan diferentes lógicas de filtrado.

        } else {
          const filteredBreedsByTemperament = breeds.filter((breed) => {
            const breedTemperaments = breed.temperament?.split(', ');
            if (mode === "and") {
              // Retorna las razas que incluyan a todos los temperamentos seleccionados
              return selectedTemperaments.every((temperament) => breedTemperaments?.includes(temperament));
            } else if (mode === "or" && selectedTemperaments.length === 0) {
              return true;
            } else if (mode === "or" && selectedTemperaments.length > 0){
              // Retorna las razas que incluyan al menos uno de los temperamentos seleccionados
              return selectedTemperaments.some((temperament) => breedTemperaments?.includes(temperament));
            }
            return true;
          });

          // Una vez filtradas las razas por temperamentos se procede a filtrar por la fuente de la raza
          const filteredBreedsByIdType = filteredBreedsByTemperament.filter((breed) => {
            const breedId = breed.id;

            //Si el source selector es de tipo number; se mostraran las razas de la API (Tipo de ID: number)
            if (source === "number") {
              setActiveSort("nameAsc")
              setCurrentPage(1)
              return typeof breedId === "number";

            //Si el source selector es de tipo string; se mostraran las razas de la DB (Tipo de ID: string)
            } else if (source === "string") {
              setActiveSort("nameAsc")
              setCurrentPage(1)
              return typeof breedId === "string";
            } else {
            
              setActiveSort("nameAsc")
              setCurrentPage(1)
              return true;
            }
          });
          setActiveSort("nameAsc")
          setCurrentPage(1)

          //Por ultimo se establecen como razas filtradas las razas que retornan true luego de haber pasado por todo el sistema de filtrado
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

                    {/* Se crea un array de la totalidad de las paginas, y con el metodo map se crea un boton por cada elemento en dicho array. */}
                    {/* (_, i) se utiliza para ignorar el primer argimento (por convencion) y utilizar solo el segundi (i), el cual se utiliza para generar
                    numeros de pagina consecutivos comenzando desde la pagina 1 */}

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

