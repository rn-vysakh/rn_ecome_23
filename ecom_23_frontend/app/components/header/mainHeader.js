"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CONST from "@/utils/apis";
import { FaChevronRight, FaChevronDown, FaMailBulk, FaPhone, FaPhoneSquare } from "react-icons/fa";

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

  return (
    <header className=" bg-black w-screen hidden md:block ">
      <div className="max-w-6xl mx-auto flex py-5 justify-between text-white  items-center font-light  ">
        <a href={CONST.NAVBAR_URL}>
          <Image
            src="/assets/logo/rn-white.svg"
            width={250}
            height={100}
            alt="Rookie Ninja Logo"
            style={{ marginLeft: '-40px' }}
          />
        </a>
        <div>
          <ul className="flex items-center space-x-5 ">
            {/* <li className="px-4">
              <a href={CONST.NAVBAR_URL}>Home</a>
            </li> */}

            <div
              className="hover-container transition-opacity duration-300 "
              onMouseEnter={() => handleHover(1)}
              onMouseLeave={() => handleHover(0)}
            >
              <div className="flex gap-2 items-center">
                Company
                <FaChevronDown className="text-xs" />
              </div>

              {showDropdown === 1 && (
                <div
                  className="absolute top-6 mt-12 z-10"
                  onMouseLeave={() => handleHover(0)}
                >
                  <div className=" ">
                    <ul className=" bg-black/90 mt-2">
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={CONST.NAVBAR_URL + "about-us/"}>About</a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={CONST.NAVBAR_URL + "vision/"}>
                          Mission and Vision
                        </a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={CONST.NAVBAR_URL + "team/"}>Team</a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={CONST.NAVBAR_URL + "blogs/"}>
                         Blog
                        </a>
                      </li>
                      {/* <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={CONST.NAVBAR_URL + "journey/"}>Journey</a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={CONST.NAVBAR_URL + "contactus/"}>Contact Us</a>
                      </li> */}
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
                Portfolio
                <FaChevronDown className="text-xs" />
              </div>
              {showDropdown === 2 && (
                <div
                  className="absolute top-6 mt-12 z-10 "
                  onMouseLeave={() => handleHover(0)}
                >
                  <div className=" ">
                    <ul className=" bg-black/90 mt-2">
                      {/* <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={CONST.NAVBAR_URL + "itdistribution/"}>
                          IT Distribution
                        </a>
                      </li> */}
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <div
                          className="hover-container transition-opacity duration-300 "
                          onMouseEnter={() => handleHover(6)}
                          onMouseLeave={() => handleHover(2)}
                        >
                          <a href={CONST.NAVBAR_URL + "portfolio/"}>
                            <div className="flex gap-2 items-center">
                              Technology Portfolio
                              <FaChevronRight className="text-xs" />
                            </div>
                          </a>
                          {showInnerDropdown === 6 && (
                            <div
                              className=" absolute top-2 left-[231px] w-[200px]"
                              onMouseLeave={() => handleHover(7)}
                            >
                              <div className="">
                                <ul className=" bg-black/90 ">
                                  <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                                    <a
                                      href={
                                        CONST.NAVBAR_URL +
                                        "computing-workstations/"
                                      }
                                    >
                                      Computing
                                    </a>
                                  </li>
                                  <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                                    <a
                                      href={
                                        CONST.NAVBAR_URL + "print-and-scan/"
                                      }
                                    >
                                      Print
                                    </a>
                                  </li>
                                  <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                                    <a
                                      href={
                                        CONST.NAVBAR_URL + "power-solutions/"
                                      }
                                    >
                                     Scan
                                    </a>
                                  </li>
                                  <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                                    <a href={CONST.NAVBAR_URL + "storage/"}>
                                     Consumer Electronics
                                    </a>
                                  </li>
                                  <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                                    <a href={CONST.NAVBAR_URL + "cyber-security/"}>
                                      Storage
                                    </a>
                                  </li>
                                  
                                  <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                                    <a href={CONST.NAVBAR_URL + "gaming/"}>
                                      Gaming
                                    </a>
                                  </li>
                                  <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                                    <a href={CONST.NAVBAR_URL + "components/"}>
                                      Components
                                    </a>
                                  </li>
                                  {/* <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                                    <a href={CONST.NAVBAR_URL + "networking/"}>
                                      Networking
                                    </a>
                                  </li> */}
                                  <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                                    <a
                                      href={
                                        CONST.NAVBAR_URL + "software-solution/"
                                      }
                                    >
                                      Software
                                    </a>
                                  </li>
                                  <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                                    <a href={CONST.NAVBAR_URL + "audiovisual/"}>
                                      Audio Visual
                                    </a>
                                  </li>
                                  <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                                    <a href={CONST.NAVBAR_URL + "mobility/"}>
                                      IT Accessories
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={CONST.NAVBAR_URL + "products/"}>Product Finder</a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={CONST.NAVBAR_URL + "solutions/"}>Our Offerings</a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={CONST.NAVBAR_URL + "experience_center/"}>
                          Experience Center
                        </a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={CONST.NAVBAR_URL + "training/"}>Training</a>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <li className="px-4">
              <a href={CONST.NAVBAR_URL + "our_vendors/"}>Vendors</a>
            </li>

            {/* <div
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
                  className="absolute top-6 mt-12 z-10"
                  onMouseLeave={() => handleHover(0)}
                >
                  <div className=" ">
                    <ul className=" bg-black/90 mt-2">
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={CONST.NAVBAR_URL + "vendor_central/"}>
                          Vendor Central
                        </a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={CONST.NAVBAR_URL + "brands/"}>Our Vendors</a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={CONST.NAVBAR_URL + "whychooseus/"}>
                          Why Choose Us
                        </a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={CONST.NAVBAR_URL + "value_ads/"}>Value Ads</a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={CONST.NAVBAR_URL + "become_vendor/"}>
                          Become Vendor
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div> */}

            <div
              className="hover-container transition-opacity duration-300 px-4"
              onMouseEnter={() => handleHover(4)}
              onMouseLeave={() => handleHover(0)}
            >
              <div className="flex gap-2 items-center">
                Partners
                {/* <FaChevronDown className="text-xs" /> */}
              </div>
              {/* {showDropdown === 4 && (
                <div
                  className="absolute top-6 mt-12 z-10"
                  onMouseLeave={() => handleHover(0)}
                >
                  <div className=" ">
                    <ul className=" bg-black/90 mt-2">
                    <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={CONST.NAVBAR_URL + "vendor_central/"}>
                          Vendor Central
                        </a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={CONST.NAVBAR_URL + "partner-central/"}>
                          Partner Central
                        </a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={CONST.NAVBAR_URL + "value-adds/"}>Value Ads</a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={CONST.NAVBAR_URL + "why-choose-us-partner/"}>
                          Why Choose Us
                        </a>
                      </li>

                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={CONST.NAVBAR_URL + "become-partner/"}>
                          Become A Partner
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              )} */}
            </div>

            <div
              className="hover-container transition-opacity duration-300 px-4"
              onMouseEnter={() => handleHover(5)}
              onMouseLeave={() => handleHover(0)}
            >
              <div className="flex gap-2 items-center">
                Careers
                <FaChevronDown className="text-xs" />
              </div>
              {showDropdown === 5 && (
                <div
                  className="absolute top-6 mt-12 z-10"
                  onMouseLeave={() => handleHover(0)}
                >
                  <div className=" ">
                    <ul className=" bg-black/90 mt-2">
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={CONST.NAVBAR_URL + "work-culture/"}>
                          Work Culture
                        </a>
                      </li>
                      {/* <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a
                          href={
                            CONST.NAVBAR_URL +
                            "corporate-social-responsibility/"
                          }
                        >
                          Corporate Social Responsibility
                        </a>
                      </li>
                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={CONST.NAVBAR_URL + "equal-opportunity/"}>
                          Equal Oppurtunity
                        </a>
                      </li> */}

                      <li className="px-8 py-4 border-b border-gray-600 hover:bg-gray-700">
                        <a href={CONST.NAVBAR_URL + "join-us/"}>Join Us</a>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <li className="px-4">
              <a href={CONST.NAVBAR_URL + "contact/"}>Contact Us</a>
            </li>
            <li className="">
             <FaPhoneSquare></FaPhoneSquare>
            </li>
            <FaMailBulk></FaMailBulk>

          </ul>
        </div>
      </div>
    </header>
  );
}
