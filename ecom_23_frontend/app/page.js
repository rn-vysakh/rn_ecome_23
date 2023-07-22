import React from "react";
import ProductGridSec from "@/app/products/productGridSec";
import SideBar from "@/app/products/sideBar";
import LandingSec from "@/app/components/landing";
import CONST from "@/utils/apis";

async function getData({ brandFilter, catFilter, tagFilter }) {
  let url = `${CONST.BASE_URL}/api/product?`;

  if (brandFilter) {
    url += `&${brandFilter}`;
  }

  if (catFilter) {
    url += `&${catFilter}`;
  }

  if (tagFilter) {
    url += `&${tagFilter}`;
  }

  const res = await fetch(url, {
    cache: "no-store",
  });

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log("error");
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Products({ searchParams }) {
  let filterItems;

  let brandFilter = searchParams.brand;
  let catFilter = searchParams.catId;
  let tagFilter = searchParams.tag;

  if (brandFilter) {
    // brandFilter = brandFilter.split(",");
    brandFilter = `brandId=${brandFilter.split(",")}`;
  }

  if (catFilter) {
    catFilter = `catId=${catFilter.split(",")}`;
  }

  if (tagFilter) {
    tagFilter = `tag=${tagFilter.split(",")}`;
  }

  const { data } = await getData({ brandFilter, catFilter, tagFilter });

  return (
    <main>
      <LandingSec
        title="Products"
        desc=" Our diverse range of offerings caters to the unique needs of our partners and customers, empowering businesses to thrive in the fast-paced world of technology."
        img="/assets/images/header1.webp"
      />
      <div className="flex flex-col md:flex-row relative">
        <div className="w-full lg:w-1/6 hidden lg:block">
          <SideBar searchParams={searchParams} />
        </div>
        <div className="w-full lg:w-5/6 bg-white">
          <div className="p-5">
            <h1>Products</h1>
            <ProductGridSec products={data} />
          </div>
        </div>
      </div>
    </main>
  );
}
