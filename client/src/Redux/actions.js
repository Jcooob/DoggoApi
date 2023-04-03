import { GET_ALL_DOGS, GET_DOG_DETAILS, GET_TEMPERAMENTS, CLEAN_DOG_DETAILS, SET_SELECTED_TEMPERAMENTS, SET_SELECTED_MODE, UPDATE_SELECTED_ID_TYPE, GET_DB_BREEDS } from "./action-types";
import axios from "axios";

export const getAllDogs = () => {
    return function(dispatch) {
        fetch("http://localhost:3001/dogs")
        .then(result => result.json())
        .then(data => {
            return dispatch({type: GET_ALL_DOGS, payload: data});
        })
    }
}

export const getDogDetails = (id) => {
    return function(dispatch) {
        fetch(`http://localhost:3001/dogs/${id}`)
        .then(result => result.json())
        .then(dog => {
            return dispatch({type: GET_DOG_DETAILS, payload: dog})
        })
    }
}

export const getDBBreeds = () => {
    return function(dispatch) {
        fetch("http://localhost:3001/dogsDB")
        .then(result => result.json())
        .then(breeds => {
            return dispatch({type: GET_DB_BREEDS, payload: breeds})
        })
    }   
}

export const getTemperaments = () => {
    return function(dispatch) {
        fetch("http://localhost:3001/temperaments")
        .then(result => result.json())
        .then(data => {
            return dispatch({type: GET_TEMPERAMENTS, payload: data})
        })
    }
}

export const deleteBreed = async(id) => {
    try {
        const response = await axios.delete(`http://localhost:3001/deleteDogs/${id}`)
        return(response)
    } catch (error) {
        
        return(error.message)
    }
}

export const postBreed = async(dog) => {
    const data = {
        name: dog.name,
        metricHeight: dog.metricHeight,
        metricWeight: dog.metricWeight,
        life_span: dog.life_span,
        temperament: dog.temperament,
        img: dog.img
    } 
    try {
        const response = await axios.post("http://localhost:3001/dogs", data);
        return(response)
    } catch (error) {
        return (error);
    }
}


export const updateSelectedTemperaments = (temperaments) => {
    return {
      type: SET_SELECTED_TEMPERAMENTS,
      payload: temperaments,
    }
}

export const updateSelectedMode = (mode) => {
    return {
        type: SET_SELECTED_MODE,
        payload: mode,
    }
}

export const updateSelectedIdType = (idType) => {
    return {
        type: UPDATE_SELECTED_ID_TYPE,
        payload: idType,
    }
}

export const cleanDogDetails = () => {
    return {type: CLEAN_DOG_DETAILS}
}
  