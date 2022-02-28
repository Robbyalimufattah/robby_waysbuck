import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import formatThousands from "format-thousands";
import dateFormat from "dateformat";
import { API } from "../config/api";
import TransactionModal from "./modal/TransactionModal";

import { UserContext } from "../contexts/UserContext";
import { ProcessOrderContext } from "../contexts/OrderContext";
import { TransactionContext } from "../contexts/TransactionContext";
import { TransactionModalContext } from "../contexts/ModalContext";

import { LogoWhite, QRImg } from "../exports/exportImages";
import { uploads } from "../exports";

export default function TransactionCard() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [processOrder, setProcessOrder] = useContext(ProcessOrderContext);
  const [transaction, setTransaction] = useContext(TransactionContext);
  const [open, setOpen] = useContext(TransactionModalContext);

  function checkStatus(status) {
    if (status == "Waiting Approve") {
      return "text-yellow-500 bg-yellow-100";
    } else if (status == "Success") {
      return "text-green-500 bg-green-200";
    } else if (status == "Cancel") {
      return "text-red-500 bg-red-200";
    } else if (status == "On The Way") {
      return "text-cyan-500 bg-cyan-200";
    }
  }

  const handleSuccess = async (id) => {
    try {
      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = {
        status: "Success",
      };

      // Insert data user to database
      const response = await API.patch(
        `/transaction/success/${id}`,
        body,
        config
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full lg:w-8/12 space-y-4 mb-4 lg:mb-0">
        {processOrder.map((item) => (
          <div className="flex" key={item.id}>
            <img
              src={uploads + item.product.image}
              alt="product"
              className="w-3/12"
            />
            <div className="text-brand-red font-['Avenir-Book'] space-y-4 ml-2">
              <h4 className="text-md font-['Avenir-Black'] font-bold">
                {item.product.title} X {item.qty}
              </h4>
              <p className="text-xs">
                {dateFormat(item.createdAt, "dddd, mmmm dd, yyyy")}
              </p>
              <p className="text-xs">
                {dateFormat(item.createdAt, "h:MM:ss TT")}
              </p>
              <p className="text-xs">Topping : {item.topping.title}</p>
              <p className="text-sm">
                Price : Rp {formatThousands(item.price, ".")},-
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row lg:flex-col justify-between lg:justify-start items-center lg:space-y-4">
        <img src={LogoWhite} alt="" className="" />
        <img src={QRImg} alt="" />
        <div className="space-y-4">
          <p
            className={
              checkStatus(transaction.status) +
              " text-sm text-center font-bold px-5 py-1 rounded-md"
            }
          >
            {transaction.status}
          </p>
          {transaction.status === "On The Way" ? (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="bg-green-600 text-white hover:text-green-600 hover:bg-white transition duration-300 text-xs text-center font-bold px-5 py-1 rounded-md"
            >
              Confirm Arrival
            </button>
          ) : null}
          <p className="text-xs text-center text-yellow-900 font-bold">
            Sub Total : Rp{" "}
            {formatThousands(
              processOrder
                .map((item) => item.price)
                .reduce((prev, next) => prev + next),
              "."
            )}
            ,-
          </p>
        </div>
      </div>
      <TransactionModal
        preview={
          <div className="block p-6 w-full space-y-5">
            <div>Please confirm that you have receive your order. Proceed?</div>
            <div className="flex justify-between space-x-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="bg-brand-red text-white hover:bg-red-500 transition duration-300 text-xs text-center font-bold px-5 py-3 rounded-md w-1/2"
              >
                No
              </button>
              <button
                type="button"
                onClick={() => handleSuccess(transaction.id)}
                className="bg-green-600 text-white hover:bg-green-500 transition duration-300 text-xs text-center font-bold px-5 py-3 rounded-md w-1/2"
              >
                Yes
              </button>
            </div>
          </div>
        }
      />
    </>
  );
}
