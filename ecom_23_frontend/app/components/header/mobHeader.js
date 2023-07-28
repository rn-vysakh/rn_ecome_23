"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAnimate, stagger, motion } from "framer-motion";
import Iconify from "@/app/components/common/Iconify";
import navItems from "./navItems";
import navUrl from "@/utils/apis";

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

function useMenuAnimation(isOpen) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      ".menu-list",
      {
        clipPath: isOpen
          ? "inset(0% 0% 0% 0% round 10px)"
          : "inset(10% 50% 90% 50% round 10px)",
        zIndex: 100,
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.5,
      }
    );

    // animate(
    //   ".menu-item",
    //   isOpen
    //     ? { opacity: 1, scale: 1, filter: "blur(0px)" }
    //     : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
    //   {
    //     duration: 0.2,
    //     delay: isOpen ? staggerMenuItems : 0,
    //   }
    // );
  }, [isOpen]);

  return scope;
}

const MobHeader = ({ currentMenu }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [childMenu, setChildMenu] = useState(null);

  const scope = useMenuAnimation(isMenuOpen);

  const handleSubMenuClick = (key) => {
    if (activeMenu === key) {
      setActiveMenu(null);
      return;
    }
    setActiveMenu(key);
  };

  const handleChildMenuClick = (key) => {
    if (childMenu === key) {
      setChildMenu(null);
      setIsMenuOpen(null);
      setActiveMenu(null);
      return;
    }
    setChildMenu(key);
  };

  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveMenu(null);
  };

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveMenu(null);
    setChildMenu(null);
  }, [pathname]);

  const ChildMenu = ({ child }) => {
    return (
      <motion.div
        className=" bg-gray-900 grid place-items-center p-4 px-12 "
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-full h-full flex flex-col gap-1">
          {child.map((item, key) => (
            <Link
              href={item.link}
              key={key}
              className=" p-2  transition-all duration-100 font-normal hover:font-bold border-b hover:bg-gray-600"
            >
              <div
                className="text-md text-white "
                onClick={() => handleChildMenuClick(key)}
              >
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    );
  };

  const SubMenu = ({ child }) => {
    return (
      <motion.div
        className=" bg-gray-900 grid place-items-center p-4 px-6 "
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-full h-full flex flex-col gap-1">
          {child.map((item, key) => (
            <>
              <Link
                href={item.link}
                key={key}
                className=" p-2  transition-all duration-100 font-normal hover:font-bold border-b hover:bg-gray-600"
              >
                <div
                  className="text-md text-white"
                  onClick={() => handleChildMenuClick(key)}
                >
                  {item.name}
                </div>
              </Link>
              {childMenu === key && item.child && (
                <ChildMenu child={item.child} />
              )}
            </>
          ))}
        </div>
      </motion.div>
    );
  };

  const Menu = () => {
    return (
      <div className="bg-gray-900  py-5 px-8 rounded-[12px] shadow-xl w-full mt-3 overflow-scroll">
        <div className="flex flex-col gap-5  font-semibold ">
          {navItems.map((item, key) => (
            <div key={key} className="w-full">
              {item.child ? (
                <button
                  className=" border-b menu-item flex justify-between items-center p-2 w-full hover:bg-gray-600"
                  onClick={() => handleSubMenuClick(key)}
                >
                  <div className="text-white">{item.name}</div>
                  <div>
                    {item.child && (
                      <Iconify
                        icon={
                          key === activeMenu
                            ? "ri-arrow-up-s-line"
                            : "ri-arrow-down-s-line"
                        }
                      />
                    )}
                  </div>
                </button>
              ) : (
                <a
                  href={item.link}
                  className=" border-b menu-item flex justify-between items-center p-2 w-full hover:bg-gray-600"
                >
                  <div className="text-white">{item.name}</div>
                  <div>
                    {item.child && (
                      <Iconify
                        icon={
                          key === activeMenu
                            ? "ri-arrow-up-s-line"
                            : "ri-arrow-down-s-line"
                        }
                      />
                    )}
                  </div>
                </a>
              )}
              {activeMenu === key && item.child && (
                <SubMenu child={item.child} />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="p-3 absolute w-screen  " ref={scope}>
        <div className="bg-gray-650 py-3 grid place-items-center rounded-[12px]  w-full ">
          <div className="flex justify-between items-center w-full px-3">
            <div className="">
              <Link href="/">
                {/* <Image
                  src="/assets/img/logo/rn-logo.webp"
                  alt="rookie ninja logo"
                  width={200}
                  height={200}
                /> */}
                <img
                  src="/assets/images/rn-logo-white.png"
                  height={200}
                  width={200}
                />
              </Link>
            </div>
            <div className=" flex gap-2">
              <button
                className="text-2xl bg-white p-2  shadow-xl border active:scale-95 active:translate-y-1 ease-in-out transition-all duration-100 "
                onClick={handleMenuOpen}
              >
                {isMenuOpen ? (
                  <Iconify icon="ri-close-line" />
                ) : (
                  <Iconify icon="ri-menu-line" />
                )}
              </button>
            </div>
          </div>
        </div>
        {/* <Menu /> */}

        <div
          className="menu-list relative"
          style={{
            pointerEvents: isMenuOpen ? "auto" : "none",
            clipPath: "inset(10% 50% 90% 50% round 10px)",
          }}
        >
          {" "}
          {isMenuOpen && <Menu />}
        </div>
      </div>
    </>
  );
};

export default MobHeader;
