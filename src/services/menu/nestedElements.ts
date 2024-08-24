import { ComponentType } from 'react';
import Checkout from '../../pages/Checkout';
import Drafts from '../../pages/Drafts';
import CustomerRequests from '../../pages/CustomerRequests';
import DrivesRequests from '../../pages/DrivesRequests';
import CreateCompany from '../../pages/CreateCompany';

export type MenuNestedData = {
  title: string;
  path: string;
  el: ComponentType<unknown>;
};

export const driversMenu: MenuNestedData[] = [
  {
    title: 'Проверка',
    path: '/drivers/drafts',
    el: Drafts,
  },
  {
    title: 'Черновики ',
    path: '/drivers/checkout',
    el: Checkout,
  },
];

export const requestMenu: MenuNestedData[] = [
  {
    title: 'Заявки клиентов',
    path: '/request/client',
    el: CustomerRequests,
  },
  {
    title: 'Заявки водителей ',
    path: '/request/driver',
    el: DrivesRequests,
  },
  {
    title: 'Создать компанию ',
    path: '/request/company',
    el: CreateCompany,
  },
];
