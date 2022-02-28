import React, { useState, createContext } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <ModalContext.Provider value={[open, setOpen]}>
      {children}
    </ModalContext.Provider>
  );
};

export const TransactionModalContext = createContext();

export const TransactionModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <TransactionModalContext.Provider value={[open, setOpen]}>
      {children}
    </TransactionModalContext.Provider>
  );
};

export const CartModalContext = createContext();

export const CartModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <CartModalContext.Provider value={[open, setOpen]}>
      {children}
    </CartModalContext.Provider>
  );
};
