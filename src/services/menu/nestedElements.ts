import { ComponentType } from 'react';
import Checkout from '../../pages/Checkout';
import Drafts from '../../pages/Drafts';

export type MenuNestedData = {
  title: string;
  path: string;
  el: ComponentType<unknown>;
};

export const driversMenu: MenuNestedData[] = [
  {
    title: 'Черновики ',
    path: '/drivers/checkout',
    el: Checkout,
  },
  {
    title: 'Проверка',
    path: '/drivers/drafts',
    el: Drafts,
  },
];
