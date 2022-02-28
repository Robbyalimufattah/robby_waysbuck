import { createContext, useContext, useEffect, useState } from "react";
import { API } from "../config/api";

import { LoginContext } from "./AuthContext";
import { UserContext } from "./UserContext";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState([]);
  const [state, dispatch] = useContext(UserContext);
  const [login, setLogin] = useContext(LoginContext);

  const getOrders = async () => {
    try {
      const response = await API.get(`/orders/${state.user.id}`);
      // Store order data to useState variabel
      setOrder(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, [login]);

  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
};

export const ProcessOrderContext = createContext();

export const ProcessOrderProvider = ({ children }) => {
  const [processOrder, setProcessOrder] = useState([]);
  const [state, dispatch] = useContext(UserContext);
  const [login, setLogin] = useContext(LoginContext);

  const getProcessOrders = async () => {
    try {
      const response = await API.get(`/orders/process/${state.user.id}`);
      // Store order data to useState variabel
      setProcessOrder(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProcessOrders();
  }, [login]);

  return (
    <ProcessOrderContext.Provider value={[processOrder, setProcessOrder]}>
      {children}
    </ProcessOrderContext.Provider>
  );
};

export const SuccessOrderContext = createContext();

export const SuccessOrderProvider = ({ children }) => {
  const [successOrder, setSuccessOrder] = useState([]);
  const [state, dispatch] = useContext(UserContext);
  const [login, setLogin] = useContext(LoginContext);

  const getSuccessOrders = async () => {
    try {
      const response = await API.get(`/orders/success/${state.user.id}`);
      // Store order data to useState variabel
      setSuccessOrder(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSuccessOrders();
  }, [login]);

  return (
    <SuccessOrderContext.Provider value={[successOrder, setSuccessOrder]}>
      {children}
    </SuccessOrderContext.Provider>
  );
};
