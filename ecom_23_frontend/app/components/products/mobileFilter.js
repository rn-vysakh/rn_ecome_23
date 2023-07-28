"use client";
import React, { useState } from "react";
import SideBar from "@/app/components/products/sideBar";
import SearchBar from "@/app/components/products/searchBar";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { BsFilter } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

const MobileFilter = ({ searchParams, children }) => {
  const [isFilerShow, setIsFilterShow] = useState(false);
  const [isSearchShow, setIsSearchShow] = useState(false);

  const toggleSearch = () => {
    setIsSearchShow(!isSearchShow);
    setIsFilterShow(false);
  };

  const toggleFilter = () => {
    setIsFilterShow(!isFilerShow);
    setIsSearchShow(false);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="pl-4">{children}</div>
        <div className="flex justify-end gap-2 py-2 mr-2 ">
          <button
            className={` px-4 py-2 rounded-md h-10 ${
              !isSearchShow
                ? "bg-gray-200 text-gray-600"
                : "bg-gray-600 text-white"
            }`}
            onClick={toggleSearch}
          >
            {!isSearchShow ? <AiOutlineSearch /> : <AiOutlineClose />}
          </button>{" "}
          <button
            className={` px-4 py-2 rounded-md h-10 ${
              !isFilerShow
                ? "bg-gray-200 text-gray-600"
                : "bg-gray-600 text-white"
            }`}
            onClick={toggleFilter}
          >
            {!isFilerShow ? <BsFilter /> : <AiOutlineClose />}
          </button>{" "}
        </div>
      </div>
      <AnimatePresence>
        {isSearchShow && (
          <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SearchBar searchParams={searchParams} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isFilerShow && (
          <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SideBar searchParams={searchParams} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileFilter;
