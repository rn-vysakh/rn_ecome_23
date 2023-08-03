import CONST from "@/utils/apis";
import { demoCategory } from "@/utils/demoData";
import ProductGridSec from "@/app/components/products/productGridSec";
import Link from "next/link";

async function getCategory(catId) {
  try {
    let url = `${CONST.BASE_URL}/api/product?limit=4`;

    if (catId) {
      url += `&catId=${catId}`;
    }

    let res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      return { data: demoCategory };
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    return { data: demoCategory };
  }
}

export default async function GetProductByCat({ catId, title, limit }) {
  const { data } = await getCategory(catId);

  // console.log(data);
  return (
    <>
      <div className="flex justify-between items-center py-4">
        <h1 className=" text-2xl">{title}</h1>
        <Link
          className="bg-[#0aa7db] text-white px-4 py-1 rounded-md hover:bg-amber-400 hover:text-black transition-all hover:scale-105"
          href={`/view-all?catId=${catId}`}
        >
          View all
        </Link>
      </div>
      <div>
        <ProductGridSec products={data} />
      </div>
    </>
  );
}
