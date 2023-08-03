"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { AiOutlineSearch } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Slugify from "@/utils/slugify";
import CONST from "@/utils/apis";

export default function SearchBar({ searchParams }) {
  const router = useRouter();
  const pathname = usePathname();

  console.log("searchParams from side bar -->", searchParams);

  const searchText = searchParams.searchText;

  const [search, setSearch] = useState(searchText || "");
  const [searchResults, setSearchResults] = useState([]);

  const getData = async (input) => {
    let url = `${CONST.BASE_URL}/api/product?limit=4&page=1&searchText=${input}`;

    const res = await fetch(url);

    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      console.log("error");
    }

    const resData = await res.json();

    setSearchResults(resData.data);

    console.log(resData.data);

    return null;

    // return res.json();
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    if (value.length < 2) {
      setSearchResults([]);
      setSearch(value);
      return null;
    }
    getData(value);
    setSearch(value);
  };

  const handleSearchPage = () => {
    if (search.length < 2) return null;

    let params = new URLSearchParams(searchParams);
    params.delete("brand");
    params.delete("catId");
    params.delete("tag");
    params.delete("page");
    params.set("searchText", search);

    router.push(pathname + "view-all?" + params.toString());
    setSearchResults([]);
  };

  return (
    <>
      <div className=" p-4 w-full md:w-[550px] relative">
        <div className="flex  justify-between items-center gap-2 w-full ">
          <input
            type="text"
            className="border border-sky-400 p-2 w-full text-xl rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-600 h-16 "
            placeholder="Search"
            onChange={handleSearch}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearchPage();
            }}
            value={search}
            autoFocus
          />
          <button
            className="bg-[#0aa7db] text-white rounded-md h-16 w-16 grid place-items-center hover:bg-gray-800 text-2xl"
            onClick={handleSearchPage}
          >
            <AiOutlineSearch />
          </button>
        </div>
        <AnimatePresence>
          {searchResults.length > 0 && (
            <motion.div
              className=" absolute top-24 left-4 w-full bg-white p-2 border-2 z-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {searchResults.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-start gap-5 items-center border-b border-gray-200 p-2 hover:bg-slate-100"
                >
                  <img
                    src={`${CONST.IMG_URL}/products/${item?.image[0]?.smUrl}`}
                    alt=""
                    className="w-12 h-12 object-contain"
                  />
                  <Link
                    className="flex items-center gap-2 "
                    href={`/single-product/${item._id}?name=${Slugify(
                      item.title
                    )}`}
                  >
                    {item.title}
                  </Link>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
