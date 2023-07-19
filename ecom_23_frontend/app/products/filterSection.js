"use client";

import React, { useState, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const FilterSection = ({ title, items, type }) => {
  const [filterItems, setFilterItems] = useState([]);
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
      <div className="border m-2 p-2">
        <h1>{title}</h1>
        <div className="flex flex-col">
          {items.map((item, key) => (
            <div key={key} className="relative">
              <input
                type="checkbox"
                value={item._id}
                id={slugify(`${title}-${key}`)}
                onChange={handleFilter}
                className=""
              />
              <label for={slugify(`${title}-${key}`)}>
                {item.brandName || item.categoryName || item.value}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FilterSection;
