import { ComponentType, lazy } from 'react';
import { MenuNestedData, driversMenu, requestMenu } from './nestedElements';
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
import icon08 from '/img/sidebar/08.svg';
import icon08Active from '/img/sidebar/08_a.svg';
import icon09 from '/img/sidebar/09.svg';
import icon09Active from '/img/sidebar/09_a.svg';
import icon10 from '/img/sidebar/10.svg';
import icon10Active from '/img/sidebar/10_a.svg';
import icon11 from '/img/sidebar/11.svg';
import icon11Active from '/img/sidebar/11_a.svg';
import icon12 from '/img/sidebar/12.svg';
import icon12Active from '/img/sidebar/12_a.svg';
import icon13 from '/img/sidebar/13.svg';
import icon13Active from '/img/sidebar/13_a.svg';

export const lazyLoad = (
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
  elements?: MenuNestedData[];
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
    roles: ['admin', 'operator', 'manager'],
  },
  {
    title: 'Отслежование',
    key: 'track',
    path: '/tracks',
    icon: icon02,
    iconActive: icon02Active,
    component: lazyLoad(() => import('../../pages/Tracks')),
    roles: ['admin', 'operator', 'manager'],
  },
  {
    title: 'Отчетность',
    key: 'report',
    path: '/reports',
    icon: icon03,
    iconActive: icon03Active,
    component: lazyLoad(() => import('../../pages/Reports')),
    roles: ['admin', 'operator', 'manager'],
  },
  {
    title: 'Лиды',
    key: 'lead',
    path: '/leads',
    icon: icon04,
    iconActive: icon04Active,
    component: lazyLoad(() => import('../../pages/Leads')),
    roles: ['admin', 'operator', 'manager'],
  },
  {
    title: 'Компании',
    key: 'company',
    path: '/companies',
    icon: icon13,
    iconActive: icon13Active,
    component: lazyLoad(() => import('../../pages/Companies')),
    roles: ['admin', 'operator', 'manager'],
  },
  {
    title: 'Акции',
    key: 'stock',
    path: '/stock',
    icon: icon05,
    iconActive: icon05Active,
    component: lazyLoad(() => import('../../pages/Stock')),
    roles: ['admin', 'operator', 'manager'],
  },
  {
    title: 'Обклейка',
    key: 'pasting',
    path: '/pasting',
    icon: icon06,
    iconActive: icon06Active,
    component: lazyLoad(() => import('../../pages/Pasting')),
    roles: ['admin', 'operator', 'manager'],
  },
  {
    title: 'Настройки',
    key: 'setting',
    path: '/settings',
    icon: icon07,
    iconActive: icon07Active,
    component: lazyLoad(() => import('../../pages/Settings')),
    roles: ['admin', 'operator', 'manager'],
  },
  {
    title: 'Оператор',
    key: 'operator',
    path: '/operator',
    icon: icon08,
    iconActive: icon08Active,
    component: lazyLoad(() => import('../../pages/Operator')),
    roles: ['admin', 'operator', 'manager'],
  },
  {
    title: 'Регистратор',
    key: 'registration',
    path: '/registration',
    icon: icon09,
    iconActive: icon09Active,
    component: lazyLoad(() => import('../../pages/Registration')),
    roles: ['admin', 'operator', 'manager'],
  },
  {
    title: 'Бухгалтерия',
    key: 'accountant',
    path: '/accountant',
    icon: icon10,
    iconActive: icon10Active,
    component: lazyLoad(() => import('../../pages/Accountant')),
    roles: ['admin', 'operator', 'manager'],
  },
  {
    title: 'Новые водители',
    key: 'drivers',
    path: '/drivers',
    icon: icon11,
    iconActive: icon11Active,
    component: lazyLoad(() => import('../../pages/Drivers')),
    roles: ['moderator'],
    elements: driversMenu,
  },
  {
    title: 'Заявки',
    key: 'request',
    path: '/request',
    icon: icon12,
    iconActive: icon12Active,
    component: lazyLoad(() => import('../../pages/Request')),
    roles: ['moderator'],
    elements: requestMenu,
  },
];
