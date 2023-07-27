"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import FilterSection from "@/app/products/filterSection";
import CONST from "@/utils/apis";
import Link from "next/link";
import { getBrands, getCategories, getTags } from "@/utils/apiCalling";

import { AiFillCloseCircle } from "react-icons/ai";

export default function SideBar({ searchParams }) {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const router = useRouter();
  const pathname = usePathname();
  // console.log("searchParams from side bar -->", searchParams);

  const brandParams = searchParams.brand;
  const categoryParams = searchParams.catId;
  const tagParams = searchParams.tag;

  const getBrandsData = useCallback(async () => {
    const { data } = await getBrands(categoryParams);
    setData(data);
  }, [categoryParams]);

  const getCategoryData = useCallback(async () => {
    const { data } = await getCategories(brandParams);
    setCategories(data);
  }, [categoryParams]);

  const getTagsData = useCallback(async () => {
    const { data } = await getTags(categoryParams);
    setTags(data);
  }, [categoryParams]);

  // getBrandsData();

  // const { data } = await getBrands(categoryParams);
  // const { data: categories } = await getCategories(brandParams);
  // const { data: tags } = await getTags(categoryParams);
  // console.log("tags-->", tagParams, categoryParams);

  useEffect(() => {
    getBrandsData();
    getCategoryData();
    getTagsData();
  }, []);

  const clearSearchParams = () => {
    let params = new URLSearchParams(searchParams);
    params.delete("brand");
    params.delete("catId");
    params.delete("tag");
    params.delete("searchText");

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
