import React from "react";
import Image from "next/image";
import CONST from "@/utils/apis";
import Link from "next/link";
import Slugify from "@/utils/slugify";

export default function SingleGridCard({ product }) {
  // console.log(product);

  const BrandSec = ({ img, name }) => {
    if (img && false) {
      return (
        <div>
          <Image
            src={`${CONST.IMG_URL}/brands/${img}`}
            alt={name}
            height={50}
            width={50}
          />
        </div>
      );
    } else {
      return <div>{name}</div>;
    }
  };

  const slug = Slugify(product?.title);

  return (
    <Link href={`/single-product/${product?._id}?name=${slug}`}>
      <div className="h-full max-w-[500px] rounded border bg-white border-gray-100 hover:border-blue-300 transition-all shadow-lg shadow-gray-200/50 hover:shadow-xl flex flex-col items-center justify-between hover:scale-105 ">
        {/* <BrandSec
          img={product?.brandId?.logo?.smUrl}
          name={product?.brandId?.brandName}
        /> */}
        <Image
          src={`${CONST.IMG_URL}/products/${product?.image[0]?.mdUrl}`}
          alt={product?.title}
          className="bg-white   "
          height={150}
          width={250}
        />
        {/* <h1>{product?.title.split(" ")[0]}</h1> */}
        <h1 className=" text-center  font-bold px-4  -mt-8 bg-white w-full py-2">
          {product?.title?.slice(0, 60)}
        </h1>
        <div className=" w-full text-[12px] grid grid-cols-2  bg-gray-100 text-center">
          <div className="p-1 border border-gray-200/50 ">
            {" "}
            Document Size A4
          </div>
          <div className="p-1 border border-gray-200/50 ">Speed 40 PPm</div>
          <div className="p-1 border border-gray-200/50 ">ADF 50 Sheets </div>
          <div className="p-1 border border-gray-200/50 ">
            {" "}
            6,000 sheets / Day
          </div>
        </div>
      </div>
    </Link>
  );
}
