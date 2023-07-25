import React from "react";
import ImageSlider from "./imageSlider";
import ProductDescription from "./description";
import CONST from "@/utils/apis";

const getData = async ({ productId }) => {
  let url = `${CONST.BASE_URL}/api/product/${productId}`;

  const res = await fetch(url);

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log("error");
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export default async function SingleProduct({ params }) {
  // console.log(params.productId);
  const productId = params.productId;
  const { data } = await getData({ productId });

  console.log(data);
  return (
    <>
      <div className="bg-[#12a4d2] w-full h-24"></div>
      <div className="">
        <div className=" max-w-7xl mx-5 md:mx-auto">
          <div className="flex flex-col md:flex-row gap-5 mb-8">
            <div className="w-full md:w-2/5">
              <ImageSlider images={data?.image} />
            </div>
            <div className="  w-full md:w-3/5 pt-5 md:pt-32">
              <h2 className="text-2xl font-bold">{data?.title}</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: data?.description.slice(0, 700),
                }}
              ></p>
            </div>
          </div>
          {/* <ProductDescription
            description={data.description}
            spec={data.specifications}
          /> */}
        </div>
      </div>
    </>
  );
}
