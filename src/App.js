import { BrowserRouter, Route, Routes } from "react-router-dom";
import Client from "./Layouts/Client";
import Home from "./pages/Home/Index.jsx"
import Doctors from "./pages/Doctors/Index.jsx"
import AboutUs from "./pages/AboutUs/Index.jsx"
import Contact from "./pages/Contact/Index.jsx"
import Login from "./pages/Login/Index.jsx"
import Appoinment from "./pages/Appoinment/Index.jsx"
import SuperAdminDashboard from "./Layouts/SuperAdminDashboard"
import SuperAdminHome from "./userTypes/superAdmin/pages/Home/Index.jsx"
import SuperAdminSettings from "./userTypes/superAdmin/pages/Settings/Index.jsx"
import SuperAdminService from "./userTypes/superAdmin/pages/Service/Index.jsx"
import ServiceAddSuperAdmin from "./userTypes/superAdmin/pages/ServiceAdd/Index.jsx"
import ServiceUpdateSuperAdmin from "./userTypes/superAdmin/pages/ServiceUpdate/Index.jsx"
import SuperAdminDepartment from "./userTypes/superAdmin/pages/Department/Index.jsx"
import DepartmentAddSuperAdmin from "./userTypes/superAdmin/pages/DepartmentAdd/Index.jsx"
import DepartmentUpdateSuperAdmin from "./userTypes/superAdmin/pages/DepartmentUpdate/Index.jsx"

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
        <Route path="/superadmin" element={<SuperAdminDashboard/>}>
          <Route index element={<SuperAdminHome/>}/>
          <Route path="/superadmin/settings" element={<SuperAdminSettings/>}/>
          <Route path="/superadmin/service" element={<SuperAdminService/>}/>
          <Route path="/superadmin/service/create" element={<ServiceAddSuperAdmin/>}/>
          <Route path="/superadmin/service/update/:id" element={<ServiceUpdateSuperAdmin/>}/>
          <Route path="/superadmin/department" element={<SuperAdminDepartment/>}/>
          <Route path="/superadmin/department/create" element={<DepartmentAddSuperAdmin/>}/>
          <Route path="/superadmin/department/update/:id" element={<DepartmentUpdateSuperAdmin/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
