import Link from "next/link";
import SearchBar from "@/app/components/products/searchBar";
import CONST from "@/utils/apis";
import { demoBrandData } from "@/utils/demoData";
import ProductByCat from "@/app/components/products/productsByCat";

async function getBrands() {
  try {
    let res = await fetch(`${CONST.BASE_URL}/api/brand`);

    if (!res.ok) {
      return { data: demoBrandData };
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    return { data: demoBrandData };
  }
}

export default async function ProductFinder({ searchParams }) {
  const { data } = await getBrands();

  // console.log(data);
  return (
    <main>
      {/* <div className="bg-black h-24 w-full"></div> */}

      <div className="max-w-7xl mx-auto py-5  flex flex-col md:flex-row relative">
        <div className="w-full md:w-1/2 grid place-items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
              Find your product
            </h1>
            <SearchBar searchParams={searchParams} />
          </div>
        </div>
        <div className="w-full md:w-1/2 grid place-items-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {data.map((brand, key) => (
              <Link
                key={key}
                className=" p-5 transition-all hover:bg-gray-100 hover:scale-105"
                href={`/view-all?brand=${brand._id}`}
              >
                <img
                  src={`${CONST.IMG_URL}/brands/${brand?.logo?.mdUrl}`}
                  alt={brand.brandName}
                  className="w-20 h-20 object-contain"
                />
                {/* <h1>{brand.brandName}</h1> */}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-5 ">
        <ProductByCat />
      </div>
    </main>
  );
}
