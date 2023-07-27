"use client";
import React from "react";
import { Icon } from "@iconify/react";

const Iconify = ({ icon }) => {
  if (!icon) return null;

  return <Icon icon={icon} />;
};

export default Iconify;