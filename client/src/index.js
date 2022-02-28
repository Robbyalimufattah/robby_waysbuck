import React from "react";
import App from "./components/App";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { AlertProvider, LoginProvider, AdminProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import { OrderProvider, ProcessOrderProvider, SuccessOrderProvider } from './contexts/OrderContext';
import { ProfileProvider } from "./contexts/ProfileContext";

import "./index.css";
import { TransactionProvider } from "./contexts/TransactionContext";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <AdminProvider>
        <LoginProvider>
          <ProfileProvider>
            <AlertProvider>
                <TransactionProvider>
                  <OrderProvider>
                    <SuccessOrderProvider>
                      <ProcessOrderProvider>
                        <Router>
                          <App />
                        </Router>
                      </ProcessOrderProvider>
                    </SuccessOrderProvider>
                  </OrderProvider>
                </TransactionProvider>
            </AlertProvider>
          </ProfileProvider>
        </LoginProvider>
      </AdminProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
