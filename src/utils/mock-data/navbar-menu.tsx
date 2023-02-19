import { ReactNode } from 'react';
import {
  UsersIcon,
  ActiveUsersIcon,
  WarningCircleIcon,
  DeleteIcon
} from '../../assets/icons/index';

export interface INavbarMenuList {
  label: string;
  checked: boolean;
  value: string;
  counter: number;
}

export interface INavbarMenu {
  label: string;
  icon: ReactNode | null;
  value: string;
  counter?: number;
  initiallyOpened?: boolean;
  list?: INavbarMenuList[];
}

export const navbarMenu: INavbarMenu[] = [
  { label: 'Все пользователи', icon: <UsersIcon />, value: 'all-users', counter: 790 },
  { label: 'Активные', icon: <ActiveUsersIcon />, value: 'active-users', counter: 778 },
  { label: 'Заблокированные', icon: <WarningCircleIcon />, value: 'blocked-users', counter: 0 },
  { label: 'Удаленные', icon: <DeleteIcon />, value: 'removed-users', counter: 12 },
  {
    label: 'Тип',
    icon: null,
    value: 'type',
    initiallyOpened: true,
    list: [
      { label: 'Администратор', checked: false, value: 'administrator', counter: 2 },
      { label: 'Сотрудник', checked: false, value: 'worker', counter: 750 },
      { label: 'Гость', checked: false, value: 'guest', counter: 40 }
    ]
  },
  {
    label: 'Отделы',
    icon: null,
    value: 'department',
    list: [
      { label: 'Контроль качества', checked: false, value: 'quality-control', counter: 2 },
      { label: 'Presale', checked: false, value: 'presale', counter: 12 },
      { label: 'Продажи', checked: false, value: 'sale', counter: 73 },
      { label: 'Кадры', checked: false, value: 'staff', counter: 102 },
      { label: 'Финансы', checked: false, value: 'finance', counter: 4 }
    ]
  },
  {
    label: 'Email',
    icon: null,
    value: 'email',
    list: [
      { label: 'Активный', checked: false, value: 'email-active', counter: 778 },
      { label: 'Ожидание', checked: false, value: 'email-wait', counter: 0 }
    ]
  }
];

export interface IAddButtonMenu {
  name: string;
  icon: ReactNode | null;
  value: string;
}

export const addButtonMenu = [
  {
    icon: <ActiveUsersIcon />,
    label: 'Пользователя',
    value: 'user'
  },
  {
    icon: <UsersIcon />,
    label: 'Группу',
    value: 'group'
  }
];
