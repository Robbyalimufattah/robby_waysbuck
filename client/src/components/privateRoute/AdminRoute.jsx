import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { LoginContext, AdminContext } from "../../contexts/AuthContext";

const AdminRoute = ({ element: Component, ...rest }) => {
  const [login, setLogin] = useContext(LoginContext);
  const [admin, setAdmin] = useContext(AdminContext);

  return admin && login ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
