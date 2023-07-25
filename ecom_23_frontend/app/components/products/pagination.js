// "use client";
// import React, { useState } from "react";

import Link from "next/link";

export default function Pagination({ pagination }) {
  console.log(pagination);
  const { totalPages, limit, page, hasNextPage, totalCount } = pagination;

  let pageArr = [];

  if (totalPages <= 3) {
    pageArr = [...Array(3)].map((_, i) => ({
      page: i + 1,
      display: true,
    }));
  }

  if (page === 1 || page === 2) {
    pageArr = [
      {
        page: 1,
        display: true,
      },
      {
        page: 2,
        display: true,
      },
      {
        page: 3,
        display: true,
      },
      {
        page: ".",
        display: false,
      },

      {
        page: totalPages - 1,
        display: true,
      },
      {
        page: totalPages,
        display: true,
      },
    ];
  } else if (page > totalPages - 3) {
    pageArr = [
      {
        page: 1,
        display: true,
      },

      {
        page: ".",
        display: false,
      },
      {
        page: totalPages - 2,
        display: true,
      },
      {
        page: totalPages - 1,
        display: true,
      },
      {
        page: totalPages,
        display: true,
      },
    ];
  } else {
    pageArr = [
      {
        page: 1,
        display: true,
      },
      {
        page: ".",
        display: false,
      },
      {
        page: page - 1,
        display: true,
      },
      {
        page: page,
        display: true,
      },
      {
        page: page + 1,
        display: true,
      },
      {
        page: ".",
        display: false,
      },
      {
        page: totalPages,
        display: true,
      },
    ];
  }

  //   console.log(pageArr);

  return (
    <>
      <div className="mt-12 p-2 px-8 grid place-content-end">
        <div className="flex gap-4">
          {pageArr.map((item, key) => {
            if (item.display) {
              return (
                <Link
                  href={`?page=${item.page}`}
                  key={key}
                  className={`${
                    page === item.page
                      ? "bg-[#21afde] text-white"
                      : " bg-gray-100 text-black"
                  }
                  h-10 w-10  flex justify-center items-center rounded-full hover:bg-[#21afde] hover:text-white transition-all
                      `}
                >
                  {item.page}
                </Link>
              );
            } else {
              return (
                <div key={key} className="p-3 ">
                  ...
                </div>
              );
            }
          })}
        </div>
        <div className="text-[12px] text-gray-600 text-end">
          {page} of {totalPages} pages
        </div>
      </div>
    </>
  );
}
