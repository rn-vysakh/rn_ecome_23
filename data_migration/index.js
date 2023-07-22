import fs from "fs";
import path from "path";
import _ from "lodash";

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
              ${specText}
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

  // console.log(tableText);

  return tableText;
};

const productFn = async () => {
  const data = await readFile("rookie-ninja.products.json");

  let productArr = [];

  for (let i = 0; i < data.length; i++) {
    const newProductStruct = {
      _id: data[i]._id,
      userId: {
        $oid: "61cb1bb646d546f1a70c8b28",
      },
      categoryId: {
        $oid: "61cbf84c1d0a9407398262b6",
      },
      brandId: data[i].brandId,
      price: 100,
      qty: 100,
      title: data[i].name,
      slug: slugify(data[i].name),
      sku: 1010 + i,
      description: data[i].description,
      dimension: "f33",
      image: data[i].image,
      specifications: SpecSection(data[i].specifications),
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

  await saveFile(productArr, "rookie-ninja.products.json");
};

productFn();

const demo = {
  _id: {
    $oid: "64b63cdffc21d68b8accf6e7",
  },
  userId: {
    $oid: "64b4e025cd05d8cf98010e71",
  },
  categoryId: {
    $oid: "64b632e0fc93f6e9977435d3",
  },
  title: "VA2732-H 27” 1080p IPS Monitor with Frameless Design",
  slug: "va2732-h-27-1080p-ips-monitor-with-frameless-design",
  sku: 10103,
  price: 100,
  description:
    ' <div class="row vs-container rc-feature"> <div class="col-lg-12"> <div id="featureTheme">    <div class="vs-container rc-feature" data-feature-id="4893" id="feature0" style=""><!-- 1 col: begin -->        <div class="row">            <div class="col-lg-12 rc-content">                <h2>SuperClear® IPS</h2>                Enjoy rich vivid color and consistent brightness no matter the vantage point. With SuperClear® IPS                panel technology, the monitor delivers consistent image quality weather you are looking from above,                below, the side, or in front of the display.                <div class="row text-center">                    <div class="vs-callout"><strong>178°/178°</strong></div>                </div>                <div class="row"><img alt="SuperClear® IPS 1" class="img-fluid mx-auto" src="https://www.viewsonic.com/vsAssetFile/me/img/resize/product-rc/_lcd_display_%28new%29/VA2732-H/scaled/VA%20series_SuperClear%20IPS%281%29_pc.webp">                </div>            </div>            <div class="col-lg-12 rc-content"></div>        </div>        <!-- 1 col: end -->    </div>    <div class="vs-container rc-feature" data-feature-id="4894" id="feature1" style=""><!-- 1 col: begin -->        <div class="row">            <div class="col-lg-12 rc-content">                <h2>Full HD 1080p Resolution</h2>                This monitor features Full HD 1920x1080 resolution for unbelievable pixel-by-pixel image performance.                You’ll experience amazing clarity and detail whether working, gaming, or enjoying the latest in                multimedia entertainment.                <div class="row text-center">                    <div class="vs-callout"><strong>1080p</strong></div>                </div>                <div class="row"><img alt="Full HD 1080p Resolution 1" class="img-fluid mx-auto" src="https://www.viewsonic.com/vsAssetFile/me/img/resize/product-rc/_lcd_display_%28new%29/VA2732-H/scaled/VA%20series_Full%20HD_pc.webp">                </div>            </div>            <div class="col-lg-12 rc-content"></div>        </div>        <!-- 1 col: end -->    </div>    <div class="vs-container rc-feature" data-feature-id="4898" id="feature2" style=""><!-- 1 col: begin -->        <div class="row">            <div class="col-lg-12 rc-content">                <h2>Relieve your Eyes from Strain</h2>                Comfortable viewing without compromising color with Flicker-Free technology and Built-in Low Blue Light                (LBL) Screen that always eliminates screen flickering and reduces more than 50% of potentially harmful                blue light emissions from extended viewing periods.                <div class="row text-center">                    <div class="vs-callout"><strong>Flicker Free</strong></div>                    <div class="vs-callout"><strong>Built-in Low Blue Light Screen</strong></div>                </div>                <div class="row"><img alt="Relieve your Eyes from Strain 1" class="img-fluid mx-auto" src="https://www.viewsonic.com/vsAssetFile/me/img/resize/product-rc/_lcd_display_%28new%29/VA2732-H/scaled/Hardware%20Low%20Blue%20Light%20%281%29_pc.webp">                </div>            </div>            <div class="col-lg-12 rc-content"></div>        </div>        <!-- 1 col: end -->    </div>    <div class="vs-container rc-feature" data-feature-id="4895" id="feature3" style=""><!-- 1 col: begin -->        <div class="row">            <div class="col-lg-12 rc-content">                <h2>Three-sided Frameless Design for Seamless Viewing</h2>                With a three-sided frameless bezel, the monitor delivers clean and seamless multi-monitor setup                capabilities.                <div class="row text-center">                    <div class="vs-callout"><strong>Three-Sided Frameless</strong></div>                </div>                <div class="row"><img alt="Three-sided Frameless Design for Seamless Viewing 1" class="img-fluid mx-auto" src="https://www.viewsonic.com/vsAssetFile/me/img/resize/product-rc/_lcd_display_%28new%29/VA2732-H/scaled/VA%20series_Thin_pc.webp">                </div>            </div>            <div class="col-lg-12 rc-content"></div>        </div>        <!-- 1 col: end -->    </div>    <div class="vs-container rc-feature" data-feature-id="4896" id="feature4" style=""><!-- 1 col: begin -->        <div class="row">            <div class="col-lg-12 rc-content">                <h2>Flexible Connectivity</h2>                HDMI and VGA inputs give you the freedom to connect your monitor to a wide range of devices.                <div class="row text-center">                    <div class="vs-callout"><strong>HDMI, VGA</strong></div>                </div>                <div class="row"><img alt="Flexible Connectivity 1" class="img-fluid mx-auto" src="https://www.viewsonic.com/vsAssetFile/me/img/resize/product-rc/_lcd_display_%28new%29/VA2732-H/scaled/4-VA2732-h-HDMI_VGA_pc.webp">                </div>            </div>            <div class="col-lg-12 rc-content"></div>        </div>        <!-- 1 col: end -->    </div>    <div class="vs-container rc-feature" data-feature-id="4897" id="feature5" style=""><!-- 1 col: begin -->        <div class="row">            <div class="col-lg-12 rc-content">                <h2>Color Rendering Options</h2>                ViewSonic’s ViewMode offers “Game”, “Movie”, “Web”,                “Text”, and “Mono” presets. These presets’ enhance gamma curve, color                temperature, contrast, and brightness to deliver an optimized, satisfactory viewing experience for                different uses.                <div class="row text-center">                    <div class="vs-callout"><strong>ViewMode: Game/Movie/Web/Text/Mono</strong></div>                </div>                <div class="row"><img alt="Color Rendering Options 1" class="img-fluid mx-auto" src="https://www.viewsonic.com/vsAssetFile/me/img/resize/product-rc/_lcd_display_%28new%29/VA2732-H/scaled/VA%20series_ViewMode_pc.webp">                </div>            </div>            <div class="col-lg-12 rc-content"></div>        </div>        <!-- 1 col: end -->    </div>    <div class="vs-container rc-feature" data-feature-id="4899" id="feature6" style=""><!-- 1 col: begin -->        <div class="row">            <div class="col-lg-12 rc-content">                <h2>Low Energy Consumption</h2>                VA2732-H’s energy-saving Eco mode takes energy efficiency into consideration while at the same                time offering stunning screen performance.                <div class="row text-center">                    <div class="vs-callout"><strong>Eco Mode</strong></div>                </div>                <div class="row"><img alt="Low Energy Consumption 1" class="img-fluid mx-auto" src="https://www.viewsonic.com/vsAssetFile/me/img/resize/product-rc/_lcd_display_%28new%29/VA2732-H/scaled/VA%20series_Eco-Mode_pc.webp">                </div>            </div>            <div class="col-lg-12 rc-content"></div>        </div>        <!-- 1 col: end -->    </div>    <div class="vs-container-fluid" data-feature-id="4900" id="feature8">        <div class="row vs-container rc-feature"><!-- 1 col: begin -->            <div class="col-lg-12 rc-content">                <h2>VESA-Compatibility</h2>                Mount the monitor where you see fit by using its VESA-compatible mount.                    <div class="row text-center">                    <div class="vs-callout"><strong>100 mm x 100 mm</strong></div>                </div>                    <div class="row product-dim"><img class="dim-image img-responsive center-block" src="https://www.viewsonic.com/vsAssetFile/me/img/resize/product-rc/_lcd_display_%28new%29/VA2732-H/VA2732-h-io.webp">                    <ol>                        <li>Menu Control Panel</li>                        <li>VESA Compatible (Wall Mount 100 x 100mm)</li>                        <li>HDMI</li>                        <li>VGA</li>                        <li>DC in</li>                    </ol>                </div>            </div>                <div class="col-lg-12 rc-content wow zoomIn" style="visibility: hidden; animation-name: none;"></div>            <!-- 1 col: end -->        </div>    </div></div> </div> </div> ',
  dimension: "f33",
  image: [
    {
      $oid: "64b64c3dfc93f6e9977436bd",
    },
  ],
  specifications:
    ' <div class="vs-container product-section"> <div class="row"> <div class="col-lg-12"> <h2 class="text-center">SPECIFICATIONS</h2> <br> </div> <div class="col-lg-12 columns"> <div id="spec-area" class="row"><ul class="product-spec"><li><span class="spec-item">Display</span><div class="spec-data"><strong>Display Size (in.): </strong>27<br><strong>Viewable Area (in.): </strong>27<br><strong>Panel Type: </strong>IPS Technology<br><strong>Resolution: </strong>1920 x 1080<br><strong>Resolution Type: </strong>FHD (Full HD)<br><strong>Static Contrast Ratio: </strong>1,000:1 (typ)<br><strong>Dynamic Contrast Ratio: </strong>50M:1<br><strong>Light Source: </strong>LED<br><strong>Brightness: </strong>250 cd/m² (typ)<br><strong>Colors: </strong>16.7M<br><strong>Color Space Support: </strong>8 bit (6 bit + Hi-FRC)<br><strong>Aspect Ratio: </strong>16:9<br><strong>Response Time (Typical GTG): </strong>4ms<br><strong>Viewing Angles: </strong>178º horizontal, 178º vertical<br><strong>Backlight Life (Hours): </strong>30000 Hrs (Min)<br><strong>Curvature: </strong>Flat<br><strong>Refresh Rate (Hz): </strong>75<br><strong>Blue Light Filter: </strong>Yes<br><strong>Flicker-Free: </strong>Yes<br><strong>Color Gamut: </strong>NTSC: 72% size (Typ)<br>\nsRGB: 104% size (Typ)<br><strong>Pixel Size: </strong>0.311 mm (H) x 0.311 mm (V)<br><strong>Surface Treatment: </strong>Anti-Glare, Hard Coating (3H)<br></div></li><li><span class="spec-item">Compatibility</span><div class="spec-data"><strong>PC Resolution (max): </strong>1920x1080<br><strong>Mac® Resolution (max): </strong>1920x1080<br><strong>PC Operating System: </strong>Windows 10/11 certified; macOS tested<br><strong>Mac® Resolution (min): </strong>1920x1080<br></div></li><li><span class="spec-item">Connector</span><div class="spec-data"><strong>VGA: </strong>1<br><strong>HDMI 1.4: </strong>1<br><strong>Power in: </strong>DC Socket (Center Positive)<br></div></li></ul><ul class="product-spec collapsed bs-prototype-override collapse" id="more-specs" aria-expanded="false"><li><span class="spec-item">Power</span><div class="spec-data"><strong>Eco Mode (Conserve): </strong>20W<br><strong>Eco Mode (optimized): </strong>24W<br><strong>Consumption (typical): </strong>28W<br><strong>Consumption (max): </strong>30W<br><strong>Voltage: </strong>AC 100-240V<br><strong>Stand-by: </strong>0.3W<br><strong>Power Supply: </strong>External Power Adaptor<br></div></li><li><span class="spec-item">Additional Hardware</span><div class="spec-data"><strong>Kensington Lock Slot: </strong>1<br></div></li><li><span class="spec-item">Controls</span><div class="spec-data"><strong>Physical Controls: </strong>Key 1 (favorite), Key 2, Key 3, Key 4, Key 5 (power)<br><strong>On Screen Display: </strong>Input Select, ViewMode, Color Adjust, Manual Image Adjust, Setup Menu<br></div></li><li><span class="spec-item">Operating Conditions</span><div class="spec-data"><strong>Temperature: </strong>32°F to 104°F (0°C to 40°C)<br><strong>Humidity (non-condensing): </strong>20% to 90%<br></div></li><li><span class="spec-item">Wall Mount</span><div class="spec-data"><strong>VESA Compatible: </strong>100 x 100 mm<br></div></li><li><span class="spec-item">Input Signal</span><div class="spec-data"><strong>Frequency Horizontal: </strong>24 ~ 86KHz<br><strong>Frequency Vertical: </strong>48 ~ 75Hz<br></div></li><li><span class="spec-item">Video Input</span><div class="spec-data"><strong>Digital Sync: </strong>TMDS - HDMI (v1.4)<br><strong>Analog Sync: </strong>Separate - RGB Analog<br></div></li><li><span class="spec-item">Ergonomics</span><div class="spec-data"><strong>Tilt (Forward/Back): </strong>-5º / 20º<br></div></li><li><span class="spec-item">Weight (imperial)</span><div class="spec-data"><strong>Net (lbs): </strong>9<br><strong>Net Without Stand (lbs): </strong>7.9<br><strong>Gross (lbs): </strong>13.2<br></div></li><li><span class="spec-item">Weight (metric)</span><div class="spec-data"><strong>Net (kg): </strong>4.1<br><strong>Net Without Stand (kg): </strong>3.6<br><strong>Gross (kg): </strong>6<br></div></li><li><span class="spec-item">Dimensions (imperial) (wxhxd)</span><div class="spec-data"><strong>Packaging (in.): </strong>27.4 x 18.1 x 5.7<br><strong>Physical (in.): </strong>24.2 x 18 x 8.9<br><strong>Physical Without Stand (in.): </strong>24.2 x 14.3 x 1.8<br></div></li><li><span class="spec-item">Dimensions (metric) (wxhxd)</span><div class="spec-data"><strong>Packaging (mm): </strong>695 x 460 x 145<br><strong>Physical (mm): </strong>615 x 458 x 225<br><strong>Physical Without Stand (mm): </strong>615 x 364 x 46<br></div></li><li><span class="spec-item">General</span><div class="spec-data"><strong>Regulations: </strong>CE, CE EMC, CB, RoHS, ErP, REACH, WEEE, EAC, UkrSEPRO, UKCA, BSMI, KC, e-Standby, BIS<br><strong>PACKAGE CONTENTS: </strong>VA2732-H x1, 3-pin Plug (IEC C13 / CEE22) x1, HDMI Cable (v1.4; Male-Male) x1, AC/DC Adapter x1, Quick Start Guide x1<br><strong>Recycle/Disposal: </strong>Please dispose of in accordance with local, state or federal laws.<br><strong>Warranty: </strong>*Warranty offered may differ from market to market<br></div></li></ul></div> <div class="more text-center mt-4"> <button type="button" class="btn-white btn-more collapsed" data-toggle="collapse" data-target="#more-specs" data-expand-text="View full specs" data-collapse-text="View less specs" arial-expand="false">View full specs</button> </div> </div> </div> </div> ',
  file: [],
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
        $oid: "64b4e025cd05d8cf98010e71",
      },
      _id: {
        $oid: "64b535c34187730f2ef06f74",
      },
    },
  ],
  filters: [],
};
