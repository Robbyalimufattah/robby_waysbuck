import { createContext, useContext, useEffect, useState } from "react";
import { API } from "../config/api";

import { LoginContext } from "./AuthContext";
import { UserContext } from "./UserContext";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transaction, setTransaction] = useState({});
  const [state, dispatch] = useContext(UserContext);
  const [login, setLogin] = useContext(LoginContext);

  const getTransaction = async () => {
    try {
      const response = await API.get(`/transaction/${state.user.id}`);
      // Store order data to useState variabel
      setTransaction(response.data.transaction);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransaction();
  }, [login]);

  return (
    <TransactionContext.Provider value={[transaction, setTransaction]}>
      {children}
    </TransactionContext.Provider>
  );
};
export const TransactionsContext = createContext();

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [login, setLogin] = useContext(LoginContext);

  const getTransactions = async () => {
    try {
      const response = await API.get("/transactions");
      // Store order data to useState variabel
      setTransactions(response.data.transactions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransactions();
    return () => {
      setTransactions([]);
    };
  }, [login]);

  return (
    <TransactionContext.Provider value={[transactions, setTransactions]}>
      {children}
    </TransactionContext.Provider>
  );
};
