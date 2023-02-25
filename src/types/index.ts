import { ReactElement, ReactNode } from 'react';

export interface IListItem {
  label: string;
  value?: string | number;
  icon?: ReactNode | ReactElement | JSX.Element;
  color?: string;
}

export interface IComponentDefaultProps {
  children?: ReactElement;
}

export interface IZodiac {
  [key: string]: any;
}
