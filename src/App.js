import { BrowserRouter, Route, Routes } from "react-router-dom";
import Client from "./Layouts/Client";
import Home from "./pages/Home/Index.jsx"
import Doctors from "./pages/Doctors/Index.jsx"
import AboutUs from "./pages/AboutUs/Index.jsx"
import Contact from "./pages/Contact/Index.jsx"
import Login from "./pages/Login/Index.jsx"
import Appoinment from "./pages/Appoinment/Index.jsx"

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Client/>}>
          <Route index element={<Home/>}/>
          <Route path="/doctors" element={<Doctors/>}/>
          <Route path="/aboutus" element={<AboutUs/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/appoinment" element={<Appoinment/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
