"use client";

import React, { useState, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

const FilterSection = ({ title, items, type }) => {
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

      if (!value) {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams]
  );

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
        {isExpanded && (
          <div className="flex flex-col mt-2">
            {items.map((item, key) => (
              <div key={key} className="relative flex items-center my-1">
                <input
                  type="checkbox"
                  value={item._id}
                  id={slugify(`${title}-${key}`)}
                  onChange={handleFilter}
                  className="filter-check-box  "
                />
                <label
                  for={slugify(`${title}-${key}`)}
                  className="text-sm px-2"
                >
                  {item.brandName || item.categoryName || item.value}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FilterSection;
