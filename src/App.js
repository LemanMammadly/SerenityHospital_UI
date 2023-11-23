import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Client from "./Layouts/Client";
import Home from "./pages/Home/Index.jsx";
import Doctors from "./pages/Doctors/Index.jsx";
import AboutUs from "./pages/AboutUs/Index.jsx";
import Contact from "./pages/Contact/Index.jsx";
import Login from "./pages/Login/Index.jsx";
import DoctorDetail from "./pages/DoctorDetail/Index.jsx";
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
import SuperAdminPatientAddRole from "./userTypes/superAdmin/pages/PatientAddRole/Index.jsx";
import SuperAdminPatientRemoveRole from "./userTypes/superAdmin/pages/PatientRemoveRole/Index.jsx";
import SuperAdminPatientAddRoom from "./userTypes/superAdmin/pages/AddRoomPatient/Index.jsx";
import SuperAdminDoctorRooms from "./userTypes/superAdmin/pages/DoctorRooms/Index.jsx";
import SuperAdminDoctorRoomCreate from "./userTypes/superAdmin/pages/DoctorRoomCreate/Index.jsx";
import SuperAdminDoctorRoomUpdate from "./userTypes/superAdmin/pages/DoctorRoomUpdate/Index.jsx";
import SuperAdminPatientRoom from "./userTypes/superAdmin/pages/PatientRoom/Index.jsx";
import SuperAdminPatientRoomCreate from "./userTypes/superAdmin/pages/PatientRoomCreate/Index.jsx";
import SuperAdminPatientRoomUpdate from "./userTypes/superAdmin/pages/PatientRoomsUpdate/Index.jsx";
import SuperAdminNurse from "./userTypes/superAdmin/pages/Nurse/Index.jsx";
import SuperAdminNurseCreate from "./userTypes/superAdmin/pages/NurseCreate/Index.jsx";
import SuperAdminNurseUpdate from "./userTypes/superAdmin/pages/NurseUpdate/Index.jsx";
import SuperAdminNurseAddRole from "./userTypes/superAdmin/pages/NurseAddRole/Index.jsx";
import SuperAdminNurseRemoveRole from "./userTypes/superAdmin/pages/NurseRemoveRole/Index.jsx";
import SuperAdminPatientHistory from "./userTypes/superAdmin/pages/PatientHistory/Index.jsx";
import Register from "../src/pages/Register/Index.jsx";
import DoctorAvailable from "./userTypes/Patient/pages/DoctorAvailable/Index.jsx";
import SuperAdminDoctorAvailable from "./userTypes/superAdmin/pages/DoctorAvailable/Index.jsx";
import Receptionist from "./Layouts/ReceptionDashboard.js";
import HomeReceptionist from "./userTypes/Reception/pages/Home/Index.jsx";
import AppoinmentsListReceptionist from "./userTypes/Reception/pages/AppoinmentList/Index.jsx";
import AppoinmentsUpdateReceptionist from "./userTypes/Reception/pages/UpdateAppoinment/Index.jsx";
import ProfiletReceptionist from "./userTypes/Reception/pages/Profile/Index.jsx";
import ProfileUpdateReceptionist from "./userTypes/Reception/pages/UpdateProfile/Index.jsx";
import DoctorBusyDoctor from "./userTypes/Doctor/pages/DoctorBusy/Index.jsx";
import ScrollTop from "./components/ScrollTop/Index.jsx";
import SuperAdminMessages from "./userTypes/superAdmin/pages/Messages/Index.jsx";
import SuperAdminDoctorProfile from "./userTypes/superAdmin/pages/DoctorProfile/Index.jsx";
import SuperAdminPatientProfile from "./userTypes/superAdmin/pages/PatientProfile/Index.jsx";
import SuperAdminReceptionProfile from "./userTypes/superAdmin/pages/ReceptionProfile/Index.jsx"
import DoctorPatientProfile from "./userTypes/Doctor/pages/PatientProfile/Index.jsx"
import DoctorPatientAsDoctorProfile from "./userTypes/Doctor/pages/PatientAsDoctorProfile/Index.jsx"
import PatientDoctorProfile from "./userTypes/Patient/pages/DoctorProfile/Index.jsx"
import ReceptionistDoctorProfile from "./userTypes/Reception/pages/DoctorProfile/Index.jsx"
import ReceptionistPatientrProfile from "./userTypes/Reception/pages/PatientProfile/Index.jsx"
import PaymentPage from "./userTypes/Patient/pages/PaymentPge/Index.jsx"

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
        <ScrollTop>
          <Routes>
            <Route path="/" element={<Client />}>
              <Route index element={<Home />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/detail/:id" element={<DoctorDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
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
              <Route
                path="/superadmin/doctorrooms/"
                element={<SuperAdminDoctorRooms />}
              />
              <Route
                path="/superadmin/doctorrooms/create"
                element={<SuperAdminDoctorRoomCreate />}
              />
              <Route
                path="/superadmin/doctorrooms/update/:id"
                element={<SuperAdminDoctorRoomUpdate />}
              />
              <Route
                path="/superadmin/patientrooms"
                element={<SuperAdminPatientRoom />}
              />
              <Route
                path="/superadmin/patientrooms/create"
                element={<SuperAdminPatientRoomCreate />}
              />
              <Route
                path="/superadmin/patientrooms/update/:id"
                element={<SuperAdminPatientRoomUpdate />}
              />
              <Route path="/superadmin/nurse" element={<SuperAdminNurse />} />
              <Route
                path="/superadmin/nurse/create"
                element={<SuperAdminNurseCreate />}
              />
              <Route
                path="/superadmin/nurse/update/:id"
                element={<SuperAdminNurseUpdate />}
              />
              <Route
                path="/superadmin/nurse/addrole/:username"
                element={<SuperAdminNurseAddRole />}
              />
              <Route
                path="/superadmin/nurse/removerole/:username"
                element={<SuperAdminNurseRemoveRole />}
              />
              <Route
                path="/superadmin/patienthistory"
                element={<SuperAdminPatientHistory />}
              />
              <Route
                path="/superadmin/doctoravailabe"
                element={<SuperAdminDoctorAvailable />}
              />
              <Route
                path="/superadmin/messages"
                element={<SuperAdminMessages />}
              />
              <Route
                path="/superadmin/doctorprofile/:username"
                element={<SuperAdminDoctorProfile />}
              />
              <Route
                path="/superadmin/patientprofile/:username"
                element={<SuperAdminPatientProfile />}
              />
              <Route
                path="/superadmin/receptionprofile/:username"
                element={<SuperAdminReceptionProfile />}
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
              <Route
                path="/doctor/appoinments"
                element={<DoctorAppoinments />}
              />
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
              <Route path="/doctor/doctorbusy" element={<DoctorBusyDoctor />} />
              <Route path="/doctor/patientprofile/:username" element={<DoctorPatientProfile />} />
              <Route path="/doctor/patientasdoctorprofile/:username" element={<DoctorPatientAsDoctorProfile />} />
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
              <Route
                path="/patient/doctoravailable"
                element={<DoctorAvailable />}
              />
              <Route path="/patient/history" element={<PatientHistory />} />
              <Route path="/patient/profile" element={<PatientProfile />} />
              <Route
                path="/patient/profile/update"
                element={<PatientProfileUpdate />}
              />
              <Route path="/patient/doctorprofile/:username" element={<PatientDoctorProfile />} />
              <Route path="/patient/payment" element={<PaymentPage />} />
            </Route>

            <Route
              path="/receptionist"
              element={
                user && user.roles && user.roles[0] === "Receptionist" ? (
                  <Receptionist />
                ) : (
                  <Navigate to="/login" />
                )
              }
            >
              <Route index element={<HomeReceptionist />} />
              <Route
                path="/receptionist/appoinments"
                element={<AppoinmentsListReceptionist />}
              />
              <Route
                path="/receptionist/appoinments/update/:id"
                element={<AppoinmentsUpdateReceptionist />}
              />
              <Route
                path="/receptionist/profile"
                element={<ProfiletReceptionist />}
              />
              <Route
                path="/receptionist/profile/update"
                element={<ProfileUpdateReceptionist />}
              />
               <Route
                path="/receptionist/doctorprofile/:username"
                element={<ReceptionistDoctorProfile />}
              />
               <Route
                path="/receptionist/patientprofile/:username"
                element={<ReceptionistPatientrProfile />}
              />
            </Route>
          </Routes>
        </ScrollTop>
      </BrowserRouter>
    </div>
  );
}

export default App;
