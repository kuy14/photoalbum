import React from "react";
import { Redirect } from "react-router-dom";

const requiredAuth = (Component) => {
  const AuthenticatedComponent = () => {
    const user = localStorage.getItem("userAuth");

    if (user) {
      return <Component />;
    }

    return <Redirect to="/login" />;
  };

  return AuthenticatedComponent;
};

export default requiredAuth;
