import React, { useCallback, useState } from 'react';
import { Navbar, ScrollArea } from '@mantine/core';
import { addButtonMenu, navbarMenu } from '../../utils/mock-data/navbar-menu';
import { LinksGroup } from '../links-group';
import { useStyles } from './styles';
import { DropdownMenu } from '../dropdown-menu';
import { IconPlus } from '@tabler/icons';

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
        <DropdownMenu
          buttonName="Добавить"
          width="100%"
          list={addButtonMenu}
          color="mainBlue.9"
          marginLeft={8}
          marginRight={24}
          rightIcon={<IconPlus color="white" size={20} />}
        />
        <div className={classes.linksInner}>{list}</div>
      </Navbar.Section>
    </Navbar>
  );
};
