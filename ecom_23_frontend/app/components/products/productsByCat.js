import Link from "next/link";
import CONST from "@/utils/apis";
import { demoCategory } from "@/utils/demoData";
import ProductCatGrid from "@/app/components/products/productCatGrid";
async function getCategory() {
  try {
    let res = await fetch(`${CONST.BASE_URL}/api/category`);

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

export default async function GetProductByCat() {
  const { data } = await getCategory();

  return (
    <>
      {/* <h1 className=" text-2xl">Products by category</h1> */}
      <div className="flex flex-col gap-8 my-2 py-4 ">
        <div>
          <ProductCatGrid
            title={data[0].categoryName}
            catId={data[0]._id}
            limit={4}
          />
        </div>
        <div>
          <ProductCatGrid
            title={data[1].categoryName}
            catId={data[1]._id}
            limit={4}
          />
        </div>
        <div>
          <ProductCatGrid
            title={data[2].categoryName}
            catId={data[2]._id}
            limit={4}
          />
        </div>
        <div className=" my-2 py-8 border-t">
          <h1 className="text-center text-xl">All categories</h1>
          <div className="grid grid-cols-2 md:grid-cols-6 place-items-center text-center gap-5 mt-8">
            {data.map((item, key) => (
              <Link
                href={`/view-all?catId=${item._id}`}
                key={key}
                className="bg-gray-100 hover:bg-amber-400 hover:text-black w-full h-16 grid place-items-center overflow-hidden rounded-md transition-all hover:scale-105"
              >
                <div className="w-full p-2 rounded-md  transition-all hover:scale-105">
                  {item.categoryName}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className=" py-8 border-t grid place-items-center">
          <Link
            href={`/view-all`}
            className="hover:bg-gray-100 bg-amber-400 px-4 h-16 grid place-items-center overflow-hidden rounded-md transition-all hover:scale-105"
          >
            <div className="w-full p-2 rounded-md  transition-all hover:scale-105">
              View all products
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
