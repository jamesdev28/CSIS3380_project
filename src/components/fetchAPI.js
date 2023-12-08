import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
export default function FetchAPI() {
    const [meals, setMeals] = useState([]);
    const randomNumber = Math.floor(Math.random() * 16) + 1;

    const Header = (props) => {
        return (
            <h2>{props.header}</h2>
        )
    };

    const Card = (props) => {
        return (
            <div className="col-3">
                <div className="card">
                    <img src={props.url} alt="Test" className="card-img-top" />
                    <div className="card-body">
                        <h3 className="card-title">{props.cardTitle}</h3>
                        <p>{props.desc}</p>
                        <hr />
                        <div className="row">
                            <div className="col-sm-8"><button type="button" className="btn btn-outline-danger" onClick={() => props.deleteTodo(props.id)}>Delete</button></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    const deleteTodo = (id) => {
        setMeals(meals.filter((el) => el.idMeal !== id));
    };
    const addRandom = async () => {
        const randomApi = 'https://www.themealdb.com/api/json/v1/1/random.php';
        let response = await fetch(randomApi);
        let json = await response.json();
        setMeals(meals.concat(json.meals[0]));
    };
    const [searchTerm, setSearchTerm] = useState(``);
    const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood';
    const fetchPosts = () => {
        fetch(url)
            .then((response) => response.json()).then((data) => {
                setMeals(data.meals.slice(randomNumber, randomNumber + 12));
                console.log(data.meals.length);
            })
            .catch((error) => console.error(error));
    };
    useEffect(() => {
        if (meals.length === 0) {
            fetchPosts();
            //console.log(data);
        }
    });

    return (

        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">Your Meal</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">List API</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Add an Item</Link>
                        </li>
                        <li className='navbar-item'>
                            <Link to="/mongo" className='nav-link'>Show Datas</Link>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchTerm(e.target.value)}></input>
                    </form>
                </div>
            </nav>
            <Header header="Your Favourite Meals" />
            <div className="row">

                {meals.filter((food)=>{
                    if(searchTerm === "") {
                        return true;
                    }
                    return food.strMeal.toLowerCase().includes(searchTerm.toLowerCase());
                }).map((food) => (
                    <Card
                        url={food.strMealThumb}
                        desc={food.strMeal}
                        cardTitle={food.idMeal}
                        id={food.idMeal}
                        key={food.idMeal.toString()}
                        deleteTodo={deleteTodo}
                    />)
                )}
            </div>
            <button type="button" className="btn btn-primary" onClick={ addRandom }>Add</button>
        </div>
    )
}





