"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

const FilterSection = ({ title, items, type, selectedItems }) => {
  const [filterItems, setFilterItems] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  //   console.log("search params->", searchParams.get(type));

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      params.set("page", 1);

      if (!value) {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    setFilterItems([]);
  }, []);

  // console.log("filter items-->", filterItems);

  const handleFilter = (e) => {
    let fValues = filterItems; // [...searchParams.get(type).split(",")];
    if (e.target.checked) {
      fValues = [...filterItems, e.target.value];
    } else {
      fValues = filterItems.filter((item) => item !== e.target.value);
    }
    let filterValues = fValues.join(",");

    setFilterItems(fValues);

    //   const queryString = createQueryString(type, filterValues);

    router.push(pathname + "?" + createQueryString(type, filterValues));
  };

  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  // console.log("selected items-->", selectedItems);

  function haveCommonElements({ items, selectedItems }) {
    // If no common elements found, return false
    return false;
  }

  const activeFilterSection = haveCommonElements({ items, selectedItems });

  // console.log("active filter section-->", activeFilterSection);

  if (activeFilterSection) {
    setIsExpanded(true);
  }

  return (
    <>
      <div className="border-b m-2 p-2">
        <button
          className="py-2 flex justify-between items-center w-full"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <h1 className="">{title}</h1>
          {isExpanded ? <AiFillCaretUp /> : <AiFillCaretDown />}
        </button>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0.5, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col mt-2"
            >
              {items.map((item, key) => (
                <div
                  key={key}
                  className={`relative flex items-center  hover:bg-gray-200 p-1 mb-1 transilate-all rounded-md cursor-pointer ${
                    selectedItems?.includes(item._id) && "bg-gray-200"
                  }`}
                >
                  <input
                    type="checkbox"
                    value={item._id}
                    id={slugify(`${title}-${key}`)}
                    onChange={handleFilter}
                    className="filter-check-box  "
                    checked={selectedItems?.includes(item._id)}
                  />
                  <label
                    for={slugify(`${title}-${key}`)}
                    className="text-sm px-2 cursor-pointer w-full"
                  >
                    {item.brandName || item.categoryName || item.value}
                  </label>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default FilterSection;
