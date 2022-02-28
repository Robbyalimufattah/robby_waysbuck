import React from "react";

function ProductCard(props) {
  return (
    <div className="product-card rounded-md relative mb-10 w-52 bg-brand-pink">
      <div>
        <img
          src={props.image}
          alt="product-1"
          className="w-full rounded-md"
        />
      </div>
      <div className="text-brand-red py-3 pl-4 ">
        <h5 className="font-bold">{props.name}</h5>
        <span>Rp {props.price}</span>
      </div>
    </div>
  );
}

export default ProductCard;
