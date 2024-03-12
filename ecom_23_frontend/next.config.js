/** @type {import('next').NextConfig} */
const nextConfig = {
  //  image domain
  images: {
    domains: ["rookie-ninja-2023.s3.ap-south-1.amazonaws.com"],
    unoptimized:true
  },
};

module.exports = nextConfig;
