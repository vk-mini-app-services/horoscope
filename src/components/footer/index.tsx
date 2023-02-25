import { useCallback, SyntheticEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Button } from '@mantine/core';
import { useStyles } from './styles';
import { BookIcon, UsersIcon, StarIcon } from '../../assets/icons';
import { useStores } from '../../utils/hooks/useStores';
import { useLocation, useNavigate } from 'react-router-dom';
import { ADMINS, USER_ID } from '../../utils/constants';
import { PagesEnum } from '../../types/enums';
import { IconHome2, IconVip } from '@tabler/icons';

const tabs = [
  {
    id: 1,
    icon: <IconHome2 />,
    name: PagesEnum.home
  },
  {
    id: 2,
    icon: <UsersIcon />,
    name: PagesEnum.zodiacCompatibility
  },
  {
    id: 3,
    icon: <StarIcon />,
    name: PagesEnum.demonicHoroscope
  },
  {
    id: 4,
    icon: <BookIcon width={24} height={24} />,
    name: PagesEnum.horoscopeSubscription
  },
  {
    id: 5,
    icon: <IconVip width={24} height={24} />,
    name: PagesEnum.admin
  }
];

const Footer = observer(() => {
  const { classes, cx } = useStyles();
  const { PanelStore } = useStores();
  const location = useLocation();
  const navigate = useNavigate();

  const userTabs = tabs.filter((item) => item.id !== 5);
  const filterTabs = ADMINS.includes(USER_ID) ? tabs : userTabs;

  const handleClick = useCallback((event: SyntheticEvent<HTMLButtonElement>) => {
    const name = event.currentTarget.dataset.name ?? '';
    PanelStore.setActivePanel(name);

    navigate(`/${name}`);
  }, []);

  return (
    <Box className={classes.root}>
      {filterTabs?.map((item) => {
        return (
          <Button
            data-name={item.name}
            className={cx(classes.button, {
              [classes.buttonActive]: `/${item.name}` === location.pathname
            })}
            onClick={handleClick}
            key={item.id}
            sx={{ fontWeight: 500 }}
          >
            {item.icon}
          </Button>
        );
      })}
    </Box>
  );
});

export { Footer };
