const express = require("express");
const Validator = require("validator");

const Recipe = require("../models/recipe");

const router = express.Router();

//Get all recipes
router.get("/recipes", (req, res, next) => {
  Recipe.find()
    .then(recipes => {
      res.status(200).send(recipes);
    })
    .catch(error => {
      res.status(400).send("Error" + error);
    });
});

//Get a single recipe by id
router.get("/recipes/:id", (req, res, next) => {
  Recipe.findOne({ _id: req.params.id })
    .then(recipe => {
      res.status(200).send({ success: true, data: recipe });
    })
    .catch(error => {
      res.status(400).send("Error" + error);
    });
});

//create new recipe
router.post("/recipes", (req, res, next) => {
  const errors = [];
  const { title, ingredients, instructions, time, difficulty } = req.body;

  if (Validator.isEmpty(title)) {
    errors.push({ message: "title field is required" });
  }

  if (Validator.isEmpty(ingredients)) {
    errors.push({ message: "ingredients field is required" });
  }

  if (Validator.isEmpty(instructions)) {
    errors.push({ message: "instructions field is required" });
  }

  if (errors.length > 0) {
    res.send(errors);
  } else {
    Recipe.create({
      title,
      ingredients,
      instructions,
      time,
      difficulty
    })
      .then(recipe => {
        res.status(201).send(recipe);
      })
      .catch(error => {
        res.status(400).send("Error" + error);
      });
  }
});

//Update a recipe
router.put("/recipes/:id", (req, res, next) => {
  Recipe.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(recipe => {
      res.status(200).send(recipe);
    })
    .catch(error => {
      res.status(400).send("Error" + error);
    });
});

//Delete a recipe
router.delete("/recipes/:id", (req, res, next) => {
  Recipe.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).send({
        message: "Deleted"
      });
    })
    .catch(error => {
      res.status(400).send("Error" + error);
    });
});

module.exports = router;
