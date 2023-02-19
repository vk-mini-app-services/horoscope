import React, { FC, ReactNode, SyntheticEvent, useCallback, useState } from 'react';
import { Group, Box, Collapse, UnstyledButton, Text } from '@mantine/core';
import { IconChevronUp } from '@tabler/icons';
import { useStyles } from './styles';
import { LinkItem } from './link-item';
import { INavbarMenuList } from '../../utils/mock-data/navbar-menu';

export interface ILinksGroupProps {
  icon: ReactNode | null;
  label: string;
  initiallyOpened?: boolean;
  list?: INavbarMenuList[];
  onClick: (value: string) => void;
  menuItemActive: string;
  value: string;
  counter?: number;
}

export const LinksGroup: FC<ILinksGroupProps> = ({
  icon,
  label,
  initiallyOpened,
  list,
  menuItemActive,
  value,
  onClick,
  counter
}) => {
  const { classes, theme, cx } = useStyles({ icon });
  const hasCheckboxList = Array.isArray(list);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const [listData, setListData] = useState<INavbarMenuList[]>(list?.length ? [...list] : []);

  const handleClickLinkItem = useCallback((event: SyntheticEvent<HTMLDivElement>) => {
    const value = event.currentTarget.dataset.link ?? '';
    setListData((prevState) =>
      prevState.map((item) => {
        return {
          ...item,
          checked: item.value === value ? !item.checked : item.checked
        };
      })
    );
  }, []);

  const handleClick = useCallback(
    (event: React.SyntheticEvent<HTMLButtonElement>) => {
      const value = event.currentTarget.dataset.item ?? '';
      if (!hasCheckboxList) {
        onClick(value);
      }
      setOpened((prevState) => !prevState);
    },
    [onClick, hasCheckboxList]
  );

  const items = (hasCheckboxList ? listData : []).map((item) => (
    <LinkItem
      key={item.value}
      checked={item.checked}
      label={item.label}
      onClick={handleClickLinkItem}
      value={item.value}
      counter={item.counter}
    />
  ));

  return (
    <Box className={classes.root}>
      <UnstyledButton
        data-item={value}
        onClick={handleClick}
        className={cx(classes.control, {
          [classes.controlActive]: value === menuItemActive && !hasCheckboxList
        })}
      >
        <Group className={classes.group}>
          <Box className={classes.leftContent}>
            {icon && icon}
            <Text className={classes.leftContentText}>{label}</Text>
          </Box>
          <Box className={classes.rightContent}>
            {hasCheckboxList && (
              <IconChevronUp
                className={classes.chevron}
                size={24}
                stroke={1.5}
                style={{
                  transform: opened ? `rotate(${theme.dir === 'rtl' ? -180 : 180}deg)` : 'none'
                }}
              />
            )}
            {!hasCheckboxList && <Text className={classes.rightContentText}>{counter}</Text>}
          </Box>
        </Group>
      </UnstyledButton>
      {hasCheckboxList ? (
        <Collapse sx={{ width: '100%' }} in={opened}>
          {items}
        </Collapse>
      ) : null}
    </Box>
  );
};
