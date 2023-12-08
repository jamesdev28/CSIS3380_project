
import "bootstrap/dist/css/bootstrap.min.css";
import FetchAPI from "./components/fetchAPI";
import LoadMongo from "./components/loadMongoDB.js";
import AddMeal from "./components/addMeal";
import { BrowserRouter, Routes, Route} from "react-router-dom";



export default function App() {
    

    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<FetchAPI/>}/>
            <Route path="/mongo" element={<LoadMongo/>}/>
            <Route path="/create" element={<AddMeal/>}/>
        </Routes>
        </BrowserRouter>

    );
}





