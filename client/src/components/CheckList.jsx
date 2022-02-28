import React, { useEffect, useState } from "react";
import formatThousands from "format-thousands";
import { API } from "../config/api";

export default function CheckList({ title, price, image, id }) {
  const [toppings, setToppings] = useState([]);
  const [checked, setChecked] = useState(false);

  const getToppings = async () => {
    try {
      const response = await API.get("/toppings");
      // Store product data to useState variabel
      setToppings(response.data.data.toppings);
    } catch (error) {
      console.log(error);
    }
  };

  let dataToppings = toppings.map((item) => ({
    ...item,
    checked: checked,
  }));

  useEffect(() => {
    getToppings();
  }, []);

  const handleChecked = () => {
    setChecked(!checked);

    dataToppings.find((item) => item.id === id).checked = !checked;
    console.log(dataToppings.filter((item) => item.checked === true));
  };

  return (
    <div key={id} className="mb-4 w-1/4 flex justify-center relative">
      <button onClick={handleChecked} className="flex flex-col items-center">
        <img src={image} alt="" className="w-16 hover:opacity-75" />
        <h4 className="text-sm mt-3">{title}</h4>
        <p className="text-xs mt-2 font-semibold">
          Rp {formatThousands(price, ".")},-
        </p>
      </button>
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
  );
}
