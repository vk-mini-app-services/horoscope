import { Box, Button } from '@mantine/core';
import { Dispatch, FC, SetStateAction, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { InfoCard } from '../../../../../components/info-card';
import { PagesEnum } from '../../../../../types/enums';
import { ROUTE_URL } from '../../../../../utils/constants/app';
import { useStyles } from './styles';

interface ISelectPanelProps {
  setActivePanel: Dispatch<SetStateAction<string>>;
}

export const SelectPanel: FC<ISelectPanelProps> = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const handleGoPage = useCallback((event: React.SyntheticEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.dataset.value;

    navigate(`${ROUTE_URL === '' ? '/' : ROUTE_URL}${value}`);
  }, []);

  return (
    <Box className={classes.container}>
      <Box sx={{ width: '100%' }}>
        <InfoCard
          fontSize="16px"
          height="100px"
          bgColor="#15aabf"
          fontColor="white"
          mainText="В нашем приложении на данный момент доступен функционал"
        />
      </Box>

      <Box sx={{ width: '100%' }}>
        <Button
          data-value={PagesEnum.zodiacCompatibility}
          color="cyan"
          onClick={handleGoPage}
          fullWidth
          radius={8}
        >
          Совместимость знаков зодиака
        </Button>
        <Button
          data-value={PagesEnum.demonicHoroscope}
          color="cyan"
          onClick={handleGoPage}
          fullWidth
          radius={8}
          mt={8}
        >
          {`Кто ты по "Демоническому гороскопу"`}
        </Button>
        <Button
          data-value={PagesEnum.horoscopeSubscription}
          color="cyan"
          onClick={handleGoPage}
          fullWidth
          radius={8}
          mt={8}
        >
          Получать актуальный гороскоп каждый день
        </Button>
      </Box>
    </Box>
  );
};
