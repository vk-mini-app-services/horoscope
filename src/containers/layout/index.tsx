import { Box } from '@mantine/core';
import { observer } from 'mobx-react';
import { FC, ReactNode } from 'react';
import { ArrowLeftIcon } from '../../assets/icons';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header-app';
import { useStores } from '../../utils/hooks/useStores';
import { useStyles } from './styles';

interface ICurrentTitle {
  [key: string]: string;
}

const currentTitle: ICurrentTitle = {
  home: 'Главная',
  notes: 'Мои записи',
  friends: 'Мои друзья'
};

interface ILayoutProps {
  children: ReactNode;
}

export const Layout: FC<ILayoutProps> = observer(({ children }) => {
  const { PanelStore } = useStores();
  const { classes } = useStyles();

  return (
    <Box className={classes.root}>
      <Header title={currentTitle[PanelStore?.activePanel]} iconLeft={<ArrowLeftIcon />} />
      <Box className={classes.content}>{children}</Box>
      <Footer />
    </Box>
  );
});
