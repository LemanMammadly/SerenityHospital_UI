import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Client from "./Layouts/Client";
import Home from "./pages/Home/Index.jsx";
import Doctors from "./pages/Doctors/Index.jsx";
import AboutUs from "./pages/AboutUs/Index.jsx";
import Contact from "./pages/Contact/Index.jsx";
import Login from "./pages/Login/Index.jsx";
import Appoinment from "./pages/Appoinment/Index.jsx";
import SuperAdminDashboard from "./Layouts/SuperAdminDashboard";
import SuperAdminHome from "./userTypes/superAdmin/pages/Home/Index.jsx";
import SuperAdminSettings from "./userTypes/superAdmin/pages/Settings/Index.jsx";
import SuperAdminService from "./userTypes/superAdmin/pages/Service/Index.jsx";
import ServiceAddSuperAdmin from "./userTypes/superAdmin/pages/ServiceAdd/Index.jsx";
import ServiceUpdateSuperAdmin from "./userTypes/superAdmin/pages/ServiceUpdate/Index.jsx";
import SuperAdminDepartment from "./userTypes/superAdmin/pages/Department/Index.jsx";
import DepartmentAddSuperAdmin from "./userTypes/superAdmin/pages/DepartmentAdd/Index.jsx";
import DepartmentUpdateSuperAdmin from "./userTypes/superAdmin/pages/DepartmentUpdate/Index.jsx";
import PositionPageSuperAdmin from "./userTypes/superAdmin/pages/PositionPage/Index.jsx";
import PositionCreateSuperAdmin from "./userTypes/superAdmin/pages/PositionCreate/Index.jsx";
import PositionUpdateSuperAdmin from "./userTypes/superAdmin/pages/PositionUpdate/Index.jsx";
import SuperAdminDoctor from "./userTypes/superAdmin/pages/DoctorPage/Index.jsx";
import SuperAdminDoctorCreate from "./userTypes/superAdmin/pages/DoctorCreate/Index.jsx";
import SuperAdminDoctorAddRole from "./userTypes/superAdmin/pages/DoctorAddRole/Index.jsx";
import SuperAdminDoctorRemoveRole from "./userTypes/superAdmin/pages/DoctorRemoveRole/Index.jsx";
import SuperAdminDoctorAddRoom from "./userTypes/superAdmin/pages/AddRoomDoctor/Index.jsx";
import SuperAdminDoctorUpdate from "./userTypes/superAdmin/pages/DoctorUpdate/Index.jsx";
import DoctorDashboard from "./Layouts/DoctorDashboard";
import DoctorHome from "./userTypes/Doctor/pages/Home/Index.jsx";

function App() {
  var user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Client />}>
            <Route index element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/appoinment" element={<Appoinment />} />
          </Route>
            <Route path="/superadmin"  element={user && user.roles[0] === "Admin" ? <SuperAdminDashboard /> : <Navigate to="/login"/>} >
              <Route index element={<SuperAdminHome />} />
              <Route
                path="/superadmin/settings"
                element={<SuperAdminSettings />}
              />
              <Route
                path="/superadmin/service"
                element={<SuperAdminService />}
              />
              <Route
                path="/superadmin/service/create"
                element={<ServiceAddSuperAdmin />}
              />
              <Route
                path="/superadmin/service/update/:id"
                element={<ServiceUpdateSuperAdmin />}
              />
              <Route
                path="/superadmin/department"
                element={<SuperAdminDepartment />}
              />
              <Route
                path="/superadmin/department/create"
                element={<DepartmentAddSuperAdmin />}
              />
              <Route
                path="/superadmin/department/update/:id"
                element={<DepartmentUpdateSuperAdmin />}
              />
              <Route
                path="/superadmin/position"
                element={<PositionPageSuperAdmin />}
              />
              <Route
                path="/superadmin/position/create"
                element={<PositionCreateSuperAdmin />}
              />
              <Route
                path="/superadmin/position/update/:id"
                element={<PositionUpdateSuperAdmin />}
              />
              <Route path="/superadmin/doctor" element={<SuperAdminDoctor />} />
              <Route
                path="/superadmin/doctor/create"
                element={<SuperAdminDoctorCreate />}
              />
              <Route
                path="/superadmin/doctor/addrole/:username"
                element={<SuperAdminDoctorAddRole />}
              />
              <Route
                path="/superadmin/doctor/removerole/:username"
                element={<SuperAdminDoctorRemoveRole />}
              />
              <Route
                path="/superadmin/doctor/addroom/:id"
                element={<SuperAdminDoctorAddRoom />}
              />
              <Route
                path="/superadmin/doctor/update/:id"
                element={<SuperAdminDoctorUpdate />}
              />
            </Route>
            <Route path="/doctor"  element={user && user.roles[0] === "Doctor" ? <DoctorDashboard /> : <Navigate to="/login" />} >
              <Route index element={<DoctorHome />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
