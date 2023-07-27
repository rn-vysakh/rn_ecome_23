"use client";

import React, { useState, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import FilterSection from "@/app/products/filterSection";
import CONST from "@/utils/apis";
import Link from "next/link";

import { AiFillCloseCircle } from "react-icons/ai";
async function getBrands(catId) {
  let res;

  if (catId) {
    res = await fetch(`${CONST.BASE_URL}/api/brand/getbycat?catId=${catId}`, {
      cache: "no-store",
    });
  } else {
    res = await fetch(`${CONST.BASE_URL}/api/brand`, {
      cache: "no-store",
    });
  }

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log("error");
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getCategories(brands) {
  let res;
  // if (brands) {
  //   res = await fetch(
  //     `${CONST.BASE_URL}/api/category/getbybrand?brandId=${brands}`,
  //     {
  //       cache: "no-store",
  //     }
  //   );
  // } else {
  res = await fetch(`${CONST.BASE_URL}/api/category`, {
    cache: "no-store",
  });
  // }

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log("error");
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getTags(categories) {
  let res;
  if (categories) {
    res = await fetch(
      `${CONST.BASE_URL}/api/tag/getbystruct?category=${categories}`,
      {
        cache: "no-store",
      }
    );
  } else {
    res = await fetch(`${CONST.BASE_URL}/api/tag/getbystruct`, {
      cache: "no-store",
    });
  }

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log("error");
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function SideBar({ searchParams }) {
  const router = useRouter();
  const pathname = usePathname();
  // console.log("searchParams from side bar -->", searchParams);

  const brandParams = searchParams.brand;
  const categoryParams = searchParams.catId;
  const tagParams = searchParams.tag;

  const { data } = await getBrands(categoryParams);
  const { data: categories } = await getCategories(brandParams);
  const { data: tags } = await getTags(categoryParams);

  // console.log("tags-->", tagParams, categoryParams);

  const clearSearchParams = () => {
    let params = new URLSearchParams(searchParams);
    params.delete("brand");
    params.delete("catId");
    params.delete("tag");

    router.push(pathname + "?" + params.toString());
  };

  const ClearFilters = () => {
    if (brandParams || categoryParams || tagParams) {
      return (
        <button className="w-full" onClick={clearSearchParams}>
          <div className="flex justify-between p-4 text-sm hover:bg-gray-300 transition-all ">
            <h2>Filters</h2>
            <div className="flex gap-1 items-cente text-blue-500 ">
              <AiFillCloseCircle />
              <p>Clear All</p>
            </div>
          </div>
        </button>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <div className="bg-white border-r  p-2">
        <ClearFilters />
        <FilterSection
          title="Category"
          items={categories}
          type="catId"
          selectedItems={categoryParams?.split(",") || []}
        />
        <FilterSection
          title="Brands"
          items={data}
          type="brand"
          selectedItems={brandParams?.split(",") || []}
        />

        <div>
          {tags?.map((tag, key) => (
            <div key={key}>
              <FilterSection
                title={tag._id}
                items={tag.value}
                type="tag"
                selectedItems={tagParams?.split(",") || []}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
