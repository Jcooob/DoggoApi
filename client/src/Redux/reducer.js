import { GET_ALL_DOGS, GET_DOG_DETAILS, SET_SELECTED_TEMPERAMENTS, SET_SELECTED_MODE, GET_TEMPERAMENTS, CLEAN_DOG_DETAILS, UPDATE_SELECTED_ID_TYPE, GET_DB_BREEDS } from "./action-types";

const initialState = {
    dogs: [],
    dogDetails: null,
    temperaments: [],
    selectedTemperaments: [],
    selectedIdType: "all",
    selectedMode: "",
    dbBreeds: [],
}

const reducer = (state = initialState, action) => {
    switch(action.type) {

        case GET_DB_BREEDS:
            return {
                ...state,
                dbBreeds: action.payload
            }

        case GET_ALL_DOGS:
            return {
                ...state,
                dogs: action.payload
            }

        case GET_DOG_DETAILS:
            return {
                ...state,
                dogDetails: action.payload
            }
        
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            } 
        
        case SET_SELECTED_TEMPERAMENTS:
            return {
                ...state,
                selectedTemperaments: action.payload,
            };
        
        case SET_SELECTED_MODE:
            return {
                ...state,
                selectedMode: action.payload
            }
        
        case UPDATE_SELECTED_ID_TYPE:
            return {
                ...state,
                selectedIdType: action.payload,
            }

        case CLEAN_DOG_DETAILS:
            return {
                ...state,
                dogDetails: null  
            }
                       
        default:
            return {
                ...state
            }
    }
}

export default reducer;
