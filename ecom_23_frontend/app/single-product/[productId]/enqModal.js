"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import PhoneInput from "react-phone-number-input";
import CONST from "@/utils/apis";

export default function enqModal({ productData }) {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setValue = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleHide = () => {
    setShow(false);
  };
  //   console.log(productData);

  const { _id, title, image } = productData;

  // console.log(image);

  const ModalSec = () => {
    return (
      <motion.div
        className="w-screen h-screen fixed top-0 left-0 bg-gray-400/80 z-10 grid place-items-center backdrop-blur"
        initial={{ opacity: 0, scale: 0.5, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: 100 }}
      >
        <div className="bg-white w-full md:w-2/3 p-4 rounded-lg relative">
          <button
            onClick={handleHide}
            className="bg-gray-200 text-black rounded-full absolute top-2 right-2 hover:bg-gray-500 hover:text-white transition-all h-8 w-8 grid place-items-center font-bold"
          >
            X
          </button>
          <h1 className="text-2xl font-bold text-center py-2">Sales Enquiry</h1>

          <div className="flex flex-col md:flex-row gap-4">
            <div className=" w-full md:w-1/3 grid place-content-center ">
              <img
                src={`${CONST.IMG_URL}/products/${image[0]?.ogUrl}`}
                alt={title}
                className="w-[250px] h-[250px] object-contain"
              />
              <h1 className="text-xl font-bold text-gray-700 p-2 py-5 text-center">
                {title}
              </h1>
            </div>
            <div className=" w-full md:w-2/3 bg-gray-50 p-5 rounded-lg">
              <form className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label htmlFor="name" className="text-gray-700 text-sm ">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Your Name"
                      className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full md:w-1/2">
                    <label htmlFor="email" className="text-gray-700 text-sm ">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Your Email "
                      className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex flex-col gap-1 w-full ">
                    <label htmlFor="name" className="text-gray-700 text-sm ">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <PhoneInput
                      international
                      countryCallingCodeEditable={false}
                      defaultCountry="AE"
                      placeholder="Enter phone number"
                      name="phone"
                      onChange={setValue}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full ">
                    <label htmlFor="company" className="text-gray-700 text-sm ">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      id="company"
                      placeholder="Your company name"
                      className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="message" className="text-gray-700 text-sm ">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    placeholder="Your Message"
                    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    onChange={handleChange}
                    required
                    rows={5}
                  />
                </div>
                <div className="grid place-content-center">
                  <button className="bg-[#34aadc] text-white py-3 px-6 font-bold rounded hover:bg-slate-700 transition-all hover:scale-105  hover:shadow-xl active:scale-95">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <button
        className="bg-[#34aadc] text-white py-3 px-6 font-bold rounded hover:bg-slate-700 transition-all hover:scale-105  hover:shadow-xl active:scale-95 "
        onClick={handleShow}
      >
        Sales Enquiry
      </button>
      {/* called as a function because to prevent re rendering on typing */}
      <AnimatePresence> {show && <>{ModalSec()}</>}</AnimatePresence>
    </>
  );
}
