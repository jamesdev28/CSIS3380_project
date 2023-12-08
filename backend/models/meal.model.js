const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealSchema = new Schema({
    strMeal: { type: String, required: true },
    strMealThumb: { type: String, required: true },
    idMeal: { type: Number, required: true },

});
const Meals = mongoose.model("MealDB", mealSchema);
module.exports = Meals;