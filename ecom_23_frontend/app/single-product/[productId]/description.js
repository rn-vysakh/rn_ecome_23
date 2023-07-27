"use client";

import React, { useState } from "react";

export default function ProductDescription({ description, spec, downloads }) {
  const [current, setCurrent] = useState(0);

  const DescSec = () => {
    return (
      <div
        className="product-description-wrap max-w-5xl"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
    );
  };
  const SpecSec = () => {
    // let stringWithoutCommas = spec.replace(/<\/tr>,/g, "</tr>");
    // stringWithoutCommas = stringWithoutCommas.replace(
    //   /<\/td><\/tr>,/g,
    //   "</td></tr>"
    // );

    return (
      <div
        className="product-spec-wrap "
        dangerouslySetInnerHTML={{ __html: spec }}
      ></div>
    );
  };
  // console.log(spec);
  const DownloadSec = () => {
    return (
      <div>
        <h1>Download Section</h1>
      </div>
    );
  };

  const AccordionSec = () => {
    if (current === 0) {
      return <DescSec />;
    } else if (current === 1) {
      return <SpecSec />;
    } else {
      return <DownloadSec />;
    }
  };

  return (
    <>
      <div className="">
        <div className="flex gap-1 flex-wrap">
          <button
            className={`${
              current === 0 ? "bg-blue-400" : "bg-blue-100"
            } px-8 py-2`}
            onClick={() => setCurrent(0)}
          >
            <h1 className="">Description</h1>
          </button>
          <button
            className={`${
              current === 1 ? "bg-blue-400" : "bg-blue-100"
            } px-8 py-2`}
            onClick={() => setCurrent(1)}
          >
            <h1 className="">Specifications</h1>
          </button>
          <button
            className={`${
              current === 2 ? "bg-blue-400" : "bg-blue-100"
            } px-8 py-2`}
            onClick={() => setCurrent(2)}
          >
            <h1 className="">Downloads</h1>
          </button>
        </div>
        <div className=" bg-gray-100 px-12 py-8 mb-12 ">
          <AccordionSec />
          {/* ss */}
        </div>
      </div>
    </>
  );
}