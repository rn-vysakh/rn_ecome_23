import CONST from "@/utils/apis";

export async function getBrands(catId) {
  let res;

  if (catId) {
    res = await fetch(`${CONST.BASE_URL}/api/brand/getbycat?catId=${catId}`);
  } else {
    res = await fetch(`${CONST.BASE_URL}/api/brand`);
  }

  if (!res.ok) {
    return { data: [] };
  }

  return res.json();
}

export async function getCategories(brands) {
  let res;
  // if (brands) {
  //   res = await fetch(
  //     `${CONST.BASE_URL}/api/category/getbybrand?brandId=${brands}`,
  //     {
  //       cache: "no-store",
  //     }
  //   );
  // } else {
  res = await fetch(`${CONST.BASE_URL}/api/category`, {
    cache: "no-store",
  });
  // }

  if (!res.ok) {
    return { data: [] };
  }

  return res.json();
}

export async function getTags(categories) {
  let res;
  if (categories) {
    res = await fetch(
      `${CONST.BASE_URL}/api/tag/getbystruct?category=${categories}`,
      {
        cache: "no-store",
      }
    );
  } else {
    res = await fetch(`${CONST.BASE_URL}/api/tag/getbystruct`, {
      cache: "no-store",
    });
  }

  if (!res.ok) {
    return { data: [] };
  }

  return res.json();
}
