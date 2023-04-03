import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDogDetails, cleanDogDetails } from "../../Redux/actions"; 
import { getAverageWeight } from "../../Utils/GetAverageFunctions"
import React from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen"
import TitleBar from "../TitleBar/TitleBar"
import Footer from "../Footer/Footer";
import "./BreedDetail.modules.css"

const BreedDetail = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const breed = useSelector(state => state.dogDetails)

    React.useEffect(() => {
        dispatch(getDogDetails(id));
        return () => dispatch(cleanDogDetails());
      }, [])

    if (!breed) {
        return (
            <LoadingScreen />
        )
    } else {

    return (
        <>
            

            <TitleBar type={"detail"} text={breed.name}  />

            <div className="bodyDetail">
                    
                <div className="breedData">

                    <div className="infoMinor">

                    {breed.temperament && (
                        <p className="infoBreed">Temperaments: {breed.temperament}</p>)}

                    {breed.bred_for && (
                        <p className="infoBreed">Bred for: {breed.bred_for}</p>
                    )}

                    {breed.breed_group && (
                        <p className="infoBreed">Breed group: {breed.breed_group}</p>
                    )}

                    {breed.origin && (
                        <p className="infoBreed">Origin: {breed.origin}</p>
                    )}

                    {breed.life_span && (
                        <p className="infoBreed">Life Span: {breed.life_span}</p>
                    )}

                    {breed.height && (
                        <p className="infoBreed">Height: {breed.height.metric} cm or {breed.height.imperial} inches</p>
                    )}

                    {breed.weight && (
                        <p className="infoBreed">Weight: {breed.weight.metric} kg or {breed.weight.imperial} lbs</p>
                    )}

                    </div>

                    {breed.description && (
                        <p className="descriptionBreed">Description: {breed.description}</p>
                    )}

                </div>

                <div className="imageBackground">
                    <img className="dogImg" src={breed.image.url} alt={breed.name} />
                </div>
                
                    
            </div>

            <Footer />
        </>
    )
                    }
}

export default BreedDetail;