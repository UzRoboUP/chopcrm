import { lazy } from 'react';
const lazyload = (name: string) => lazy(() => import(`../../pages/${name}`));

export type MenuItem = {
  title: string;
  key: string;
  url: string;
  icon: string;
  component: React.FC<unknown>;
  roles: string[];
};

type MenuData = MenuItem[];

export const getMenuData: MenuData = [
  {
    title: 'Dashboard',
    key: '__dashboard',
    url: '/dashboard',
    icon: 'HiOutlineHome',
    component: lazyload('Dashboard'),
    roles: ['admin', 'user'],
  },
  {
    title: 'Users',
    key: '__users',
    url: '/users',
    icon: 'HiOutlineUsers',
    component: lazyload('Users'),
    roles: ['admin', 'user'],
  },
  {
    title: 'Settings',
    key: '__settings',
    url: '/settings',
    icon: 'HiOutlineCog6Tooth',
    component: lazyload('Settings'),
    roles: ['admin'],
  },
];
