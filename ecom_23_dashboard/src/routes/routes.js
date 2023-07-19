import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

//

import { getUserToken, getUserRole } from '../data/userData';
import Blog from '../pages/Blog';
import Employees from '../pages/Employee/Employees';
import NewEmployees from '../pages/Employee/addEmployee';
import EditEmployees from '../pages/Employee/editEmployee';
import DashboardApp from '../pages/DashboardApp';

import ReimburseCost from '../pages/Salary/reimburseCost';
import GetAllReimburse from '../pages/Salary/getallReimburse';
import GetReimburse from '../pages/Salary/getReimburse';
import Certificate from '../pages/Salary/certificate';
import Payroll from '../pages/Salary/payroll';
import Salary from '../pages/Salary/index';
import Asset from '../pages/asset/asset';
import AssetSingle from '../pages/asset/editAsset';
import AddAsset from '../pages/asset/addAsset';
import News from '../pages/news/news';
import AddNews from '../pages/news/addNews';
import NewsSingle from '../pages/news/editNews';
import CompanyDetails from '../pages/companyDetails/companyDetails';
import AddCompanyDetails from '../pages/companyDetails/addCompanyDetails';
import CompanyDetailsSingle from '../pages/companyDetails/editCompanyDetails';

// Leave Section
import Leaves from '../pages/Leaves/index';
import ApplyLeave from '../pages/Leaves/applyLeave';
import TotalLeaves from '../pages/Leaves/totalLeaves';
import LeaveSingle from '../pages/Leaves/singleLeave';

// Inventory Section
import Inventory from '../pages/Inventory/Inventory';
import ProductInventory from '../pages/Inventory/Products';
import CategoryInventory from '../pages/Inventory/Categories';
import BrandsInventory from '../pages/Inventory/Brands';
import AddProducts from '../pages/Inventory/AddProducts';
import ProductDetails from '../pages/Inventory/ProductDetails';
import AddBrands from '../pages/Inventory/AddBrands';
import AddCategory from '../pages/Inventory/addCategory';

// Tax Section
import Tag from '../pages/Inventory/Tag';
import AddTag from '../pages/Inventory/AddTag';

// Accounts Section
import Accounts from '../pages/Accounts/Accounts';
import Purchases from '../pages/Accounts/Purchases';

// Ecommerce website
import Orders from '../pages/Orders/Orders';
import OrderDetails from '../pages/Orders/orderDetails';

// Brands section
import Brands from '../pages/Brands/Brands';
import AddBrand from '../pages/Brands/addBrand';

// Category section
// import Category from '../pages/Category/Category';

// Sellers section
import Sellers from '../pages/Sellers/Sellers';
import AddSeller from '../pages/Sellers/addSeller';

//  Profile Section
import Profile from '../pages/Settings/profile';

// Password Section
import Password from '../pages/Settings/password';

// Customers section
import Customers from '../pages/Customers/Customers';
import CustomerDetails from '../pages/Customers/customerDetails';

// Stock movement section
import StockMovement from '../pages/Stock_movement/Stock_movement';

// Servicing/RMA section
import ServicingRMA from '../pages/Servicing_RMA/Servicing_RMA';
import ServicingRMADetails from '../pages/Servicing_RMA/servicing_RMA_details';

// HomePage Section
import HomePage from 'src/pages/Homepage/HomePage';
import AddHomepage from 'src/pages/Homepage/AddHomepage';
import ProductList from 'src/pages/Homepage/ProductList';
import ProductEdit from 'src/pages/Homepage/ProductEdit'
import HomepageSingle from 'src/pages/Homepage/HomepageSingle'

export default function Routes() {
  const token = getUserToken();
  // const userData = getUserData()
  const role = getUserRole();

  const loginRoute = [{ path: '*', element: <Navigate to="/login" /> }];
  // const loginRoute = [{ path: '*', element: <AddProducts /> }];    // Replace Add products with other pages for testing

  //   console.log(role, userData, token);

  // Role Wice ROUTES 👇👇⬇️

  const adminRoutes = [
    { path: 'app', element: <DashboardApp /> },

    // Inventory Product Routes
    { path: 'inventory/products', element: <ProductInventory /> },
    { path: 'inventory/addproduct', element: <AddProducts /> },
    // { path: 'inventory/products/productdetails/:id', element: <ProductDetails /> },
    { path: 'inventory/products/:id', element: <AddProducts /> },

    // Inventory Category Routes
    { path: 'inventory/categories', element: <CategoryInventory /> },
    { path: 'inventory/categories/addCategory', element: <AddCategory /> },
    { path: 'inventory/categories/editCategory/:id', element: <AddCategory /> },

    // Inventory Tag Routes
    { path: 'inventory/tag', element: <Tag /> },
    { path: 'inventory/tag/addTag', element: <AddTag /> },
    { path: 'inventory/tag/editTag/:id', element: <AddTag /> },

    // Inventory Brand Routes
    { path: 'inventory/brands', element: <BrandsInventory /> },
    { path: 'inventory/Brands/addBrand', element: <AddBrands /> },
    { path: 'inventory/Brands/editBrand/:id', element: <AddBrands /> },

    // Account Routes
    { path: 'accounts', element: <Accounts /> },

    // Purchase Routes
    { path: 'purchases', element: <Purchases /> },

    // Order Routes
    { path: 'Orders', element: <Orders /> },
    { path: 'order/:id', element: <OrderDetails /> },

    // { path: 'Brands', element: <Brands /> },
    // { path: 'brands/addBrand', element: <AddBrand /> },
    // { path: 'brands/editBrand/:id', element: <AddBrand /> },

    // { path: 'Category', element: <Category /> },
    // { path: 'category/addCategory', element: <AddCategory /> },
    // { path: 'category/editCategory/:id', element: <AddCategory /> },

    // Profile Routes
    { path: 'Profile', element: <Profile /> },

    // Password Routes
    { path: 'profile/update-password', element: <Password /> },

    // Seller Routes
    { path: 'Sellers', element: <Sellers /> },
    { path: 'sellers/addSeller', element: <AddSeller /> },
    { path: 'sellers/editSeller/:id', element: <AddSeller /> },

    // Customer Routes
    { path: 'Customers', element: <Customers /> },
    { path: 'customers/details/:id', element: <CustomerDetails /> },

    // Stock Routes
    { path: 'Stock_movement', element: <StockMovement /> },

    // Servicing Routes
    { path: 'Servicing_RMA', element: <ServicingRMA /> },
    { path: 'servicing_RMA_details/:id', element: <ServicingRMADetails /> },

    // HomePage Routes
    { path: 'homepage', element: <HomePage /> },
    { path: 'homepage/addhomepage', element: <AddHomepage /> },
    { path: 'homepage/productlist', element: <ProductList /> },
    { path: 'homepage/productedit', element: <ProductEdit /> },
    { path: 'homepage/single/:id', element: <HomepageSingle /> },
  ];

  const hrRoutes = [
    { path: 'app', element: <DashboardApp /> },
    { path: 'employees', element: <Employees /> },
    { path: 'employees/new', element: <NewEmployees /> },
    { path: 'employees/edit/:userId', element: <EditEmployees /> },
    { path: 'leaves', element: <Leaves /> },
    { path: 'leaves/apply', element: <ApplyLeave /> },
    { path: 'leaves/total', element: <TotalLeaves /> },
    { path: 'leaves/single/:id', element: <LeaveSingle /> },
    { path: 'salary/reimburse', element: <ReimburseCost /> },
    { path: 'salary/getallreimburse', element: <GetAllReimburse /> },
    { path: 'salary/reimburse/:id', element: <GetReimburse /> },
    { path: 'salary/certificate', element: <Certificate /> },
    { path: 'salary/payroll', element: <Payroll /> },
    { path: 'salary', element: <Salary /> },
    { path: 'asset', element: <Asset /> },
    { path: 'asset/single/:id', element: <AssetSingle /> },
    { path: 'asset/addasset', element: <AddAsset /> },
    { path: 'news', element: <News /> },
    { path: 'news/addnews', element: <AddNews /> },
    { path: 'news/single/:id', element: <NewsSingle /> },
    { path: 'companyDetails', element: <CompanyDetails /> },
    { path: 'companyDetails/addCompanyDetails', element: <AddCompanyDetails /> },
    { path: 'companyDetails/single/:id', element: <CompanyDetailsSingle /> },

    { path: 'Orders', element: <Orders /> },
    { path: 'order/:id', element: <OrderDetails /> },

    { path: 'Brands', element: <Brands /> },
    { path: 'brands/addBrand', element: <AddBrand /> },
    { path: 'brands/editBrand/:id', element: <AddBrand /> },

    // { path: 'Category', element: <Category /> },
    { path: 'category/addCategory', element: <AddCategory /> },
    { path: 'category/editCategory/:id', element: <AddCategory /> },

    { path: 'Sellers', element: <Sellers /> },
    { path: 'sellers/addSeller', element: <AddSeller /> },
    { path: 'sellers/editSeller/:id', element: <AddSeller /> },

    { path: 'Customers', element: <Customers /> },
    { path: 'customers/details/:id', element: <CustomerDetails /> },

    { path: 'Stock_movement', element: <StockMovement /> },

    { path: 'Servicing_RMA', element: <ServicingRMA /> },
    { path: 'servicing_RMA_details/:id', element: <ServicingRMADetails /> },
  ];
  const employeeRoutes = [
    { path: 'app', element: <DashboardApp /> },
    { path: 'profile/edit', element: <EditEmployees /> },
    { path: 'leaves', element: <Leaves /> },
    { path: 'leaves/apply', element: <ApplyLeave /> },
    { path: 'leaves/single/:id', element: <LeaveSingle /> },
    { path: 'leaves/list', element: <EditEmployees /> },
    { path: 'salary/reimburse', element: <ReimburseCost /> },
    { path: 'salary/getallreimburse', element: <GetAllReimburse /> },
    { path: 'salary/reimburse/:id', element: <GetReimburse /> },
    { path: 'salary/certificate', element: <Certificate /> },
    { path: 'salary/payroll', element: <Payroll /> },
    { path: 'salary', element: <Salary /> },
    { path: 'asset', element: <Asset /> },
    { path: 'asset/single/:id', element: <AssetSingle /> },
    { path: 'asset/addasset', element: <AddAsset /> },
    { path: 'news', element: <News /> },
    { path: 'news/addnews', element: <AddNews /> },
    { path: 'news/single/:id', element: <NewsSingle /> },
    { path: 'companyDetails', element: <CompanyDetails /> },
    { path: 'companyDetails/addCompanyDetails', element: <AddCompanyDetails /> },
    { path: 'companyDetails/single/:id', element: <CompanyDetailsSingle /> },

    { path: 'Orders', element: <Orders /> },
    { path: 'order/:id', element: <OrderDetails /> },

    { path: 'Brands', element: <Brands /> },
    { path: 'brands/addBrand', element: <AddBrand /> },
    { path: 'brands/editBrand/:id', element: <AddBrand /> },

    // { path: 'Category', element: <Category /> },
    { path: 'category/addCategory', element: <AddCategory /> },
    { path: 'category/editCategory/:id', element: <AddCategory /> },

    { path: 'Sellers', element: <Sellers /> },
    { path: 'sellers/addSeller', element: <AddSeller /> },
    { path: 'sellers/editSeller/:id', element: <AddSeller /> },

    { path: 'Customers', element: <Customers /> },
    { path: 'customers/details/:id', element: <CustomerDetails /> },

    { path: 'Stock_movement', element: <StockMovement /> },

    { path: 'Servicing_RMA', element: <ServicingRMA /> },
    { path: 'servicing_RMA_details/:id', element: <ServicingRMADetails /> },
  ];

  // if (!token) return loginRoute;
  if (role === 'admin') {
    return adminRoutes;
  }
  if (role === 'hr') {
    return hrRoutes;
  }
  if (role === 'employee') {
    return employeeRoutes;
  }
  return loginRoute;
}
