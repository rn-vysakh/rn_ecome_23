import React from "react";
import CONST from "@/utils/apis";

export default function SingleGridCard({ product }) {
  return (
    <>
      <div className=" h-96  p-5 m-2 border">
        <img
          src={`${CONST.IMG_URL}/products/${product?.image[0].mdUrl}`}
          alt={product?.title}
        />
        {/* <h1>{product?.title.split(" ")[0]}</h1> */}
        <h1 className="font-bold text-center">{product?.title.slice(0, 60)}</h1>
      </div>
    </>
  );
}
