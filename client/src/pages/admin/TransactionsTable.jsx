import { useContext, useEffect, useState } from "react";
import formatThousands from "format-thousands";
import { Link } from "react-router-dom";
import { API } from "../../config/api";

import TransactionModal from "../../components/modal/TransactionModal";

import { TransactionModalContext } from "../../contexts/ModalContext";

import { CancelIcon, ConfirmIcon } from "../../exports/exportImages";
import { LoginContext } from "../../contexts/AuthContext";

export default function TransactionsTable() {
  const [transactions, setTransactions] = useState([]);
  const [preview, setPreview] = useState(null);

  const [open, setOpen] = useContext(TransactionModalContext);
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

  const handleCancel = async (id) => {
    try {
      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = {
        status: "Cancel",
      };

      // Insert data user to database
      const response = await API.patch(
        `/transaction/cancel/${id}`,
        body,
        config
      );
      getTransactions();
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = async (id) => {
    try {
      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = {
        status: "On The Way",
      };

      // Insert data user to database
      const response = await API.patch(`/transaction/${id}`, body, config);
      getTransactions();
    } catch (error) {
      console.log(error);
    }
  };

  function checkStatus(status) {
    if (status == "Waiting Approve") {
      return "text-yellow-500";
    } else if (status == "Success") {
      return "text-green-500";
    } else if (status == "Cancel") {
      return "text-red-500";
    } else if (status == "On The Way") {
      return "text-cyan-500";
    }
  }

  function checkAction(status, id) {
    if (status == "Waiting Approve") {
      return (
        <>
          <button
            type="button"
            onClick={() => handleCancel(id)}
            className="px-4 inline-flex text-xs leading-5 font-semibold rounded-md bg-button-cancel text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleApprove(id)}
            className="px-4 inline-flex text-xs leading-5 font-semibold rounded-md bg-button-confirm text-white"
          >
            Approve
          </button>
        </>
      );
    } else if (status == "Success") {
      return (
        <>
          <img src={ConfirmIcon} alt="" />
        </>
      );
    } else if (status == "Cancel") {
      return (
        <>
          <img src={CancelIcon} alt="" />
        </>
      );
    } else if (status == "On The Way") {
      return (
        <>
          <img src={ConfirmIcon} alt="" />
        </>
      );
    }
  }

  return (
    <>
      <div className="my-10 font-['Avenir-Book']">
        <h3 className="mx-4 lg:mx-32 text-brand-red text-3xl font-['Avenir-Black'] mb-10">
          Income Transaction
        </h3>
        <div className="lg:mx-10 mx-4 flex justify-start overflow-x-auto">
          <table className="lg:w-full divide-y divide-x divide-gray-300 border-2">
            <thead className="bg-gray-200">
              <tr className="divide-x divide-gray-300">
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-base font-['Avenir-Black'] text- tracking-wider"
                >
                  No
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-base font-['Avenir-Black'] text-black tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-base font-['Avenir-Black'] text-black tracking-wider"
                >
                  Address
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-base font-['Avenir-Black'] text-black tracking-wider"
                >
                  Attachment
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-base font-['Avenir-Black'] text-black tracking-wider"
                >
                  Phone
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-base font-['Avenir-Black'] text-black tracking-wider"
                >
                  Income
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-base font-['Avenir-Black'] text-black tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-center text-base font-['Avenir-Black'] text-black tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr className="divide-x divide-gray-300" key={transaction.id}>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {transaction.id}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {transaction.fullname}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {transaction.address}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap flex justify-center">
                    <a href={transaction.attachment} target="blank">
                      <img
                        src={transaction.attachment}
                        className="max-h-16"
                        alt=""
                      />
                    </a>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <a href={"tel:" + transaction.phone}>{transaction.phone}</a>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <button onClick={() => setOpen(!open)}>
                      Rp {formatThousands(transaction.totalPrice, ".")},-
                    </button>
                  </td>
                  <td
                    className={
                      checkStatus(transaction.status) +
                      " px-4 py-2 whitespace-nowrap"
                    }
                  >
                    {transaction.status}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap space-x-2 flex justify-center">
                    {checkAction(transaction.status, transaction.id)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <TransactionModal preview={preview} />
      {/* <p>{transactions[0].fullname}</p> */}
    </>
  );
}
