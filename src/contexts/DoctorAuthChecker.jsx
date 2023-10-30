import React, { useEffect } from "react";
import { useDoctorAuth } from "./DoctorAuthContext";

function DoctorAuthChecker() {
  const { doctor, doctorAuthenticated, doctorLogin, doctorLogout } = useDoctorAuth();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));


    if (!user || new Date(user.expires) < new Date()) {
      doctorLogout();
    } else {
      doctorLogin({
        username: user.username,
        roles: user.roles
      });
    }
  }, []);

  return null;
}

export default DoctorAuthChecker;
