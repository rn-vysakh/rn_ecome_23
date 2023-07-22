"use client";
import React, { useState } from "react";
import Image from "next/image";
import CONST from "@/utils/apis";

export default function ImageSlider({ images }) {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (current < images.length - 1) {
      setCurrent(current + 1);
    } else {
      setCurrent(0);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    } else {
      setCurrent(images.length - 1);
    }
  };

  const Buttons = () => {
    return (
      <div className="flex gap-2  absolute bottom-5 right-5">
        <div>
          <button
            onClick={() => handlePrev()}
            className="bg-white/50 text-black rounded-full border border-gray-200/50 hover:border-blue-300 transition-all shadow-lg shadow-gray-200/50 hover:shadow-xl h-12 w-12"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline-block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
        <div>
          <button
            onClick={() => handleNext()}
            className="bg-white/50 text-black rounded-full border border-gray-200/50 hover:border-blue-300 transition-all shadow-lg shadow-gray-200/50 hover:shadow-xl h-12 w-12"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline-block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="">
        <div className="mt-8 mb-4 p-4 grid place-content-center border rounded relative  ">
          <Image
            src={`${CONST.IMG_URL}/products/${images[current]?.lgUrl}`}
            width={450}
            height={450}
            alt="Product Image"
          />
          <Buttons />
        </div>
        <div className="flex  gap-2 ">
          {images.map((item, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className="cursor-pointer hover:scale-110 transition-all border border-gray-200/50 p-2 hover:border-blue-300 rounded "
            >
              <Image
                src={`${CONST.IMG_URL}/products/${item.mdUrl}`}
                width={200}
                height={200}
                alt="Product Image"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
