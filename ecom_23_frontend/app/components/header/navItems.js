import CONST from "@/utils/apis";

console.log("navUrl======",CONST.NAVBAR_URL);
const navItems = [
    {
      name: "Home",
      link: `${CONST.NAVBAR_URL}`,
    },
    {
        name: "Company",
        link: "/",
        child: [
          {
            name: "About Us",
            link: `${CONST.NAVBAR_URL}/about-us`,
          },
          {
            name: "Mission & Vision",
            link: `${CONST.NAVBAR_URL}/vision`,
          },
          {
            name: "Team",
            link: `${CONST.NAVBAR_URL}/team`,
          },
          {
            name: "Footprint",
            link: `${CONST.NAVBAR_URL}/footprint`,
          },
          {
            name: "Why Rookie Ninja",
            link: `${CONST.NAVBAR_URL}/whyrookieninja`,
          },
          {
            name: "Journey",
            link: `${CONST.NAVBAR_URL}/journey`,
          },
          {
            name: "Contact Us",
            link: `${CONST.NAVBAR_URL}/contactus`,
          },
        ],
      },
      {
        name: "Offerings",
        link: "/",
        child: [
          {
            name: "IT Distribution",
            link: `${CONST.NAVBAR_URL}/itdistribution`,
          },
          {
            name: "Portfolio",
            link: `${CONST.NAVBAR_URL}/portfolio`,
            child: [
                {
                  name: "Computing",
                  link: `${CONST.NAVBAR_URL}/computing-workstations`,
                },
                {
                  name: "Power Solutions",
                  link: `${CONST.NAVBAR_URL}/power-solutions`,
                },  
                {
                  name: "Storage",
                  link: `${CONST.NAVBAR_URL}/storage`,
                }, 
                {
                  name: "Scan",
                  link: `${CONST.NAVBAR_URL}/document-scanners`,
                }, 
                {
                  name: "Print",
                  link: `${CONST.NAVBAR_URL}/printers`,
                }, 
                {
                  name: "Gaming",
                  link: `${CONST.NAVBAR_URL}/gaming`,
                }, 
                {
                  name: "Components",
                  link: `${CONST.NAVBAR_URL}/components`,
                }, 
                {
                  name: "Software",
                  link: `${CONST.NAVBAR_URL}/software-solution`,
                }, 
                {
                  name: "Audio Visual",
                  link: `${CONST.NAVBAR_URL}/audiovisual`,
                }, 
                {
                  name: "IT Accessories",
                  link: `${CONST.NAVBAR_URL}/mobility`,
                }, 
              ],
          },
          {
            name: "Products",
          link: `${CONST.NAVBAR_URL}/products`,
          },
          {
            name: "Solutions",
          link: `${CONST.NAVBAR_URL}/solutions`,
          },
          {
            name: "Experience Center",
          link: `${CONST.NAVBAR_URL}/experience_center`,
          },
          {
            name: "Training",
          link: `${CONST.NAVBAR_URL}/training`,
          },
          
        ],
      },
      {
        name: "Vendors",
        link: "/",
        child: [
          {
            name: "Vendor Central",
            link: `${CONST.NAVBAR_URL}/vendor_central`,
          },
          {
            name: "Our Vendors",
            link: `${CONST.NAVBAR_URL}/brands`,
          },
          {
            name: "Why Choose Us",
            link: `${CONST.NAVBAR_URL}/whychooseus`,
          },
          {
            name: "Value Ads",
             link: `${CONST.NAVBAR_URL}/value_ads`,
          },
          {
            name: "Become Vendor",
             link: `${CONST.NAVBAR_URL}/become_vendor`,
          },
        ],
      },
      {
        name: "Partners",
        link: "/",
        child: [
          {
            name: "Partner Central",
          link: `${CONST.NAVBAR_URL}/partner-central`,
          },
          {
            name: "Value Ads",
          link: `${CONST.NAVBAR_URL}/value-adds`,
          },
          {
            name: "Why Choose Us",
          link: `${CONST.NAVBAR_URL}/why-choose-us-partner`,
          },
          {
            name: "Become A Partner",
          link: `${CONST.NAVBAR_URL}/become-partner`,
          },
        ],
      },
      {
        name: "Life At Rookie Ninja",
        link: "/",
        child: [
          {
            name: "Work Culture",
            link: `${CONST.NAVBAR_URL}/work-culture`,
          },
          {
            name: "Corporate Social Responsibility",
            link: `${CONST.NAVBAR_URL}/corporate-social-responsibility`,
          },
          {
            name: "Equal Opportunity",
            link: `${CONST.NAVBAR_URL}/equal-opportunity`,
          },
          {
            name: "Join Us",
            link: `${CONST.NAVBAR_URL}/join-us`,
          },
        ],
      },
      {
        name: "Blogs",
          link: `${CONST.NAVBAR_URL}/blogs`,
      },
  ];
  
  export default navItems;