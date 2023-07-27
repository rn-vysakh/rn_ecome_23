"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaChevronRight ,
  FaChevronDown,
} from "react-icons/fa";


export default function MainHeader() {
  const [isHovering, setIsHovering] = useState(false);
  const [showDropdown, setShowDropdown] = useState(0);
  const [showInnerDropdown, setShowInnerDropdown] = useState(0);
  let showTimeoutId;
  let hideTimeoutId;

  // Function to handle the hover events
  const handleHover = (event) => {

    if (event === 1) {
      showTimeoutId = setTimeout(() => {
        setShowDropdown(1);
      }, 100);
    } else if (event === 2) {
      showTimeoutId = setTimeout(() => {
        setShowDropdown(2);
      }, 100);
    } else if (event === 3) {
      showTimeoutId = setTimeout(() => {
        setShowDropdown(3);
      }, 100);
    } else if (event === 4) {
      showTimeoutId = setTimeout(() => {
        setShowDropdown(4);
      }, 100);
    } else if (event === 5) {
      showTimeoutId = setTimeout(() => {
        setShowDropdown(5);
      }, 100);
    } else if (event === 6) {
      showTimeoutId = setTimeout(() => {
        setShowDropdown(2);
        setShowInnerDropdown(6);
      }, 100);
    } else {
      clearTimeout(showTimeoutId);
      hideTimeoutId = setTimeout(() => {
        setShowDropdown(0);
        setShowInnerDropdown(0);
      }, 100);
    }
    setIsHovering(event.type === "mouseenter");
  };

  const url = "https://test.rookie-ninja.com/";

  return (
    <header className=" absolute w-screen hidden md:block ">
      <div className="max-w-7xl mx-auto flex py-5 justify-between text-white items-center font-light ">
        <Image
          src="/assets/logo/rn-white.svg"
          width={200}
          height={100}
          alt="Rookie Ninja Logo"
          
        />
        <div>
          <ul className="flex items-center space-x-5">
            <li className="px-4">Home</li>

            <div
              className="hover-container transition-opacity duration-300 px-4"
              onMouseEnter={() => handleHover(1)}
              onMouseLeave={() => handleHover(0)}
            >

             <div className="flex gap-2 items-center">
             Company
                <FaChevronDown className="text-xs" />
            </div>
              
              {showDropdown === 1 && (
                <div
                  className=" absolute top-6 mt-12"
                  onMouseLeave={() => handleHover(0)}
                >
                  <div className=" ">
                    <ul className=" bg-gray-700/40 mt-2">
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={url + "about-us/"}>About Us</a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={url + "vision/"}>Mission & Vision</a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={url + "team/"}>Team</a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={url + "footprint/"}>Footprint</a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={url + "whyrookieninja/"}>Why Rookie Ninja</a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={url + "journey/"}>Journey</a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={url + "contactus/"}>Contact Us</a>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div
              className="hover-container transition-opacity duration-300 px-4"
              onMouseEnter={() => handleHover(2)}
              onMouseLeave={() => handleHover(0)}
            >
              
              <div className="flex gap-2 items-center">
              Offerings
                <FaChevronDown className="text-xs" />
            </div>
              {showDropdown === 2 && (
                <div
                  className=" absolute top-6 mt-12"
                  onMouseLeave={() => handleHover(0)}
                >
                  <div className=" ">
                    <ul className=" bg-gray-700/40 mt-2">
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={url + "itdistribution/"}>IT Distribution</a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                      
                        <div
                          className="hover-container transition-opacity duration-300 "
                          onMouseEnter={() => handleHover(6)}
                          onMouseLeave={() => handleHover(2)}
                        >
                          <a href={url + "portfolio/"}>
                          <div className="flex gap-2 items-center">
                          portfolio
                <FaChevronRight className="text-xs" />
            </div>
                          </a>
                          {showInnerDropdown === 6 && (
                            <div
                              className=" absolute top-14 left-[195px] w-[200px]"
                              onMouseLeave={() => handleHover(7)}
                            >
                              <div className="">
                                <ul className=" bg-gray-700/40 mt-2">
                                  <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                                    <a href={url + "computing-workstations/"}>Computing</a>
                                  </li>
                                  <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                                    <a href={url + "power-solutions/"}>
                                      Power Solutions
                                    </a>
                                  </li>
                                  <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                                    <a href={url + "storage/"}>Storage</a>
                                  </li>
                                  <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                                    <a href={url + "document-scanners/"}>Scan</a>
                                  </li>
                                  <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                                    <a href={url + "printers/"}>Print</a>
                                  </li>
                                  <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                                    <a href={url + "gaming/"}>Gaming</a>
                                  </li>
                                  <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                                    <a href={url + "components/"}>Components</a>
                                  </li>
                                  <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                                    <a href={url + "software-solution/"}>Software</a>
                                  </li>
                                  <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                                    <a href={url + "audiovisual/"}>Audio Visual</a>
                                  </li>
                                  <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                                    <a href={url + "mobility/"}>IT Accessories</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={url + "products/"}>Products</a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={url + "solutions/"}>Solutions</a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={url + "experience_center/"}>Experience Center</a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={url + "training/"}>Training</a>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div
              className="hover-container transition-opacity duration-300 px-4"
              onMouseEnter={() => handleHover(3)}
              onMouseLeave={() => handleHover(0)}
            >
              
              <div className="flex gap-2 items-center">
              Vendors
                <FaChevronDown className="text-xs" />
            </div>
              {showDropdown === 3 && (
                <div
                  className=" absolute top-6 mt-12"
                  onMouseLeave={() => handleHover(0)}
                >
                  <div className=" ">
                    <ul className=" bg-gray-700/40 mt-2">
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={url + "vendor_central/"}>Vendor Central</a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={url + "brands/"}>Our Vendors</a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={url + "whychooseus/"}>Why Choose Us</a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={url + "value_ads/"}>Value Ads</a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={url + "become_vendor/"}>Become Vendor</a>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div
              className="hover-container transition-opacity duration-300 px-4"
              onMouseEnter={() => handleHover(4)}
              onMouseLeave={() => handleHover(0)}
            >
              
              <div className="flex gap-2 items-center">
              Partners
                <FaChevronDown className="text-xs" />
            </div>
              {showDropdown === 4 && (
                <div
                  className=" absolute top-6 mt-12"
                  onMouseLeave={() => handleHover(0)}
                >
                  <div className=" ">
                    <ul className=" bg-gray-700/40 mt-2">
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={url + "partner-central/"}>Partner Central</a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={url + "value-adds/"}>Value Ads</a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={url + "why-choose-us-partner/"}>Why Choose Us</a>
                      </li>

                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={url + "become-partner/"}>Become A Partner</a>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div
              className="hover-container transition-opacity duration-300 px-4"
              onMouseEnter={() => handleHover(5)}
              onMouseLeave={() => handleHover(0)}
            >
              
              <div className="flex gap-2 items-center">
              Life At Rookie Ninja
                <FaChevronDown className="text-xs" />
            </div>
              {showDropdown === 5 && (
                <div
                  className=" absolute top-6 mt-12"
                  onMouseLeave={() => handleHover(0)}
                >
                  <div className=" ">
                    <ul className=" bg-gray-700/40 mt-2">
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={url + "work-culture/"}>Work Culture</a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={url + "corporate-social-responsibility/"}>
                          Corporate Social Responsibility
                        </a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={url + "equal-opportunity/"}>Equal Oppurtunity</a>
                      </li>

                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={url + "join-us/"}>Join Us</a>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <li className="px-4">
            <a href={url + "blogs/"}>Blogs</a></li>
          </ul>
        </div>
      </div>
    </header>
  );
}
