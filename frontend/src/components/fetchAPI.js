import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
export default function FetchAPI() {
    const [meals, setMeals] = useState([]);
    const randomNumber = Math.floor(Math.random() * 16) + 1;

    const Header = (props) => {
        const headerStyle = {
            backgroundColor: '#333',
            color: '#fff',            
            padding: '10px',           
            textAlign: 'center',       
          };
        
          return (
            <h3 style={headerStyle}>{props.header}</h3>
          );
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
      };
      
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
                setMeals(data.meals.slice(randomNumber, randomNumber + 9));
                console.log(data.meals.length);
            })
            .catch((error) => console.error(error));
    };
    useEffect(() => {
        if (meals.length === 0) {
            fetchPosts();
        }
    });

    return (

        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">Meal Around The World</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">API</Link>
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
            <Header header="List of Meals" />
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
            <br/>
            <button type="button" className="btn btn-primary" onClick={ addRandom }>Add New Meal</button>
        </div>
    )
}





