import React, { FC, ReactNode, SyntheticEvent } from 'react';
import { Button, Checkbox, ClassNames, Divider, Menu, MenuStylesNames, Text } from '@mantine/core';
import { useStyles } from './styles';
import { IComponentDefaultProps, IListItem } from '../../types';
import { FloatingPosition } from '@mantine/core/lib/Floating/types';
import { ScrollContainer } from '../scroll-container';

export enum MenuItemTypeEnum {
  item = 'item',
  checkbox = 'checkbox'
}

interface IDropdownMenu extends IComponentDefaultProps {
  width?: string | number;
  height?: string | number;
  list: IListItem[];
  marginLeft?: number;
  marginRight?: number;
  classNames?: ClassNames<MenuStylesNames>;
  handleClick?: (event: SyntheticEvent<HTMLButtonElement>) => void;
  position?: FloatingPosition;
  menuItemType?: MenuItemTypeEnum;
  handleChangeCheckbox?: (event: SyntheticEvent<HTMLInputElement>) => void;
  scrollHeight?: number | string;
}

export const DropdownMenu: FC<IDropdownMenu> = ({
  width = 200,
  height,
  scrollHeight,
  list,
  marginLeft = 0,
  marginRight = 0,
  classNames,
  handleClick,
  position,
  menuItemType = MenuItemTypeEnum.item,
  handleChangeCheckbox,
  ...props
}) => {
  const { classes, cx } = useStyles();
  const widthMenu =
    typeof width === 'string' ? width : `calc(${width}px - (${marginLeft}px + ${marginRight}px))`;

  const getChildrenItem = (item: IListItem, index: number): ReactNode => {
    switch (menuItemType) {
      case MenuItemTypeEnum.item:
        return (
          <Menu.Item data-value={item.value} key={index} onClick={handleClick}>
            {item.label}
          </Menu.Item>
        );
      case MenuItemTypeEnum.checkbox:
        return (
          <Checkbox
            key={index}
            color="mainBlue.9"
            data-checkbox={item.value}
            className={cx(classes.checkbox, {
              [classes.checkboxLastItem]: index === list.length - 1
            })}
            onChange={handleChangeCheckbox}
            readOnly
            label={<Text>{item.label}</Text>}
          />
        );

      default:
        break;
    }
  };

  return (
    <Menu classNames={classNames} shadow="md" width={widthMenu} zIndex={400} position={position}>
      <Menu.Target>{props?.children}</Menu.Target>

      <Menu.Dropdown sx={{ height: height ?? 'auto' }}>
        <ScrollContainer style={{ height: scrollHeight ?? 'auto' }}>
          {list.map((item: IListItem, index: number) => {
            if (item.value === 'divider') {
              return <Divider key={index} className={classes.divider} my="sm" />;
            } else {
              return getChildrenItem(item, index);
            }
          })}
          {menuItemType === MenuItemTypeEnum.checkbox && (
            <Button
              className={classes.buttonChange}
              size="xs"
              color="mainBlue.9"
              onClick={handleClick}
              sx={{ fontWeight: 500 }}
            >
              Изменить
            </Button>
          )}
        </ScrollContainer>
      </Menu.Dropdown>
    </Menu>
  );
};
