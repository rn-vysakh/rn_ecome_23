"use client";
import React from "react";
import MainHeader from "./mainHeader";
import MobHeader from "./mobHeader";
// import useWindowSize from "@/app/utils/hooks/useWindowSize";
import useWindowSize from '@/utils/hooks/useWindowSize';

const Header = ({ currentMenu }) => {
  const { isMobile } = useWindowSize();

  if (!isMobile) return <MainHeader currentMenu={currentMenu} />;

  return <MobHeader />;
};

export default Header;