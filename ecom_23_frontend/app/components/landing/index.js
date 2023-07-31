import React from "react";

export default function LandingSec({ title, desc, img }) {
  return (
    <>
      <div
        className="h-[90vh] bg-cover bg-center text-white flex flex-col justify-center px-5 md:px-32"
        style={{
          background: `linear-gradient(51deg, rgba(21, 167, 220,0.7) 0%, rgba(0,0,0,0.8) 100%), url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "left center",
        }}
      >
        <h1 className="text-6xl font-light pb-5">{title}</h1>
        <h4 className="md:max-w-2xl leading-loose">{desc}</h4>
      </div>
    </>
  );
}
