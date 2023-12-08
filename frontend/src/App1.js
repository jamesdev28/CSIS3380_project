import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.js";
import TodosList from "./components/listapi.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";



export default function App() {
    const [data, setPosts] = useState([]);
    
    
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
                    </div>
                </div>
            </div>
        );
    }

    const url = 'http://localhost:4000/todos/';
    useEffect(()=> {
        axios.get(url).then((response)=> {
            setPosts(response.data);
        })
        .catch((error)=>{
            console.log(error)
        });
    }, []);
    
    return (
        <Router>
           
            <div className="container">
                <Navbar/>
                <Routes>
                <Route path="/todo" exact component={TodosList} />
                </Routes>
                
                 <div>
                    <Header header="Your Meals" />
                    <div className="row">

                        {data.map((data) => (
                            <Card
                                url={data.strMealThumb}
                                desc={data.strMeal}
                                cardTitle={data.idMeal}
                                id={data.idMeal}
                                key={data.idMeal.toString()}
                            />)
                        )}
                    </div>
                </div>
            </div>
        </Router>

    )
}





