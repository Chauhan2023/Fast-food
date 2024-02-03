import "./App.css";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Login from "./screens/Longin";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from "./screens/Signup";
import { CartProvider } from "./component/ContextReducer";
import MyOrder from "./screens/Screens/MyOrder";



function App() {
  return (
    <>
    <CartProvider>
      <Router>
      
        <div>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/login" element={<Login/>}></Route>
            <Route exact path ='/signup' element={<Signup/>}></Route>
            <Route exact path ='/signup' element={<Signup/>}></Route>
            <Route exact path ='/myOrder' element={<MyOrder/>}></Route>
          </Routes>
        </div>
      </Router>
      </CartProvider>
    </>
  );
}

export default App;
