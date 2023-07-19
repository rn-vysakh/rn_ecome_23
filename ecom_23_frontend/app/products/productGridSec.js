import React from "react";
import SingleGridCard from "@/app/components/products/single-grid-card";

export default function ProductGridSec({ products }) {
  return (
    <>
      <div className="grid grid-cols-4">
        {products.map((item) => (
          <div key={item.id}>
            <SingleGridCard product={item} />
          </div>
        ))}
      </div>
    </>
  );
}
