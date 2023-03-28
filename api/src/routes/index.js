const { Router, query } = require('express');
const { getBreeds } = require("../Controllers/getBreeds/index");
const { getBreedById } = require("../Controllers/getBreedById/index");
const { getTemperaments } = require("../Controllers/getTemperaments/index")
const { postBreed } = require("../Controllers/postDogs/index")
const { getDBBreeds } = require("../Controllers/getDBBreeds/index");
const { deleteBreed } = require("../Controllers/deleteBreed/index");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//------------------------------------getDogs--------------------------------------------

router.get("/dogs", async (req, res) => {
    const {name} = req.query
    try {
        const dogs = await getBreeds(name);
        res.status(200).json(dogs);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

//-----------------------------------getDogsDB-------------------------------------------

router.get("/dogsDB", async (req, res) => {
    try {
        const dogsDB = await getDBBreeds()
        res.status(200).json(dogsDB);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

//-----------------------------------getDogsId-------------------------------------------

router.get("/dogs/:breedId", async (req, res) => {

    const {breedId} = req.params;
    
    try {
        const breed = await getBreedById(breedId);
        res.status(200).json(breed);
    } catch(error) {
        res.status(404).json({error: error.message})
    }
})

//-----------------------------------getTemperaments-------------------------------------------

router.get("/temperaments", async (req, res) => {
    try {
        const temperaments = await getTemperaments();
        res.status(200).json(temperaments);
    } catch(error) {
        res.status(400).json({error: error.message})
    }
})

//-----------------------------------postDogs-------------------------------------------

router.post("/dogs", async (req, res) => {
    const {name, metricHeight, metricWeight, life_span, temperament, img} = req.body;
    try {
        const newBreed = await postBreed(name, metricHeight, metricWeight, life_span, temperament, img)
        res.status(200).json(newBreed);
    } catch(error) {
        res.status(404).json({error: error.message})
    }
})

//-----------------------------------deleteDogs-------------------------------------------

router.delete("/deleteDogs/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBreed = await (deleteBreed(id))
        res.status(200).json(deletedBreed);
    } catch(error) {
        res.status(404).json({error: error.message})
    }
})




module.exports = router;
