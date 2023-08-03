import React from "react";
import SingleGridCard from "@/app/components/products/single-grid-card";

export default function ProductGridSec({ products }) {
  return (
    <div className="max-w-7xl mx-auto py-5 ">
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4  gap-4">
        {products.map((item) => (
          <div key={item.id}>
            <SingleGridCard product={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
