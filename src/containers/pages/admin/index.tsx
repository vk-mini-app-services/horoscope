import { Box, Button, Text } from '@mantine/core';
import { useCallback, useState } from 'react';
import { NAME_PROJECT } from '../../../utils/constants/app';
import { Layout } from '../../layout';
import { GetAllHoroscopePanel } from './panels/get-all-horoscope';
import { SetHoroscopePanel } from './panels/set-horoscope';
import { SetPayloadPanel } from './panels/set-payload';
import { useStyles } from './styles';

export const Admin = () => {
  const { classes } = useStyles();
  const [activePanel, setActivePanel] = useState<string>('get-all-horoscope');

  const handleActivePanel = useCallback((event: React.SyntheticEvent<HTMLButtonElement>) => {
    const panel = event.currentTarget.dataset.value ?? '';
    setActivePanel(panel);
  }, []);

  return (
    <Layout prevPage="home">
      <Box className={classes.root}>
        <Box className={classes.container}>
          <Text mt={8} color="white">
            Название приложения: {NAME_PROJECT}
          </Text>
        </Box>
        <Box className={classes.container}>
          <Button
            data-value="get-all-horoscope"
            color="button.0"
            fullWidth
            radius={8}
            mt={8}
            sx={{
              fontWeight: 500,
              backgroundColor: activePanel === 'get-all-horoscope' ? '' : '#0e2942'
            }}
            onClick={handleActivePanel}
            w="32%"
          >
            Гороскопы
          </Button>
          <Button
            data-value="set-horoscope"
            color="button.0"
            fullWidth
            radius={8}
            mt={8}
            sx={{
              fontWeight: 500,
              backgroundColor: activePanel === 'set-horoscope' ? '' : '#0e2942'
            }}
            onClick={handleActivePanel}
            w="32%"
          >
            Установить гороскоп
          </Button>
          <Button
            data-value="set-payload"
            color="button.0"
            fullWidth
            radius={8}
            mt={8}
            sx={{
              fontWeight: 500,
              backgroundColor: activePanel === 'set-payload' ? '' : '#0e2942'
            }}
            onClick={handleActivePanel}
            w="32%"
          >
            Установить ссылки
          </Button>
        </Box>

        {activePanel === 'get-all-horoscope' && <GetAllHoroscopePanel />}
        {activePanel === 'set-horoscope' && <SetHoroscopePanel />}
        {activePanel === 'set-payload' && <SetPayloadPanel />}
      </Box>
    </Layout>
  );
};
