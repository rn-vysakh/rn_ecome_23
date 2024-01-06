import Image from "next/image";
import Link from "next/link";
import CONST from "@/utils/apis";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <footer className="pt-24 pb-24 w-full bg-black">
        <div className="max-w-6xl mx-5 md:mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 ">
          <div className="flex flex-col gap-4">
            <Image src="\assets\logo\rn-white.svg" width={300} height={300} />
            <div className="text-white font-light">
              <a href={CONST.NAVBAR_URL + "about-us/"}>Home</a> | 
              <a className="ml-2" href={CONST.NAVBAR_URL + "about-us/"}>Vendors</a> |
              <a className="mr-2 ml-2" href={CONST.NAVBAR_URL + "about-us/"}>Partners</a> |
              <a className="" href={CONST.NAVBAR_URL + "about-us/"}>Careers</a>
              {/* <Link href="/">Home</Link> | <Link href="/">About</Link> |{" "}
              <Link href="/">Vendors</Link> | <Link href="/">Partners</Link> |{" "}
              <Link href="/">Careers</Link> */}
            </div>
          </div>
          <div className="text-white flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <div className="bg-gray-600 w-fit h-fit p-2  rounded-full font-xl grid place-items-center">
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <p className="font-light">
                Rookie Ninja Head Office
                <br />
              Al Nasr Building 2 - Oud Metha Rd <br/>
              Oud Metha, Dubai, UAE
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="bg-gray-600 w-fit h-fit p-2  rounded-full font-xl grid place-items-center">
                <FaPhoneAlt className="text-xl" />
              </div>
              <a className="font-light" href="tel:+97142965256">+971 4 296 5256</a>
            </div>
            <div className="flex gap-4 items-center">
              <div className="bg-gray-600 w-fit h-fit p-2  rounded-full font-xl grid place-items-center">
                <FaEnvelope className="text-xl" />
              </div>
              <a className="font-light" href="mailto:sales@rookie-ninja.com">sales@rookie-ninja.com</a>
            </div>
          </div>
          <div className="text-white flex flex-col gap-4">
            <h1 className=" font-bold ">About the company</h1>
            <p className="text-sm font-light">
              Rookie Ninja Specialize In The Distribution Of Digital
              Transformation Technologies. We Are One Of The Fastest Growing
              Tech Companies In The Emea Region With Footprints Across The
              Middle East And Africa.
            </p>
            <div className="flex gap-2">
              <a
                href="https://www.facebook.com/RookieNinjaTech"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 w-fit h-fit p-2   grid place-items-center"
              >
                <FaFacebookF className="text-lg" />
              </a>
              <a
                href="https://www.instagram.com/rookieninjagt/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 w-fit h-fit p-2   grid place-items-center"
              >
                <FaInstagram className="text-lg" />
              </a>

              <a
                href="https://www.linkedin.com/company/rookieninjagt"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 w-fit h-fit p-2   grid place-items-center"
              >
                <FaLinkedinIn className="text-lg" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCe35-aiD4yXjXyIfP9HUZuw"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 w-fit h-fit p-2   grid place-items-center"
              >
                <FaYoutube className="text-lg" />
              </a>
            </div>
          </div>
        </div>
      </footer>
      {/* <div className="text-white bg-black text-center p-20">
        Copyright © {year} Rookie Ninja
      </div> */}
    </>
  );
}
