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
import { format } from "date-fns";
import DoctorAppoinments from "./userTypes/Doctor/pages/Appoinments/Index.jsx";
import DoctorAppoinmentCreate from "./userTypes/Doctor/pages/AppoinmentCreate/Index.jsx";
import DoctorAppoinmentAsPatient from "./userTypes/Doctor/pages/AppoinmentAsPatient/Index.jsx";
import DoctorsPatients from "./userTypes/Doctor/pages/DoctorsPatients/Index.jsx";
import Recipes from "./userTypes/Doctor/pages/Recipes/Index.jsx";
import RecipeCreate from "./userTypes/Doctor/pages/RecipeCreate/Index.jsx";
import RecipeUpdate from "./userTypes/Doctor/pages/RecipeUpdate/Index.jsx";
import ProfileDoctor from "./userTypes/Doctor/pages/Profile/Index.jsx";
import ProfileUpdateDoctor from "./userTypes/Doctor/pages/ProfileUpdate/Index.jsx";
import PatientDashboard from "./Layouts/PatientDashboard";
import HomePatient from "./userTypes/Patient/pages/Home/Index.jsx";
import PatientAppoinments from "./userTypes/Patient/pages/Appoinments/Index.jsx";
import RecipeListPatient from "./userTypes/Patient/pages/Recipes/Index.jsx";
import AppoinmentCreate from "./userTypes/Patient/pages/AppoinmentCreate/Index.jsx";
import PatientDoctors from "./userTypes/Patient/pages/Doctors/Index.jsx";
import PatientHistory from "./userTypes/Patient/pages/History/Index.jsx";
import SuperAdminAppoinments from "./userTypes/superAdmin/pages/Appoinments/Index.jsx";
import SuperAdminUpdateAppoinments from "./userTypes/superAdmin/pages/AppoinmentUpdate/Index.jsx";
import PatientProfile from "./userTypes/Patient/pages/Profile/Index.jsx";
import PatientProfileUpdate from "./userTypes/Patient/pages/ProfileUpdate/Index.jsx";
import SuperAdminPatientList from "./userTypes/superAdmin/pages/PatientList/Index.jsx";
import SuperAdminPatientCreate from "./userTypes/superAdmin/pages/PatientCreate/Index.jsx";
import SuperAdminPatientUpdate from "./userTypes/superAdmin/pages/PatientUpdate/Index.jsx";
import SuperAdminPatientAddRole from "./userTypes/superAdmin/pages/PatientAddRole/Index.jsx"
import SuperAdminPatientRemoveRole from "./userTypes/superAdmin/pages/PatientRemoveRole/Index.jsx"
import SuperAdminPatientAddRoom from "./userTypes/superAdmin/pages/AddRoomPatient/Index.jsx"

function App() {
  var user = JSON.parse(localStorage.getItem("user"));
  function Expires(user) {
    const currentDate = new Date();
    const dates = format(currentDate, "yyyy-MM-dd");
    const time = format(currentDate, "HH:mm:ss");
    const dateNow = `${dates}T${time}`;
    if (user) {
      if (user.expires <= dateNow) {
        localStorage.removeItem("user");
      }
    }
  }
  Expires(user);

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
          <Route
            path="/superadmin"
            element={
              user && user.roles && user.roles[0] === "Admin" ? (
                <SuperAdminDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          >
            <Route index element={<SuperAdminHome />} />
            <Route
              path="/superadmin/settings"
              element={<SuperAdminSettings />}
            />
            <Route path="/superadmin/service" element={<SuperAdminService />} />
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
            <Route
              path="/superadmin/appoinments"
              element={<SuperAdminAppoinments />}
            />
            <Route
              path="/superadmin/appoinments/update/:id"
              element={<SuperAdminUpdateAppoinments />}
            />
            <Route
              path="/superadmin/patients"
              element={<SuperAdminPatientList />}
            />
            <Route
              path="/superadmin/patients/create"
              element={<SuperAdminPatientCreate />}
            />
            <Route
              path="/superadmin/patients/update/:id"
              element={<SuperAdminPatientUpdate />}
            />
            <Route
              path="/superadmin/patients/addrole/:username"
              element={<SuperAdminPatientAddRole />}
            />
            <Route
              path="/superadmin/patients/removerole/:username"
              element={<SuperAdminPatientRemoveRole />}
            />   
            <Route
              path="/superadmin/patients/addroompatient/:id"
              element={<SuperAdminPatientAddRoom />}
            />                     
          </Route>
          <Route
            path="/doctor"
            element={
              user && user.roles && user.roles[0] === "Doctor" ? (
                <DoctorDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          >
            <Route index element={<DoctorHome />} />
            <Route path="/doctor/appoinments" element={<DoctorAppoinments />} />
            <Route
              path="/doctor/appoinments/create"
              element={<DoctorAppoinmentCreate />}
            />
            <Route
              path="/doctor/appoinmetsaspatient"
              element={<DoctorAppoinmentAsPatient />}
            />
            <Route
              path="/doctor/doctorspatient"
              element={<DoctorsPatients />}
            />
            <Route path="/doctor/recipes" element={<Recipes />} />
            <Route path="/doctor/recipes/create" element={<RecipeCreate />} />
            <Route
              path="/doctor/recipes/update/:id"
              element={<RecipeUpdate />}
            />
            <Route path="/doctor/profile" element={<ProfileDoctor />} />
            <Route
              path="/doctor/profile/update"
              element={<ProfileUpdateDoctor />}
            />
          </Route>
          <Route
            path="/patient"
            element={
              user && user.roles && user.roles[0] === "Patient" ? (
                <PatientDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          >
            <Route index element={<HomePatient />} />
            <Route
              path="/patient/appoinments"
              element={<PatientAppoinments />}
            />
            <Route
              path="/patient/appoinments/create"
              element={<AppoinmentCreate />}
            />
            <Route path="/patient/recipes" element={<RecipeListPatient />} />
            <Route path="/patient/doctors" element={<PatientDoctors />} />
            <Route path="/patient/history" element={<PatientHistory />} />
            <Route path="/patient/profile" element={<PatientProfile />} />
            <Route
              path="/patient/profile/update"
              element={<PatientProfileUpdate />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
