import React, { createContext, useContext, useState } from "react";

const DoctorAuthContext = createContext();

export const DoctorAuthProvider = ({ children }) => {
  const [doctor, setDoctor] = useState(null);
  const [doctorAuthenticated, setDoctorAuthenticated] = useState(false);
  const [doctorRoles, setDoctorRoles] = useState([]);

  const doctorLogin = (doctorData) => {
    setDoctor(doctorData);
    setDoctorAuthenticated(true);
    setDoctorRoles(doctorData.roles);
  };

  const doctorLogout = () => {
    setDoctor(null);
    setDoctorAuthenticated(false);
    setDoctorRoles([]);
  };

  return (
    <DoctorAuthContext.Provider
      value={{
        doctor,
        doctorAuthenticated,
        doctorRoles,
        doctorLogin,
        doctorLogout,
      }}
    >
      {children}
    </DoctorAuthContext.Provider>
  );
};

export const useDoctorAuth = () => {
  return useContext(DoctorAuthContext);
};
