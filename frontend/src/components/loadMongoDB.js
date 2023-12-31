import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Link } from 'react-router-dom';
import axios from "axios";

const Header = (props) => {
    return (
        <h2>{props.header}</h2>
    )
};
const Card = (props) => {
    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={props.url} alt={props.desc} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{props.cardTitle}</h5>
                <p className="card-text">{props.desc}</p>
              </div>
              <div className="card-footer">
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => props.deleteTodo(props.id)} >
                  Delete
                </button>
              </div>
            </div>
          </div>
    );
}

export default function LoadMongo() {
    const [meals, setTodoList] = useState([]);
    const [searchTerm, setSearchTerm] = useState(``);

    useEffect(() => {
        axios
            .get('/meals')
            .then((response) => {
                setTodoList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const deleteTodo = (id) => {
        axios
            .delete('/meals/delete/' + id)
            .then((response) => {
                console.log(response.data);
            });

        setTodoList(meals.filter((el) => el._id !== id));
    };
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
                            <Link to="/mongo" className='nav-link'>James's favorite Meals</Link>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchTerm(e.target.value)}></input>
                    </form>
                </div>
            </nav>
            <div>
                <Header header="Your Meals" />
            </div>
            
            <div className="row">

                {meals.filter((meal)=>{
                    if(searchTerm === "") {
                        return true;
                    }
                    return meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase());
                }).map((data) => (
                    <Card
                        url={data.strMealThumb}
                        desc={data.strMeal}
                        cardTitle={data.idMeal}
                        id={data._id}
                        key={data._id.toString()}
                        deleteTodo={deleteTodo}
                    />)
                )}
            </div>
        </div>
    )
}