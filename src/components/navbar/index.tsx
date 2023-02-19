import React, { useCallback, useState } from 'react';
import { Box, Navbar, ScrollArea } from '@mantine/core';
import { addButtonMenu, navbarMenu } from '../../utils/mock-data/navbar-menu';
import { LinksGroup } from '../links-group';
import { useStyles } from './styles';
import { DropdownMenu } from '../dropdown-menu';

export const MainNavbar = () => {
  const { classes } = useStyles();
  const [menuItemActive, setMenuItemActive] = useState<string>('all-users');

  const handleClick = useCallback((value: string) => {
    setMenuItemActive(value);
  }, []);

  const list = navbarMenu.map((item) => (
    <LinksGroup {...item} key={item.value} onClick={handleClick} menuItemActive={menuItemActive} />
  ));

  return (
    <Navbar className={classes.navbar}>
      <Navbar.Section grow className={classes.list} component={ScrollArea}>
        <DropdownMenu width="100%" list={addButtonMenu} marginLeft={8} marginRight={24}>
          <Box>Добавить</Box>
        </DropdownMenu>
        <div className={classes.linksInner}>{list}</div>
      </Navbar.Section>
    </Navbar>
  );
};
