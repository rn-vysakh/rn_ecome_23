import React from "react";
import Link from "next/link";
import Image from "next/image";

const demonavItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Company",
    link: "/company",
  },
  {
    name: "Offerings",
    link: "/offerings",
  },
  {
    name: "Vendors",
    link: "/vendors",
  },
  {
    name: "Partners",
    link: "/partners",
  },
  {
    name: "Life At Rookie Ninja",
    link: "/life-at-rookie-ninja",
  },
  {
    name: "Blogs",
    link: "/blog",
  },
];

export default function MainHeader() {
  return (
    <header className=" absolute w-screen hidden md:block">
      <div className="max-w-7xl mx-auto flex py-5 justify-between text-white items-center font-light ">
        <Image
          src="/assets/logo/rn-white.svg"
          width={200}
          height={100}
          alt="Rookie Ninja Logo"
        />

        <div className="flex items-center space-x-5">
          {demonavItems.map((item, index) => (
            <div key={index} className="px-4">
              <Link href={item.link}>{item.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
