import fs from "fs";
import path from "path";
import _ from "lodash";
import sanitizeHtml from "sanitize-html";

const __dirname = path.resolve();

const readFile = async (fileName) => {
  const filePath = path.join(__dirname, "original", fileName);

  const file = fs.readFileSync(filePath, "utf8");

  // Parse the file
  const data = JSON.parse(file);

  return data;
};

const saveFile = async (data, fname) => {
  const outDir = path.join(__dirname, "out", fname);

  fs.writeFileSync(outDir, JSON.stringify(data, null, 2), "utf8");
};

const slugify = (str) => {
  return str
    .toString()
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

const brandFn = async () => {
  const data = await readFile("rookie-ninja.brands.json");

  for (let i = 0; i < data.length; i++) {
    const brand = data[i];
    const slug = slugify(brand.brandName);
    brand.slug = slug;
    brand.brandDesc = `${brand.brandName} products`;
  }

  console.log(data);

  await saveFile(data, "rookie-ninja.brands.json");

  return;
};

const SpecSection = (specifications) => {
  let specTitle = _.find(specifications, { type: "title" });
  let terms = _.find(specifications, { type: "terms" });

  const specText = specifications.map((spec, index) => {
    if (spec.type === "spec") {
      return `<tr key=${index}><td> ${spec ? spec.title : ""} </td> <td> ${
        spec ? spec.value1 : ""
      }</td>${spec.value2 ? `<td>${spec ? spec.value2 : ""}</td>` : ""}</tr>`;
    } else {
      return null;
    }
  });

  const tableText = `<div>
        <div className="row">
          <div className="col-md-12 col-sm-12">
           ${specTitle.title ? ` <h4>${specTitle.title}</h4>` : ""}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <table className="table table-bordered">
              ${specText.join("")}
            </table>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 col-sm-12">
            <div
              className="short-desc">
            ${terms ? terms.title : ""}
            </div>
          </div>
        </div>
      </div>
    `;

  console.log(tableText);

  return sanitizeHtml(tableText).replace(/\r?\n|\r/g, " ");
};

const productFn = async () => {
  const data = await readFile("viewsonic.products.json");

  let productArr = [];

  for (let i = 0; i < data.length; i++) {
    const newProductStruct = {
      _id: data[i]._id,
      userId: {
        $oid: "61cb1bb646d546f1a70c8b28",
      },
      categoryId: {
        $oid: "64c367bdedc8e8bf8e528695",
      },
      brandId: data[i].brandId,
      price: 100,
      qty: 100,
      title: data[i].name,
      slug: slugify(data[i].name),
      sku: 2110 + i,
      description: sanitizeHtml(data[i].description),
      dimension: "f33",
      image: data[i].image,
      specifications: SpecSection(data[i].specifications),
      shortDescription: sanitizeHtml(data[i].shortDescription),
      shortPoints: data[i].shortPoints,
      file: data[i].file,
      salesSection: "new",
      totalSales: 0,
      productTag: [],
      keywords: [],
      order: 0,
      viewCount: 1,
      saleCount: 0,
      status: true,
      seller: [
        {
          sellerName: "Eriberto",
          sellerId: {
            $oid: "61cb1bb646d546f1a70c8b28",
          },
          _id: {
            $oid: "64b535c34187730f2ef06f74",
          },
        },
      ],
    };

    // const product = data[i];

    // console.log(product.name);

    productArr.push(newProductStruct);

    // const slug = slugify(product.productName);
    // product.slug = slug;
    // product.productDesc = `${product.productName} products`;
  }

  //   console.log(productArr);

  await saveFile(productArr, "viewsonic.products.json");
};

productFn();
