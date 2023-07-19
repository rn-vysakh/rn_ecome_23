import React from "react";
import Link from "next/link";

export default function MainHeader() {
  return (
    <header>
      <div className="bg-gray-200 p-5 ">
        <div className="max-w-7xl mx-auto ">
          <h1>
            <Link href="/">Home</Link>
          </h1>
        </div>
      </div>
    </header>
  );
}
