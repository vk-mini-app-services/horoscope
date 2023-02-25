import { Box, Button } from '@mantine/core';
import { useCallback, useState } from 'react';
import { Layout } from '../../layout';
import { GetAllHoroscopePanel } from './panels/get-all-horoscope';
import { SetHoroscopePanel } from './panels/set-horoscope';
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
          <Button
            data-value="get-all-horoscope"
            color="button.0"
            fullWidth
            radius={8}
            mt={8}
            sx={{
              fontWeight: 500,
              backgroundColor: activePanel === 'set-horoscope' ? '#0e2942' : ''
            }}
            onClick={handleActivePanel}
            w="49%"
          >
            Гороскопы по дням
          </Button>
          <Button
            data-value="set-horoscope"
            color="button.0"
            fullWidth
            radius={8}
            mt={8}
            sx={{
              fontWeight: 500,
              backgroundColor: activePanel === 'get-all-horoscope' ? '#0e2942' : ''
            }}
            onClick={handleActivePanel}
            w="49%"
          >
            Установить гороскоп
          </Button>
        </Box>

        {activePanel === 'get-all-horoscope' && (
          <GetAllHoroscopePanel setActivePanel={setActivePanel} />
        )}
        {activePanel === 'set-horoscope' && <SetHoroscopePanel />}
      </Box>
    </Layout>
  );
};
