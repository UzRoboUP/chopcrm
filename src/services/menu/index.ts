import { ComponentType, lazy } from 'react';
import icon01 from '/img/sidebar/01.svg';
import icon01Active from '/img/sidebar/01_a.svg';
import icon02 from '/img/sidebar/02.svg';
import icon02Active from '/img/sidebar/02_a.svg';
import icon03 from '/img/sidebar/03.svg';
import icon03Active from '/img/sidebar/03_a.svg';
import icon04 from '/img/sidebar/04.svg';
import icon04Active from '/img/sidebar/04_a.svg';
import icon05 from '/img/sidebar/05.svg';
import icon05Active from '/img/sidebar/05_a.svg';
import icon06 from '/img/sidebar/06.svg';
import icon06Active from '/img/sidebar/06_a.svg';
import icon07 from '/img/sidebar/07.svg';
import icon07Active from '/img/sidebar/07_a.svg';

const lazyLoad = (
  importFunc: () => Promise<{ default: ComponentType<unknown> }>,
) => {
  return lazy(importFunc);
};

export type MenuItem = {
  title: string;
  key: string;
  path: string;
  icon: string;
  iconActive: string;
  component: React.FC<unknown>;
  roles: string[];
};

type MenuData = MenuItem[];

export const getMenuData: MenuData = [
  {
    title: 'Аналитика',
    key: 'analytic',
    path: '/analytics',
    icon: icon01,
    iconActive: icon01Active,
    component: lazyLoad(() => import('../../pages/Dashboard')),
    roles: ['admin', 'operator'],
  },
  {
    title: 'Отслежование',
    key: 'track',
    path: '/tracks',
    icon: icon02,
    iconActive: icon02Active,
    component: lazyLoad(() => import('../../pages/Tracks')),
    roles: ['admin', 'operator'],
  },
  {
    title: 'Отчетность',
    key: 'report',
    path: '/reports',
    icon: icon03,
    iconActive: icon03Active,
    component: lazyLoad(() => import('../../pages/Reports')),
    roles: ['admin', 'operator'],
  },
  {
    title: 'Лиды',
    key: 'lead',
    path: '/leads',
    icon: icon04,
    iconActive: icon04Active,
    component: lazyLoad(() => import('../../pages/Leads')),
    roles: ['admin', 'operator'],
  },
  {
    title: 'Акции',
    key: 'stock',
    path: '/stock',
    icon: icon05,
    iconActive: icon05Active,
    component: lazyLoad(() => import('../../pages/Stock')),
    roles: ['admin', 'operator'],
  },
  {
    title: 'Обклейка',
    key: 'pasting',
    path: '/pasting',
    icon: icon06,
    iconActive: icon06Active,
    component: lazyLoad(() => import('../../pages/Pasting')),
    roles: ['admin', 'operator'],
  },
  {
    title: 'Настройки',
    key: 'setting',
    path: '/settings',
    icon: icon07,
    iconActive: icon07Active,
    component: lazyLoad(() => import('../../pages/Settings')),
    roles: ['admin', 'operator'],
  },
];
