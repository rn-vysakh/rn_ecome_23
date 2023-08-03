"use client";

import LandingSec from "@/app/components/landing";
import { BiError, BiHome } from "react-icons/bi";

export default function ErrorSec({ error }) {
  console.log(error);
  return (
    <>
      {/* <LandingSec
        title="Products"
        desc=" Our diverse range of offerings caters to the unique needs of our partners and customers, empowering businesses to thrive in the fast-paced world of technology."
        img="/assets/images/header1.webp"
      /> */}
      <div className="h-[80vh] bg-gray-100 grid place-content-center">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-8xl text-amber-500">
            <BiError />
          </div>
          <h1 className="text-2xl text-gray-500">Something went wrong</h1>
          <p className="text-gray-500">Please try again later or contact us</p>
          <a
            href="https://rookie-ninja.com/"
            className="bg-amber-500 px-6 py-3 my-6 rounded-md text-white hover:bg-amber-600 transition-all"
          >
            Go to Home
          </a>
        </div>
      </div>
    </>
  );
}
