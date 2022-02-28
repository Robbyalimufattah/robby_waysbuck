import { useState, useEffect, useContext } from "react";
import formatThousands from "format-thousands";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../config/api";
import { globalTitle } from "../components/App";

import { OrderContext } from "../contexts/OrderContext";
import { UserContext } from "../contexts/UserContext";

import { uploads } from "../exports";

export default function ProductDesc({ item }) {
  let { id } = useParams();

  let navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [toppings, setToppings] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [topping, setTopping] = useState({});
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState(1);

  let toppingCheck = Array.from(document.getElementsByName("topping"));

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [order, setOrder] = useContext(OrderContext);
  const [state, dispatch] = useContext(UserContext);

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const getOrders = async () => {
    try {
      const response = await API.get(`/orders/${state.user.id}`);
      setOrder(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async (id) => {
    try {
      const response = await API.get("/product/" + id);
      setProduct(response.data.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  const getTopping = async () => {
    try {
      const response = await API.get("/topping/" + value);
      setTopping(response.data.data.topping);
    } catch (error) {
      console.log(error);
    }
  };

  const getToppings = async () => {
    try {
      const response = await API.get("/toppings");
      let responseToppings = response.data.data.toppings;
      const filteredToppings = responseToppings.filter(
        (topping) => topping.id !== 1
      );
      setToppings(responseToppings);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (state.isLogin === false) {
        navigate("/");
        return;
      }

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = {
        idProduct: id,
        idTopping: value,
        qty: quantity,
      };

      const response = await API.post("/order", body, config);
      getOrders();
      navigate("/my-cart");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTopping();
  }, [value]);

  useEffect(() => {
    document.title = globalTitle + "Product";
    getToppings();
    getProduct(id);
    return () => {
      setToppings([]);
      setProduct({});
    };
  }, []);

  return (
    <>
      <div className="mx-8 lg:pt-10 pb-20 lg:mx-32 lg:flex">
        <div className="img my-8 lg:my-0 w-full lg:w-5/12">
          <img
            src={uploads + product.image}
            alt="product"
            className="w-full lg:w-96 rounded-2xl"
          />
        </div>
        <div className="text w-full lg:w-7/12">
          <div className="mb-10">
            <h1 className="text-brand-red text-5xl font-extrabold font-['Avenir-Black'] mb-4">
              {product.title}
            </h1>
            <p className="text-brand-red text-xl">
              Rp {formatThousands(product.price, ".")},-
            </p>
          </div>
          <div>
            <h4 className="text-brand-red text-xl font-bold">
              Topping (pick one)
            </h4>
            <form className="flex flex-wrap items-center mt-10 text-center text-brand-red">
              {toppings.map((item) => (
                <div
                  className="mb-4 w-1/2 md:w-1/4 flex justify-center relative"
                  key={item.id}
                  onChange={handleChange}
                >
                  <input
                    className="sr-only"
                    type="radio"
                    name="topping"
                    id={item.id}
                    value={item.id}
                  />
                  <label
                    className="cursor-pointer flex flex-col items-center"
                    htmlFor={item.id}
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="w-16 hover:opacity-75"
                    />
                    <h4 className="text-sm mt-3">{item.title}</h4>
                    <p className="text-xs mt-3">
                      Rp {formatThousands(item.price, ".")},-
                    </p>
                  </label>
                  {checked && (
                    <div className="bg-green-600 text-white text-xs rounded-full absolute right-10 top-14">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </form>
          </div>
          <div className="text-center mb-4">
            <button
              type="button"
              onClick={decrement}
              className="bg-brand-pink px-4 py-2 text-brand-red rounded-md active:bg-brand-red active:text-brand-pink"
            >
              -
            </button>
            <span className="px-6 py-2 text-brand-red font-bold">
              {quantity}
            </span>
            <button
              type="button"
              onClick={increment}
              className="bg-brand-pink px-4 py-2 text-brand-red rounded-md active:bg-brand-red active:text-brand-pink"
            >
              +
            </button>
          </div>
          <div className="mb-10 lg:mb-10 flex justify-between text-xl font-bold text-brand-red">
            <span>Total</span>
            <span>
              Rp{" "}
              {formatThousands(
                quantity *
                  (product.price +
                    (topping.price !== null ? topping.price : 0)),
                "."
              )}
              ,-
            </span>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-brand-red"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </>
  );
}
