import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { globalTitle } from "../components/App";

import TransactionCard from "../components/TransactionCard";

import { UserContext } from "../contexts/UserContext";
import { ProcessOrderContext } from "../contexts/OrderContext";

import { uploads } from "../exports";

export default function MyProfile() {
  const [state, dispatch] = useContext(UserContext);
  const [processOrder, setProcessOrder] = useContext(ProcessOrderContext);

  console.log(state);

  useEffect(() => {
    document.title = globalTitle + "My Profile";
  }, []);

  return (
    <div className="lg:flex justify-between mx-4 lg:mx-28 my-10">
      <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
        <div className="flex space-x-6">
          <h3 className="text-3xl font-['Avenir-Black'] font-extrabold text-brand-red mb-8">
            My Profile
          </h3>
          <Link to="/profile/edit">
            <span
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Edit Profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 30 30"
              >
                {" "}
                <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
              </svg>
            </span>
          </Link>
        </div>
        <div className="flex">
          <label
            className="mr-4 w-48 lg:mr-8 relative cursor-pointer"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Change Photo"
          >
            <input type="file" className="sr-only" />
            <img
              src={uploads + state.user.profile.image}
              alt=""
              className="hover:brightness-75"
            />
          </label>
          <div className="space-y-4">
            <p className="text-yellow-700 font-bold">Full Name</p>
            <p>{state.user.fullname}</p>
            <p className="text-yellow-700 font-bold">Email</p>
            <p>{state.user.email}</p>
            <p className="text-yellow-700 font-bold">Phone</p>
            <p>
              {state.user.profile.phone !== null
                ? state.user.profile.phone
                : "-"}
            </p>
            <p className="text-yellow-700 font-bold">Address</p>
            <p>
              {state.user.profile.address !== null
                ? state.user.profile.address
                : "-"}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <div>
          <h3 className="text-3xl font-['Avenir-Black'] font-extrabold text-brand-red">
            Ongoing Transaction
          </h3>
          {processOrder.length > 0 ? (
            <div className="lg:flex justify-between my-8 bg-brand-pink rounded-lg p-4">
              <TransactionCard />
            </div>
          ) : (
            <div className="py-5 text-brand-red">
              <p className="text-lg mb-4">No Ongoing Transaction.</p>
              {state.user.order.length > 0 ? (
                <Link to="/my-cart" className="hover:underline">
                  Checkout your cart.
                </Link>
              ) : (
                <Link to="/" className="hover:underline">
                  Continue Shopping.
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
