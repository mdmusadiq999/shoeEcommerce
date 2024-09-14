import AdminHome from "./Components/AdminHome";
import LoginSignup from "./Components/LoginSignup";
import Body from "./Components/Body";
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import './App.css'
import UpdateProduct from "./Components/UpdateProduct";

let App = ()=>{
  return(
    <Router>
    <Routes>
      <Route path="/" element={<AdminHome />} />
      <Route path="/loginsignup" element={<LoginSignup/>} />
      <Route path="/body" element={<Body />} />
      <Route path="/updateProduct/:id" element={<UpdateProduct />} />
    </Routes>
  </Router>
  )
}
export default App;