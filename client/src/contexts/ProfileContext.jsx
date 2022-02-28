import { createContext, useContext, useEffect, useState } from "react";
import { API } from "../config/api";

import { LoginContext } from "./AuthContext";
import { UserContext } from "./UserContext";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [state, dispatch] = useContext(UserContext);
  const [login, setLogin] = useContext(LoginContext);

  const getUser = async () => {
    try {
      const response = await API.get("/user/" + state.user.id);
      setUser(response.data.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [login]);

  return (
    <ProfileContext.Provider value={[user, setUser]}>
      {children}
    </ProfileContext.Provider>
  );
};
