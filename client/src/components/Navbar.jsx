import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import urlSlug from "url-slug";

import {
  AdminContext,
  LoginContext,
  RegisteredContext,
} from "../contexts/AuthContext";
import { ModalContext } from "../contexts/ModalContext";
import { UserContext } from "../contexts/UserContext";

import { uploads } from "../exports";
import {
  BasketIcon,
  DrinkIcon,
  LogoBlack,
  LogoutIcon,
  LogoWhite,
  ToppingIcon,
  userIcon,
} from "../exports/exportImages";
import { OrderContext } from "../contexts/OrderContext";
import { TransactionContext } from "../contexts/TransactionContext";

function Navbar() {
  const [login, setLogin] = useContext(LoginContext);
  const [admin, setAdmin] = useContext(AdminContext);
  const [registered, setRegistered] = useContext(RegisteredContext);
  const [state, dispatch] = useContext(UserContext);
  const [order, setOrder] = useContext(OrderContext);
  const [open, setOpen] = useContext(ModalContext);
  const [transaction, setTransaction] = useContext(TransactionContext);

  let navigate = useNavigate();

  const logout = () => {
    setLogin(false);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  return (
    <nav className="mx-4 lg:mx-20 mt-4 flex justify-between items-center">
      <Link to="/">
        <img src={LogoWhite} alt="" />
      </Link>
      <div className="space-x-5 justify-end flex items-center relative">
        {login ? (
          <>
            <p
              className={
                (admin ? null : "sr-only lg:not-sr-only ") + "text-brand-red"
              }
            >
              Welcome,{admin ? " Admin " : null} {state.user.fullname}!
            </p>
            {admin ? null : (
              <Link to="/my-cart" className="relative">
                <img src={BasketIcon} alt="shopping-basket" />
                {order.length > 0 ? (
                  <div className="w-5 h-5 text-xs text-white font-bold bg-red-600 rounded-full absolute -right-2 -top-1 flex justify-center items-center">
                    {order.length}
                  </div>
                ) : null}
              </Link>
            )}
            <Menu as="div" className="relative z-10">
              <div>
                <Menu.Button>
                  <span className="sr-only">Open user menu</span>
                  <img
                    src={admin ? LogoBlack : uploads + state.user.profile.image}
                    alt="user"
                    className="max-h-14 w-14 object-cover rounded-full border-2 border-brand-red"
                  />
                  {transaction ? (
                    <div className="w-5 h-5 text-xs text-white font-bold bg-red-600 rounded-full absolute -right-2 -top-1 flex justify-center items-center">
                      !
                    </div>
                  ) : null}
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {admin ? (
                    <>
                      <Menu.Item>
                        <Link
                          to="/add-product"
                          className="p-4 flex items-center hover:bg-gray-100"
                        >
                          <img
                            src={DrinkIcon}
                            className="w-5 mr-2"
                            alt="drink"
                          />
                          Add Product
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link
                          to="/add-topping"
                          className="p-4 flex items-center hover:bg-gray-100"
                        >
                          <img
                            src={ToppingIcon}
                            className="w-5 mr-2"
                            alt="topping"
                          />
                          Add Topping
                        </Link>
                      </Menu.Item>
                    </>
                  ) : (
                    <>
                      <Menu.Item>
                        <Link
                          to={"/profile/" + urlSlug(state.user.fullname)}
                          className="p-4 flex items-center hover:bg-gray-100"
                        >
                          <img
                            src={userIcon}
                            className="w-5 mr-2"
                            alt="profile"
                          />
                          My Profile
                        </Link>
                      </Menu.Item>
                    </>
                  )}
                  <hr />
                  <Menu.Item onClick={logout}>
                    <div className="p-4 flex items-center hover:bg-gray-100 cursor-pointer">
                      <img src={LogoutIcon} className="w-5 mr-2" alt="logout" />
                      Logout
                    </div>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </>
        ) : (
          <>
            <button
              type="button"
              className="rounded px-3 lg:px-5 py-1 text-brand-red border-2 text-[Product-Sans] border-brand-red box-border"
              onClick={() => {
                setOpen(!open);
                setRegistered(true);
              }}
            >
              Login
            </button>
            <button
              type="button"
              className="rounded px-3 lg:px-5 py-1 text-white border-2 border-brand-red bg-brand-red"
              onClick={() => {
                setOpen(true);
                setRegistered(false);
              }}
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
