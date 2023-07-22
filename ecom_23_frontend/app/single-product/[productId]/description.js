"use client";

import React, { useState } from "react";

export default function ProductDescription({ description, spec, downloads }) {
  const [current, setCurrent] = useState(0);

  const DescSec = () => {
    return <div dangerouslySetInnerHTML={{ __html: description }}></div>;
  };
  const SpecSec = () => {
    return <div dangerouslySetInnerHTML={{ __html: spec }}></div>;
  };
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
      <div className="h-screen">
        <div className="flex gap-1">
          <button
            className={`${
              current === 0 ? "bg-blue-400" : "bg-blue-100"
            } px-8 py-2`}
            onClick={() => setCurrent(0)}
          >
            <h1 className="text-xl">Description</h1>
          </button>
          <button
            className={`${
              current === 1 ? "bg-blue-400" : "bg-blue-100"
            } px-8 py-2`}
            onClick={() => setCurrent(1)}
          >
            <h1 className="text-xl">Specifications</h1>
          </button>
          <button
            className={`${
              current === 2 ? "bg-blue-400" : "bg-blue-100"
            } px-8 py-2`}
            onClick={() => setCurrent(2)}
          >
            <h1 className="text-xl">Downloads</h1>
          </button>
        </div>
        <div className="mt-8">
          <AccordionSec />
        </div>
      </div>
    </>
  );
}
