import Image from "next/image";
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <footer className="py-24 w-full bg-[#262626]">
        <div className="max-w-6xl mx-5 md:mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 ">
          <div className="flex flex-col gap-4">
            <Image src="\assets\logo\rn-white.svg" width={300} height={300} />
            <div className="text-white ">
              <Link href="/">Home</Link> | <Link href="/">About</Link> |{" "}
              <Link href="/">Vendors</Link> | <Link href="/">Partners</Link> |{" "}
              <Link href="/">Careers</Link>
            </div>
          </div>
          <div className="text-white flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <div className="bg-gray-600 w-fit h-fit p-2  rounded-full font-xl grid place-items-center">
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <address>
                Rookie Ninja Head Office
                <br /> Al Quoz Industrial Area 4 Dubai
              </address>
            </div>
            <div className="flex gap-4 items-center">
              <div className="bg-gray-600 w-fit h-fit p-2  rounded-full font-xl grid place-items-center">
                <FaPhoneAlt className="text-xl" />
              </div>
              <a href="tel:+97142965256">+971 4 296 5256</a>
            </div>
            <div className="flex gap-4 items-center">
              <div className="bg-gray-600 w-fit h-fit p-2  rounded-full font-xl grid place-items-center">
                <FaEnvelope className="text-xl" />
              </div>
              <a href="mailto:sales@rookie-ninja.com">sales@rookie-ninja.com</a>
            </div>
          </div>
          <div className="text-white flex flex-col gap-4">
            <h1 className="text-xl font-bold">About the company</h1>
            <p>
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
                className="bg-gray-600 w-fit h-fit p-2   grid place-items-center"
              >
                <FaFacebookF className="text-lg" />
              </a>
              <a
                href="https://www.facebook.com/RookieNinjaTech"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-600 w-fit h-fit p-2   grid place-items-center"
              >
                <FaTwitter className="text-lg" />
              </a>
              <a
                href="https://www.facebook.com/RookieNinjaTech"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-600 w-fit h-fit p-2   grid place-items-center"
              >
                <FaLinkedinIn className="text-lg" />
              </a>
              <a
                href="https://www.facebook.com/RookieNinjaTech"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-600 w-fit h-fit p-2   grid place-items-center"
              >
                <FaInstagram className="text-lg" />
              </a>
            </div>
          </div>
        </div>
      </footer>
      <div className="text-white bg-black text-center p-5">
        Copyright © {year} Rookie Ninja
      </div>
    </>
  );
}
