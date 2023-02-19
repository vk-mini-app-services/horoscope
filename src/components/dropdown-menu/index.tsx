import React, { FC, ReactNode } from 'react';
import { Button, Menu } from '@mantine/core';

interface IListItem {
  icon: ReactNode;
  name: string;
}

interface IDropdownMenu {
  buttonName: string;
  width: string | number;
  list: IListItem[];
  color?: string;
  marginLeft?: number;
  marginRight?: number;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
}

export const DropdownMenu: FC<IDropdownMenu> = ({
  buttonName,
  width = 200,
  list,
  color,
  marginLeft,
  marginRight,
  rightIcon,
  leftIcon
}) => {
  const widthButton = `calc(${width} - (${marginLeft}px + ${marginRight}px))`;

  return (
    <Menu shadow="md" width={widthButton}>
      <Menu.Target>
        <Button color={color} sx={{ width }} rightIcon={rightIcon} leftIcon={leftIcon}>
          {buttonName}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {list.map((item: IListItem, index: number) => {
          return (
            <Menu.Item key={index} icon={item.icon}>
              {item.name}
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
};
