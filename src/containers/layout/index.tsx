import { Box } from '@mantine/core';
import { observer } from 'mobx-react';
import { FC, ReactNode } from 'react';
import { ArrowLeftIcon } from '../../assets/icons';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { PagesEnum } from '../../types/enums';
import { useStores } from '../../utils/hooks/useStores';
import { useStyles } from './styles';

interface ICurrentTitle {
  [key: string]: string;
}

const currentTitle: ICurrentTitle = {
  home: 'Главная',
  [PagesEnum.zodiacCompatibility]: 'Совместимость знаков',
  [PagesEnum.demonicHoroscope]: 'Демонический гороскоп',
  [PagesEnum.horoscopeSubscription]: 'Подписка на рассылку',
  [PagesEnum.notifications]: 'Гороскоп',
  [PagesEnum.admin]: 'Панель администратора'
};

interface ILayoutProps {
  children: ReactNode;
  prevPage?: string;
}

export const Layout: FC<ILayoutProps> = observer(({ children, prevPage }) => {
  const { PanelStore } = useStores();
  const { classes } = useStyles();

  return (
    <Box className={classes.root}>
      <Header
        title={currentTitle[PanelStore?.activePanel]}
        prevPage={prevPage}
        iconLeft={<ArrowLeftIcon fill="white" />}
      />
      {children}
      <Footer />
    </Box>
  );
});
