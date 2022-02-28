// import necessary utility from rrd
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { LoginContext } from "../../contexts/AuthContext";

// create component here
const CustomerRoute = ({ element: Component, ...rest }) => {
  const [login, setLogin] = useContext(LoginContext);

  return login ? <Outlet /> : <Navigate to="/" />;
};

export default CustomerRoute;
