import React from 'react';
const Login: React.ComponentType = React.lazy(
  () => import('../pages/auth/Login'),
);
const Register: React.ComponentType = React.lazy(
  () => import('../pages/auth/Register'),
);
const Home: React.ComponentType = React.lazy(
  () => import('../pages/private/Dashboard'),
);
const User: React.ComponentType = React.lazy(
  () => import('../pages/private/Users'),
);
const Settings: React.ComponentType = React.lazy(
  () => import('../pages/private/Settings'),
);

export const authRoutes = [
  {
    key: 'login',
    path: '/login',
    component: Login,
  },
  {
    key: 'register',
    path: '/register',
    component: Register,
  },
];

export const protectedRoutes = [
  {
    key: '/',
    path: '/',
    roles: ['ADMIN', 'USER'],
    component: Home,
  },
  {
    key: 'home',
    path: '/home',
    roles: ['ADMIN', 'USER'],
    component: Home,
  },
  {
    key: 'users',
    path: '/USER',
    roles: ['ADMIN', 'USER'],
    component: User,
  },
  {
    key: 'settings',
    path: '/settings',
    roles: ['ADMIN', 'USER'],
    component: Settings,
  },
];
