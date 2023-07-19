// component
import Iconify from '../components/Iconify';
import { getUserRole } from './userData';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navItems = () => {
  const adminRoutes = [
    {
      title: 'inventory',
      // path: '/dashboard/inventory',
      icon: getIcon('eva:shopping-bag-fill'),

      children: [
        {
          title: 'Products',
          path: '/dashboard/inventory/products',
        },
        {
          title: 'Brands',
          path: '/dashboard/inventory/brands',
        },
        {
          title: 'Tag',
          path: '/dashboard/inventory/tag',
        },
        {
          title: 'Categories',
          path: '/dashboard/inventory/categories',
        },
      ],
    },

    {
      title: 'orders',
      path: '/dashboard/orders',
      icon: getIcon('bxs:cart'),
    },

    {
      title: 'sellers',
      path: '/dashboard/sellers',
      icon: getIcon('ep:sell'),
    },

    {
      title: 'customers',
      path: '/dashboard/customers',
      icon: getIcon('bxs:user-circle'),
    },

    {
      title: 'Home Page',
      path: '/dashboard/homepage',
      icon: getIcon('material-symbols:home-outline-rounded'),
    },
  ];

  const hrRoutes = [
    {
      title: 'orders',
      path: '/dashboard/orders',
      icon: getIcon('eva:shopping-bag-fill'),
    },
    {
      title: 'dashboard',
      path: '/dashboard/app',
      icon: getIcon('eva:pie-chart-2-fill'),
    },
    {
      title: 'employees',
      path: '/dashboard/employees',
      icon: getIcon('eva:people-fill'),
    },
    {
      title: 'Salary',
      path: '/dashboard/salary',
      icon: getIcon('eva:people-fill'),
    },
    {
      title: 'Leaves',
      path: '/dashboard/leaves',
      icon: getIcon('pepicons:leave'),
    },
    {
      title: 'login',
      path: '/login',
      icon: getIcon('eva:lock-fill'),
    },
    {
      title: 'register',
      path: '/register',
      icon: getIcon('eva:person-add-fill'),
    },
    {
      title: 'Not found',
      path: '/404',
      icon: getIcon('eva:alert-triangle-fill'),
    },
  ];

  const employeeRoutes = [
    {
      title: 'orders',
      path: '/dashboard/orders',
      icon: getIcon('eva:shopping-bag-fill'),
    },
    {
      title: 'dashboard',
      path: '/dashboard/app',
      icon: getIcon('eva:pie-chart-2-fill'),
    },
    {
      title: 'Profile',
      path: '/dashboard/profile/edit',
      icon: getIcon('bxs:user-circle'),
    },
    {
      title: 'Leaves',
      path: '/dashboard/leaves',
      icon: getIcon('pepicons:leave'),
    },
    {
      title: 'Salary',
      path: '/dashboard/salary',
      icon: getIcon('bi:cash-coin'),
    },
  ];
  const role = getUserRole();
  if (role === 'admin') {
    return adminRoutes;
  }
  if (role === 'hr') {
    return hrRoutes;
  }

  return employeeRoutes;
};

export default navItems;
