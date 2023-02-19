import React, { useState, useEffect, useCallback, SyntheticEvent } from 'react';
import { observer } from 'mobx-react-lite';

import './styles.ts';
import { Box, Button } from '@mantine/core';
import { useStyles } from './styles';
import { BookIcon, EditIcon, UsersIcon } from '../../assets/icons';
import { useStores } from '../../utils/hooks/useStores';
import { useLocation, useNavigate } from 'react-router-dom';
import { routeUrl } from '../../utils/constants';

const tabs = [
  {
    id: 1,
    icon: <EditIcon width={24} height={24} />,
    name: 'home'
  },
  {
    id: 2,
    icon: <BookIcon />,
    name: 'notes'
  },
  {
    id: 3,
    icon: <UsersIcon />,
    name: 'friends'
  }
];

const Footer = observer(() => {
  const { classes, cx } = useStyles();
  const { PanelStore } = useStores();
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = useCallback((event: SyntheticEvent<HTMLButtonElement>) => {
    const name = event.currentTarget.dataset.name ?? '';
    PanelStore.setActivePanel(name);
    navigate(`${routeUrl}/${name}`);
  }, []);

  return (
    <Box className={classes.root}>
      {tabs?.map((item) => {
        return (
          <Button
            data-name={item.name}
            className={cx(classes.button, {
              [classes.buttonActive]: `/${item.name}` === location.pathname
            })}
            onClick={handleClick}
            key={item.id}
          >
            {item.icon}
          </Button>
        );
      })}
    </Box>
  );
});

export { Footer };
