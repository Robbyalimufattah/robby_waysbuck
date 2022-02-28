import React, { useContext, useEffect } from "react";
import { globalTitle } from "./App";

import { AlertContext } from "../contexts/AuthContext";

import { JumbotronBg, JumbotronImg } from "../exports/exportImages";

function Jumbotron() {
  const [alert, setAlert] = useContext(AlertContext);
  useEffect(() => {
    document.title = globalTitle + "Home";
  }, []);

  return (
    <>
      <div className={(alert ? "flex" : "hidden") + " justify-center relative"}>
        <div className="absolute w-64 bg-red-500 rounded-md text-white text-center py-4 -top-14">
          Please Login!
        </div>
      </div>
      <div className="mx-4 lg:mx-32 my-2 lg:mt-10 lg:mb-20 relative h-80 lg:h-full">
        <img
          src={JumbotronBg}
          alt="jumbotron"
          className="opacity-0 lg:opacity-100"
        />
        <img
          src={JumbotronImg}
          alt="jumbotron-img"
          className="absolute brightness-50 lg:brightness-100 lg:right-0 top-10"
        />
        <div className="text-white absolute top-16 left-2 lg:left-14 lg:w-1/2">
          <h3 className="font-['Freight'] text-4xl lg:text-6xl mb-1 lg:mb-4 uppercase">
            Waysbucks
          </h3>
          <p className="font-['Montserrat'] text-lg lg:text-2xl mb-2 lg:mb-5">
            Things are changing, but we&#39;re still here for you
          </p>
          <p className="font-['Montserrat'] text-md lg:text-lg">
            We have temporarily closed our in-store cafes, but select grocery
            and drive-thru locations remaining open. Waysbucks Drivers is also
            available
            <br />
            <br />
            Let&#39;s Order...
          </p>
        </div>
      </div>
    </>
  );
}

export default Jumbotron;
