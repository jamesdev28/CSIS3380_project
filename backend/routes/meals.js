const router = require("express").Router();
let Meals = require("../models/meal.model");
router.route("/").get((req, res) => {
    Meals.find()
    .then((todos) => res.json(todos))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route('/add').post(async (req, res) => {
    const strMeal = req.body.strMeal;
    const strMealThumb = req.body.strMealThumb;
    const idMeal = req.body.idMeal;
    
    const newMeal = new Meals({
        strMeal,
        strMealThumb,
        idMeal,
    });
    console.log(newMeal);
    newMeal
        .save()
        .then(() => res.json("Meals added!"))
        .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/:id").get((req, res) => {
    Meals.findById(req.params.id)
    .then((todo) => res.json(todo))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/delete/:id").delete(async (req, res) => {
    console.log(req.params.id);
   await Meals.findByIdAndDelete(req.params.id)
    .then(() => res.json("Meals deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/update/:id").post((req, res) => {
    Meals.findById(req.params.id)
    .then((todo) => {
        todo.activity = req.body.activity;
        todo.save()
            .then(() => res.json("Meals updated!"))
            .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;