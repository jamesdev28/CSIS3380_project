import React, { useState } from "react";
import Navbar from "./navbar";
import axios from "axios";

export default function AddMeal() {
    const [strMeal, setStrMeal] = useState(``);
    const [strMealThumb, setStrThumb] = useState(``);
    const [idMeal, setIdMeal] = useState(``);

    const onSubmit = (e) => {
        e.preventDefault();
        const newMeal = {
            strMeal: strMeal,
            strMealThumb: strMealThumb,
            idMeal: idMeal };

            console.log(newMeal);
        axios
            .post('/meals/add', newMeal)
            .then((res) => {
                window.location = '/';
            });

    };
    return (
        <div className="container">
            <Navbar />
            <h2>Add Item</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Meal Name</label>
                    <input required
                        type="text"
                        className="form-control"
                        id="name"
                        value={strMeal}
                        onChange={(e) => setStrMeal(e.target.value )}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Link Meal</label>
                    <input
                        type="text"
                        className="form-control"
                        id="link"
                        value={strMealThumb}
                        onChange={(e) => setStrThumb(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={idMeal}
                        onChange={(e) => setIdMeal(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create Meal"
                        className="btn btn-primary"
                    />
                </div>

            </form>
        </div>
    )


}